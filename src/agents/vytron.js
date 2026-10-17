require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.VYTRON_PORT || 3002;

// Status do Agente VYTRON
app.get('/status', (req, res) => {
  res.json({
    system: "NEXA FUTURE",
    agent: "VYTRON",
    role: "Automações e Pagamentos",
    status: "online",
    timestamp: new Date().toISOString()
  });
});

// Endpoint para processamento de Webhooks (Mercado Pago / Pix / Licenças)
app.post('/webhook', (req, res) => {
  const paymentData = req.body;
  
  console.log(`[VYTRON] Webhook recebido com sucesso:`, JSON.stringify(paymentData));

  // Lógica simulada de processamento de pagamento ou geração de Pix
  res.json({
    success: true,
    agent: "VYTRON",
    message: "Webhook processado e sincronizado com o ecossistema.",
    receivedData: paymentData
  });
});

app.listen(PORT, () => {
  console.log(`[NEXA FUTURE] VYTRON online na porta ${PORT}`);
});
