require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Servir a pasta public como estática para o PWA
app.use(express.static(path.join(__dirname, '../../public')));

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

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
  if (!prompt) return res.status(400).json({ error: "O campo 'prompt' é obrigatório." });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`;
    
    const analysisPrompt = `Analise o comando e escolha o agente: CYBERTRON, VYTRON, NEXARON, SYNTRON, QUANTIX, GAMORA ou ZENTRIX. Comando: "${prompt}". Responda APENAS com o nome do agente.`;

    const aiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: analysisPrompt }] }] })
    });

    const aiData = await aiRes.json();
    const targetAgent = aiData.candidates[0].content.parts[0].text.trim().toUpperCase().replace(/[^A-Z]/g, '');

    if (AGENT_PORTS[targetAgent]) {
      const delegationRes = await fetch(`http://localhost:${AGENT_PORTS[targetAgent]}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: prompt })
      });
      const delegationData = await delegationRes.json();
      return res.json({ success: true, orchestrator: "ZENTRIX", delegatedTo: targetAgent, result: delegationData });
    }

    const chatRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: "Você é o ZENTRIX, orquestrador da NEXA FUTURE." }] },
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const chatData = await chatRes.json();
    res.json({ success: true, agent: "ZENTRIX", response: chatData.candidates[0].content.parts[0].text });

  } catch (error) {
    res.status(500).json({ error: "Erro ao processar comando", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[NEXA FUTURE] ZENTRIX online na porta ${PORT}`);
});
