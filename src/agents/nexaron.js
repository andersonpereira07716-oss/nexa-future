require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.NEXARON_PORT || 3003;

app.get('/status', (req, res) => {
  res.json({ system: "NEXA FUTURE", agent: "NEXARON", role: "Dev, Termux e Arquitetura", status: "online" });
});

app.post('/task', (req, res) => {
  const { command } = req.body;
  console.log(`[NEXARON] Analisando arquitetura de código...`);
  res.json({ success: true, agent: "NEXARON", result: "Ambiente Termux validado e pronto para execução de scripts." });
});

app.listen(PORT, () => console.log(`[NEXA FUTURE] NEXARON online na porta ${PORT}`));
