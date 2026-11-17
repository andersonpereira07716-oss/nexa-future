import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

async function processAgentLogic(messageText, tenant) {
  const messageLower = messageText.toLowerCase();

  if (messageLower.includes('caro') || messageLower.includes('preço') || messageLower.includes('valor')) {
    return {
      agent: 'Gamora',
      response: `Entendo perfeitamente! É por isso que o Nexa Future oferece **5 dias totalmente grátis**, sem cobrar nada agora. Você coloca os 7 agentes para rodar e ver o retorno antes de investir. Vamos ativar seu acesso?`
    };
  }

  if (messageLower.includes('como funciona') || messageLower.includes('integração') || messageLower.includes('whatsapp')) {
    return {
      agent: 'Cybertron',
      response: `A integração é 100% automatizada! Assim que você conclui o cadastro, os agentes conectam ao seu WhatsApp e ao Supabase em poucos cliques.`
    };
  }

  return {
    agent: 'Zentrix',
    response: `Olá! Sou o Zentrix, inteligência central do **Nexa Future**. Nossa equipe de 7 agentes está pronta para automatizar o seu atendimento e alavancar suas vendas. Como podemos começar?`
  };
}

async function sendWhatsAppMessage(phone, text) {
  if (!WHATSAPP_API_URL || !WHATSAPP_TOKEN) {
    console.log(`[SIMULAÇÃO WHATSAPP para ${phone}]: ${text}`);
    return;
  }

  try {
    await fetch(WHATSAPP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`
      },
      body: JSON.stringify({ number: phone, message: text })
    });
  } catch (err) {
    console.error('[ERRO WHATSAPP API]:', err);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { phone, message, isWelcomeTrigger } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Número de telefone obrigatório' });
    }

    let { data: tenant } = await supabase
      .from('tenants_subscriptions')
      .select('*')
      .eq('whatsapp', phone)
      .single();

    if (isWelcomeTrigger) {
      const welcomeText = `🚀 Olá! Seja muito bem-vindo ao **Nexa Future**. Seu período de **5 dias grátis** foi ativado com sucesso! Seus 7 agentes de IA já estão operacionais. Responda aqui caso precise de ajuda para configurar sua operação.`;
      
      await sendWhatsAppMessage(phone, welcomeText);
      return res.status(200).json({ status: 'welcome_sent', phone });
    }

    const agentReply = await processAgentLogic(message, tenant);
    await sendWhatsAppMessage(phone, agentReply.response);

    return res.status(200).json({
      success: true,
      handledBy: agentReply.agent,
      response: agentReply.response
    });

  } catch (error) {
    console.error('[VERCEL FUNCTION ERROR]:', error);
    return res.status(500).json({ error: 'Erro interno ao processar mensagem' });
  }
}
