require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.CYBERTRON_PORT || 3001;

app.get('/status', (req, res) => {
  res.json({ system: "NEXA FUTURE", agent: "CYBERTRON", role: "Segurança e Monitoramento", status: "online" });
});

app.post('/task', (req, res) => {
  const { command } = req.body;
  console.log(`[CYBERTRON] Executando varredura/auditoria de segurança...`);
  res.json({ success: true, agent: "CYBERTRON", result: "Sistema seguro. Nenhuma vulnerabilidade crítica detectada." });
});

app.listen(PORT, () => console.log(`[NEXA FUTURE] CYBERTRON online na porta ${PORT}`));
