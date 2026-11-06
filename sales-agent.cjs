// NEXA FUTURE - Módulo de Prospecção e Vendas Automatizadas (GAMORA & QUANTIX)
const http = require('http');

const prospects = [
  { 
    setor: 'Supermercados', 
    contato: 'Gerente / Proprietário', 
    oferta: 'Landing Page de Ofertas da Semana + Bot WhatsApp de Encarte Digital' 
  },
  { 
    setor: 'Barbearias / Salões de Beleza', 
    contato: 'Proprietário', 
    oferta: 'Sistema de Agendamento Online + Recebimento Pix Automatizado (VYTRON)' 
  },
  { 
    setor: 'Consultórios / Clínicas', 
    contato: 'Recepção / Gestor', 
    oferta: 'Chatbot de Triagem e Confirmação Automática de Consultas' 
  },
  { 
    setor: 'Imobiliárias / Corretores de Imóveis', 
    contato: 'Corretor / Diretor Comercial', 
    oferta: 'Catálogo Digital Responsivo + Captação Ativa de Leads para Imóveis' 
  },
  { 
    setor: 'Academias & Consultoria Fitness', 
    contato: 'Dono / Personal Trainer', 
    oferta: 'Página de Matrículas / Planos Online com Checkout Pix Integrado' 
  },
  { 
    setor: 'Consultoria de Licitações / Banners Públicos', 
    contato: 'Consultor / Escritório', 
    oferta: 'Painel de Monitoramento de Editais e Divulgação Corporativa' 
  },
  { 
    setor: 'Lojas de Varejo & Variedades', 
    contato: 'Lojista', 
    oferta: 'Vitrine Virtual Mobile-First (ZapVitrine) para Catálogo no WhatsApp' 
  },
  { 
    setor: 'Restaurantes & Gastronomia', 
    contato: 'Gerente de Operações', 
    oferta: 'Cardápio Digital Interativo sem Taxas de Plataforma de Delivery' 
  }
];

function gerarScriptAbordagem(prospect) {
  return `
==================================================
🎯 PROSPECÇÃO ATIVA [QUANTIX / GAMORA]
📍 SETOR: ${prospect.setor.toUpperCase()}
==================================================
Olá! Notei a forte presença do seu negócio aqui na região de Patos/PB e identifiquei uma oportunidade para otimizar sua captação de clientes.

Nós da NEXA Future desenvolvemos a seguinte solução sob medida:
👉 ${prospect.oferta}

✅ Sem mensalidades abusivas de terceiros
✅ Entrega rápida e layout 100% otimizado para celulares
✅ Sistema com blindagem de segurança e recebimento instantâneo via Pix

Podemos agendar uma demonstração rápida de 5 minutos hoje no WhatsApp?
==================================================
  `;
}

console.log('--------------------------------------------------');
console.log('[GAMORA & QUANTIX] Varredura comercial expandida!');
console.log(`[SYS] ${prospects.length} Nichos estratégicos calibrados.`);
console.log('--------------------------------------------------');

prospects.forEach((p, index) => {
  console.log(`\n[Lead #${index + 1}] Setor: ${p.setor}`);
  console.log(`[Público]: ${p.contato}`);
  console.log(gerarScriptAbordagem(p));
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({
    status: 'ONLINE',
    agentes: ['GAMORA', 'QUANTIX'],
    mensagem: 'Funil de prospecção expandido e operando com 8 nichos estratégicos.',
    leadsAtivos: prospects.length,
    timestamp: new Date().toISOString()
  }));
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`\n[SYS] Módulo de Vendas ativo na porta ${PORT}.`);
});
