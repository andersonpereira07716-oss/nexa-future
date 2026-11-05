// NEXA FUTURE - Módulo de Prospecção e Vendas Automatizadas (GAMORA & QUANTIX)
const http = require('http');

const prospects = [
  { setor: 'Supermercados', contato: 'Gerente Comercial', oferta: 'Landing Page de Ofertas da Semana + WhatsApp' },
  { setor: 'Barbearias', contato: 'Proprietário', oferta: 'Sistema de Agendamento Online + Pix Automatizado (VYTRON)' },
  { setor: 'Consultórios / Clínicas', contato: 'Recepção', oferta: 'Chatbot de Triagem e Confirmação de Consultas' }
];

function gerarScriptAbordagem(prospect) {
  return `
==================================================
🎯 PROSPECÇÃO ATIVA - SETOR: ${prospect.setor.toUpperCase()}
==================================================
Olá! Notiiquei que o seu negócio em Patos/PB pode escalar digitalmente.
Nós da NEXA Future criamos soluções sob medida: ${prospect.oferta}.
Sem mensalidades abusivas e com entrega rápida. Vamos fechar essa parceria?
==================================================
  `;
}

console.log('[GAMORA] Iniciando varredura de prospecção comercial...');
prospects.forEach((p, index) => {
  console.log(`\n[Lead #${index + 1}] Setor: ${p.setor} | Oferta: ${p.oferta}`);
  console.log(gerarScriptAbordagem(p));
});

// Servidor simples para API de Vendas
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({
    status: 'ONLINE',
    agente: 'GAMORA / QUANTIX',
    mensagem: 'Funil de prospecção ativo e pronto para capturar clientes locais!',
    leadsAtivos: prospects.length
  }));
});

server.listen(4000, () => {
  console.log('[SYS] Módulo de Vendas rodando na porta 4000.');
});
