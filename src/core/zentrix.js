require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

// Mapeamento das portas dos subagentes
const AGENT_PORTS = {
  CYBERTRON: 3001,
  VYTRON: 3002,
  NEXARON: 3003,
  SYNTRON: 3004,
  QUANTIX: 3005,
  GAMORA: 3006
};

app.get('/status', (req, res) => {
  res.json({
    system: "NEXA FUTURE",
    agent: "ZENTRIX",
    role: "Orquestrador Central",
    status: "online",
    timestamp: new Date().toISOString()
  });
});

app.post('/prompt', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "O campo 'prompt' eh obrigatorio." });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`;
    
    // 1. Análise da intenção via Gemini
    const analysisPrompt = `Analise o comando do usuario e escolha QUAL agente da NEXA FUTURE deve executar.
Opcoes estritamente validas: CYBERTRON, VYTRON, NEXARON, SYNTRON, QUANTIX, GAMORA ou ZENTRIX.
Comando: "${prompt}"
Responda APENAS com o nome do agente em maiusculas.`;

    const aiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: analysisPrompt }] }] })
    });

    const aiData = await aiRes.json();
    
    if (!aiRes.ok || !aiData.candidates || !aiData.candidates[0]) {
      throw new Error(aiData.error?.message || 'Erro na resposta do Gemini');
    }

    const rawTarget = aiData.candidates[0].content.parts[0].text.trim().toUpperCase();
    const targetAgent = rawTarget.replace(/[^A-Z]/g, '');

    console.log(`[ZENTRIX] Intencao analisada: ${targetAgent}`);

    // 2. Delegação para o subagente se aplicável
    if (AGENT_PORTS[targetAgent]) {
      const agentPort = AGENT_PORTS[targetAgent];
      const delegationRes = await fetch(`http://localhost:${agentPort}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: prompt })
      });
      const delegationData = await delegationRes.json();

      return res.json({
        success: true,
        orchestrator: "ZENTRIX",
        delegatedTo: targetAgent,
        result: delegationData
      });
    }

    // 3. Resposta direta do ZENTRIX para questões gerais
    const chatRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: "Voce eh ZENTRIX, orquestrador da NEXA FUTURE." }] },
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const chatData = await chatRes.json();
    const responseText = chatData.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      agent: "ZENTRIX",
      response: responseText
    });

  } catch (error) {
    console.error("[ZENTRIX ERROR]", error.message);
    res.status(500).json({
      error: "Erro ao processar comando",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`[NEXA FUTURE] ZENTRIX online na porta ${PORT}`);
});
