require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.QUANTIX_PORT || 3005;

app.get('/status', (req, res) => {
  res.json({ system: "NEXA FUTURE", agent: "QUANTIX", role: "Geração de Conteúdo e KDP", status: "online" });
});

app.post('/task', (req, res) => {
  const { topic } = req.body;
  console.log(`[QUANTIX] Estruturando conteúdo/e-book...`);
  res.json({ success: true, agent: "QUANTIX", result: "Estrutura de capítulos e metadados KDP gerados com sucesso." });
});

app.listen(PORT, () => console.log(`[NEXA FUTURE] QUANTIX online na porta ${PORT}`));
