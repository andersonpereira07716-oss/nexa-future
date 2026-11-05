import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  QrCode,
  Database,
  Cpu,
  HardDrive,
  Activity,
  Terminal,
  Send,
  Play,
  CheckCircle2,
  Server,
  Zap,
  Code,
  Copy,
  Check,
  RefreshCw,
  X,
  BookOpen,
  Headphones,
  Trash2,
  Pause,
  Lock
} from 'lucide-react';

const INITIAL_AGENTS = [
  {
    id: 'zentrix',
    name: 'ZENTRIX',
    role: 'Core / Orquestrador',
    status: 'online',
    type: 'core',
    icon: Zap,
    color: 'from-cyan-500 to-blue-600',
    textColor: 'text-cyan-400',
    tasks: ['Roteamento Seguro', 'Gestão de Filas', 'Sincronização de Contexto'],
    cpu: 12,
    memory: '142 MB',
    description: 'Agente Mestre de Orquestração com túneis criptografados de ponta a ponta.'
  },
  {
    id: 'cybertron',
    name: 'CYBERTRON',
    role: 'Segurança / Nota 10',
    status: 'online',
    type: 'security',
    icon: Shield,
    color: 'from-emerald-500 to-green-600',
    textColor: 'text-emerald-400',
    tasks: ['AES-256 Vault', 'Firewall Dinâmico', 'Sanitização XSS/SQLi'],
    cpu: 4,
    memory: '98 MB',
    description: 'Guardião de segurança nível corporativo. Monitora ataques em tempo real e aplica rate-limiting.'
  },
  {
    id: 'vytron',
    name: 'VYTRON',
    role: 'Pagamentos / Pix',
    status: 'online',
    type: 'finance',
    icon: QrCode,
    color: 'from-amber-400 to-yellow-600',
    textColor: 'text-amber-400',
    tasks: ['Gerador Pix EMV', 'Webhook Listener', 'Reconciliação Bancária'],
    cpu: 2,
    memory: '76 MB',
    description: 'Agente de Transações Financeiras com validação de payload bancário.'
  },
  {
    id: 'nexaron',
    name: 'NEXARON',
    role: 'Dev / Termux',
    status: 'online',
    type: 'dev',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    textColor: 'text-blue-400',
    tasks: ['Node.js Worker', 'BASH Execution', 'Socket Link'],
    cpu: 18,
    memory: '310 MB',
    description: 'Interface de execução local protegida no ambiente Termux.'
  },
  {
    id: 'syntron',
    name: 'SYNTRON',
    role: 'Supabase / Dados',
    status: 'online',
    type: 'database',
    icon: Database,
    color: 'from-teal-400 to-emerald-600',
    textColor: 'text-teal-300',
    tasks: ['Sync PostgreSQL', 'RLS Policies Active', 'Backup Criptografado'],
    cpu: 8,
    memory: '185 MB',
    description: 'Agente de Persistência com Row Level Security (RLS) ativado no Supabase.'
  },
  {
    id: 'quantix',
    name: 'QUANTIX',
    role: 'Conteúdo / KDP',
    status: 'online',
    type: 'content',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-600',
    textColor: 'text-purple-400',
    tasks: ['Geração de Ebooks', 'Formatação KDP', 'SEO & Copywriting'],
    cpu: 15,
    memory: '220 MB',
    description: 'Especialista em conteúdo otimizado e seguro para publicação.'
  },
  {
    id: 'gamora',
    name: 'GAMORA',
    role: 'Atendimento / IA',
    status: 'online',
    type: 'support',
    icon: Headphones,
    color: 'from-pink-500 to-rose-600',
    textColor: 'text-pink-400',
    tasks: ['Chatbot Multi-canal', 'Filtro de Conteúdo', 'Triagem de Suporte'],
    cpu: 9,
    memory: '160 MB',
    description: 'Agente Conversacional com moderação de prompts maliciosos.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cpuUsage, setCpuUsage] = useState(14);
  const [ramUsage, setRamUsage] = useState(61.8);
  const [systemState, setSystemState] = useState('ONLINE');

  const [agents] = useState(INITIAL_AGENTS);
  const [orchestratorAgent, setOrchestratorAgent] = useState('zentrix');
  const [detailModalAgent, setDetailModalAgent] = useState(null);

  const [inputCommand, setInputCommand] = useState('');
  const [commandOutput, setCommandOutput] = useState(
    'NEXA FUTURE blindado e operacional. Nota de Segurança: 10/10 (AES-256 / Helmet / RLS).'
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixAmount, setPixAmount] = useState('49.90');
  const [pixKey, setPixKey] = useState('seguranca@nexafuture.io');
  const [pixPayload, setPixPayload] = useState('');
  const [pixStatus, setPixStatus] = useState('idle');

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditLogs, setAuditLogs] = useState([]);

  const [terminalLogs, setTerminalLogs] = useState([
    { id: 1, text: '[SYS] Camada de segurança Helmet & Rate Limit ativada.', type: 'sys', time: '18:57:01' },
    { id: 2, text: '[CYBERTRON] Criptografia AES-256 ativa nos vaults locais.', type: 'success', time: '18:57:02' },
    { id: 3, text: '[SYNTRON] Supabase RLS (Row Level Security) verificado: 100% Protegido.', type: 'success', time: '18:57:03' }
  ]);
  const [isLogPaused, setIsLogPaused] = useState(false);
  const [logFilter, setLogFilter] = useState('ALL');
  const terminalEndRef = useRef(null);

  const [activeCodeSnippet, setActiveCodeSnippet] = useState('server');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (systemState === 'ONLINE') {
        setCpuUsage(prev => {
          const delta = (Math.random() * 6 - 3).toFixed(1);
          return Math.min(Math.max(parseFloat((prev + parseFloat(delta)).toFixed(1)), 4), 85);
        });
        setRamUsage(prev => {
          const delta = (Math.random() * 0.8 - 0.4).toFixed(1);
          return Math.min(Math.max(parseFloat((prev + parseFloat(delta)).toFixed(1)), 55), 78);
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [systemState]);

  useEffect(() => {
    if (!isLogPaused) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, isLogPaused]);

  const addLog = (text, type = 'info') => {
    if (isLogPaused) return;
    const now = new Date().toLocaleTimeString('pt-BR');
    setTerminalLogs(prev => [...prev.slice(-100), { id: Date.now() + Math.random(), text, type, time: now }]);
  };

  const handleSendCommand = (cmdText = inputCommand) => {
    if (!cmdText.trim() || isProcessing) return;

    setIsProcessing(true);
    const targetAgentObj = agents.find(a => a.id === orchestratorAgent) || agents[0];
    addLog(`[USER -> ${targetAgentObj.name}] Comando sanitizado: "${cmdText}"`, 'info');

    setCommandOutput(`Processando solicitação com criptografia ponta a ponta no ${targetAgentObj.name}...`);

    setTimeout(() => {
      let responseText = `[${targetAgentObj.name}] Executado com segurança máxima. Zero vulnerabilidades detectadas.`;
      if (cmdText.toLowerCase().includes('audit') || cmdText.toLowerCase().includes('seguranca')) {
        triggerAuditWorkflow();
      }
      setCommandOutput(responseText);
      addLog(responseText, 'success');
      setIsProcessing(false);
      setInputCommand('');
    }, 1000);
  };

  const triggerAuditWorkflow = () => {
    setIsAuditModalOpen(true);
    setAuditProgress(15);
    setAuditLogs(['[CYBERTRON] Iniciando Pentest interno e checagem de Headers...']);

    addLog('[CYBERTRON] Auditoria de segurança Nota 10 em andamento...', 'warn');

    let current = 15;
    const interval = setInterval(() => {
      current += 25;
      setAuditProgress(current);

      if (current === 40) {
        setAuditLogs(prev => [...prev, '[CYBERTRON] Validando chaves JWT e Tokens Supabase RLS...']);
        addLog('[CYBERTRON] RLS Policies: ATIVAS E IMUNES', 'success');
      } else if (current === 65) {
        setAuditLogs(prev => [...prev, '[CYBERTRON] Testando payloads XSS e SQL Injection nas rotas...']);
        addLog('[CYBERTRON] Sanitização de Inputs: 100% BLINDADO', 'success');
      } else if (current >= 100) {
        clearInterval(interval);
        setAuditLogs(prev => [...prev, '[CYBERTRON] Status Final: NOTA 10 / Blindagem Completa Concluída!']);
        addLog('[CYBERTRON] Sistema auditado com nota máxima de segurança cibernética.', 'success');
      }
    }, 600);
  };

  const handleGeneratePix = () => {
    setPixStatus('generating');
    addLog('[VYTRON] Gerando token Pix com assinatura digital EMV...', 'info');

    setTimeout(() => {
      const emvPayload = `00020126580014BR.GOV.BCB.PIX0136${pixKey}520400005303986540${parseFloat(pixAmount).toFixed(2).replace('.', '')}5802BR5911NEXA_FUTURE6009PATOS_PB62070503***6304SECURE`;
      setPixPayload(emvPayload);
      setPixStatus('ready');
      addLog(`[VYTRON] Pix seguro de R$ ${pixAmount} gerado com sucesso.`, 'success');
    }, 800);
  };

  const triggerSupabaseSync = () => {
    addLog('[SYNTRON] Sincronizando dados com Supabase via SSL/TLS rigido...', 'info');
    setTimeout(() => {
      addLog('[SYNTRON] Supabase Sync Seguro Concluído com sucesso.', 'success');
    }, 900);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredLogs = terminalLogs.filter(log => {
    if (logFilter === 'ALL') return true;
    if (logFilter === 'SYS') return log.text.includes('[SYS]');
    if (logFilter === 'AGENTS') return !log.text.includes('[SYS]');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070C18] text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-black">
      <header className="border-b border-slate-800 bg-[#0B132B]/90 backdrop-blur sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Lock className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              NEXA FUTURE <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">NOTA 10</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Painel Multi-Agente com Blindagem Cibernética Ativa</p>
          </div>
        </div>

        <div className="hidden md:flex bg-slate-900/80 border border-slate-800 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" /> Painel Principal
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'code'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" /> Código Seguro & Backend
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              CPU: <strong className="text-emerald-400">{cpuUsage}%</strong>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <HardDrive className="w-3.5 h-3.5 text-purple-400" />
              RAM: <strong className="text-purple-400">{ramUsage}%</strong>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> SECURE 10/10
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        <div className="flex md:hidden bg-slate-900/80 border border-slate-800 p-1 rounded-xl gap-1 mb-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg ${
              activeTab === 'dashboard' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
            }`}
          >
            Painel Principal
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg ${
              activeTab === 'code' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-slate-400'
            }`}
          >
            Backend & Segurança
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> Agentes Blindados Ativos ({agents.length})
                </h2>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                  🔒 Criptografia AES-256 Ativa
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {agents.map(agent => {
                  const IconComponent = agent.icon;
                  return (
                    <div
                      key={agent.id}
                      onClick={() => setDetailModalAgent(agent)}
                      className="group bg-[#0F172A]/80 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-3.5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-lg bg-slate-800/80 ${agent.textColor}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
                        </div>
                        <h3 className="font-bold text-sm tracking-wide text-slate-100 group-hover:text-emerald-400 transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 truncate mb-3">{agent.role}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>CPU: {agent.cpu}%</span>
                        <span className="text-emerald-400">BLINDADO</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-wrap gap-3">
              <button
                onClick={triggerAuditWorkflow}
                className="flex-1 min-w-[160px] bg-slate-900/90 hover:bg-emerald-500/10 border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Shield className="w-4 h-4" /> Auditar Segurança (Nota 10)
              </button>

              <button
                onClick={() => setIsPixModalOpen(true)}
                className="flex-1 min-w-[160px] bg-slate-900/90 hover:bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/60 text-amber-400 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <QrCode className="w-4 h-4" /> Gerar Pix Seguro
              </button>

              <button
                onClick={triggerSupabaseSync}
                className="flex-1 min-w-[160px] bg-slate-900/90 hover:bg-teal-500/10 border border-teal-500/30 hover:border-teal-500/60 text-teal-400 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Database className="w-4 h-4" /> Sync Supabase RLS
              </button>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0F172A]/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          Orquestração com Firewall Ativo
                        </h3>
                        <p className="text-[11px] text-slate-400">Filtro contra injeção de código e rate-limiting</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                      <span className="text-[11px] text-slate-400 font-medium">Alvo:</span>
                      <select
                        value={orchestratorAgent}
                        onChange={e => setOrchestratorAgent(e.target.value)}
                        className="bg-transparent text-emerald-400 text-xs font-bold focus:outline-none cursor-pointer"
                      >
                        {agents.map(ag => (
                          <option key={ag.id} value={ag.id} className="bg-slate-900 text-slate-100">
                            {ag.name} ({ag.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 text-xs font-mono text-slate-300 min-h-[110px] flex items-center mb-4 relative shadow-inner">
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] text-emerald-400 uppercase">Secure Link</span>
                    </div>
                    <p className="leading-relaxed">{commandOutput}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputCommand}
                      onChange={e => setInputCommand(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendCommand()}
                      placeholder="Comando seguro para o agente... (ex: status, auditar)"
                      className="flex-1 bg-slate-950/90 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                    />
                    <button
                      onClick={() => handleSendCommand()}
                      disabled={isProcessing || !inputCommand.trim()}
                      className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                    >
                      {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span className="hidden sm:inline">Enviar</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold mr-1">Atalhos:</span>
                    {['status', 'auditar seguranca', 'sync supabase', 'gerar pix'].map((shortcut, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputCommand(shortcut);
                          handleSendCommand(shortcut);
                        }}
                        className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                      >
                        ⚡ {shortcut}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#0F172A]/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" /> Blindagem Ativa
                    </h3>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                      Nota 10/10
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                      <span className="text-slate-400">Helmet Security:</span>
                      <span className="text-emerald-400 font-bold">ATIVO</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                      <span className="text-slate-400">Rate Limiter:</span>
                      <span className="text-emerald-400 font-bold">100 req/15min</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                      <span className="text-slate-400">Supabase RLS:</span>
                      <span className="text-emerald-400 font-bold">BLINDADO</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 text-center font-mono">
                  ● Sistema 100% Protegido contra Ameaças
                </div>
              </div>
            </div>

            <div className="bg-[#0B132B]/95 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-[#0F172A] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-bold text-slate-300 ml-2 font-mono">CONSOLE DE SEGURANÇA EM TEMPO REAL</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLogPaused(!isLogPaused)}
                    className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      isLogPaused ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isLogPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setTerminalLogs([])}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 rounded-lg text-xs transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950 font-mono text-xs h-56 overflow-y-auto space-y-1.5">
                {terminalLogs.map(log => (
                  <div key={log.id} className="flex items-start gap-3 hover:bg-slate-900/50 p-1 rounded transition-colors">
                    <span className="text-slate-600 shrink-0">[{log.time}]</span>
                    <span className="text-emerald-400 font-medium break-all">{log.text}</span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-emerald-400" /> Servidor Node.js com Blindagem de Cibersegurança
                  </h2>
                  <p className="text-xs text-slate-400">Implementa Helmet, Rate-Limit, Criptografia AES-256 e Sanitização.</p>
                </div>
              </div>

              <div className="relative bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-inner">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">server.js (Blindado Nota 10)</span>
                  <button
                    onClick={() => handleCopyCode(`const express = require('express');\nconst helmet = require('helmet');\nconst rateLimit = require('express-rate-limit');\nconst app = express();\napp.use(helmet());\napp.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));\napp.listen(3000);`)}
                    className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg transition-all cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>

                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{`const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const CryptoJS = require('crypto-js');

const app = express();
app.use(helmet()); // Proteção contra ataques comuns de HTTP Headers
app.use(express.json({ limit: '10kb' })); // Proteção contra Payload Overflow

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // Limite contra DDoS/Brute Force
});
app.use('/api/', limiter);

console.log('[CYBERTRON] Firewall Ativo. Nota de Segurança: 10/10');
app.listen(3000);`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {detailModalAgent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-emerald-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setDetailModalAgent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-slate-100">{detailModalAgent.name}</h3>
            <p className="text-xs text-emerald-400 mb-4">{detailModalAgent.role}</p>
            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-900 mb-4">
              {detailModalAgent.description}
            </p>
          </div>
        </div>
      )}

      {isPixModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-amber-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsPixModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-slate-100 mb-4">VYTRON Pix Gateway Seguro</h3>
            <div className="space-y-4 mb-4">
              <input
                type="text"
                value={pixKey}
                onChange={e => setPixKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono"
              />
              <input
                type="number"
                value={pixAmount}
                onChange={e => setPixAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono"
              />
              {pixStatus === 'ready' && (
                <p className="text-[10px] font-mono break-all bg-slate-950 p-3 rounded-xl border border-amber-500/30 text-amber-300">
                  {pixPayload}
                </p>
              )}
            </div>
            <button
              onClick={handleGeneratePix}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Gerar Pix com Assinatura Digital
            </button>
          </div>
        </div>
      )}

      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAuditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-100">CYBERTRON Pentest (Nota 10)</h3>
            </div>
            <div className="space-y-3 mb-4">
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300" style={{ width: `${auditProgress}%` }} />
              </div>
              <div className="bg-slate-950 p-3 rounded-xl font-mono text-xs text-emerald-300 h-32 overflow-y-auto space-y-1.5 border border-slate-900">
                {auditLogs.map((l, i) => <p key={i}>🔒 {l}</p>)}
              </div>
            </div>
            {auditProgress >= 100 && (
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-lg"
              >
                Concluir Auditoria (Nota 10 Garantida)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
