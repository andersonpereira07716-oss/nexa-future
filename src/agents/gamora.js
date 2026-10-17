require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.GAMORA_PORT || 3006;

app.get('/status', (req, res) => {
  res.json({ system: "NEXA FUTURE", agent: "GAMORA", role: "Atendimento e Omnichannel", status: "online" });
});

app.post('/task', (req, res) => {
  const { message } = req.body;
  console.log(`[GAMORA] Processando suporte ao cliente...`);
  res.json({ success: true, agent: "GAMORA", response: "Olá! Como posso ajudar no seu atendimento hoje?" });
});

app.listen(PORT, () => console.log(`[NEXA FUTURE] GAMORA online na porta ${PORT}`));
