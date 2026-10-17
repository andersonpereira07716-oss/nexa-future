require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
app.use(express.json());
const PORT = process.env.SYNTRON_PORT || 3004;

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');

app.get('/status', (req, res) => {
  res.json({ system: "NEXA FUTURE", agent: "SYNTRON", role: "Dados e Supabase", status: "online" });
});

app.post('/task', async (req, res) => {
  const { action, table, data } = req.body;
  console.log(`[SYNTRON] Processando operação de dados no Supabase...`);
  res.json({ success: true, agent: "SYNTRON", message: "Conexão com Supabase operante." });
});

app.listen(PORT, () => console.log(`[NEXA FUTURE] SYNTRON online na porta ${PORT}`));
