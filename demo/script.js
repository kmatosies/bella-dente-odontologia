// =================================================================
// BELLA DENTE — DEMO ESTÁTICA
// Todos os dados são 100% fictícios para fins de portfólio.
// =================================================================

const PACIENTES = [
  { id:1, nome:"Ana Paula Ferreira",    idade:34, telefone:"(11) 98765-4321", tratamento:"Clareamento Dental",    status:"Ativo",          ultimaConsulta:"15/04/2026", codigo:"BD-0001", totalValue: 1200, paidValue: 600, address: "Rua A, 123 - Centro" },
  { id:2, nome:"Carlos Eduardo Souza",  idade:47, telefone:"(21) 97654-3210", tratamento:"Implante Dentário",     status:"Ativo",          ultimaConsulta:"10/04/2026", codigo:"BD-0002", totalValue: 3500, paidValue: 3500, address: "Av. Brasil, 456 - Copacabana" },
  { id:3, nome:"Mariana Lima Costa",    idade:29, telefone:"(31) 96543-2109", tratamento:"Ortodontia",            status:"Em Tratamento",  ultimaConsulta:"08/04/2026", codigo:"BD-0003", totalValue: 2000, paidValue: 500, address: "Rua da Paz, 789 - Savassi" },
  { id:4, nome:"Roberto Alves Neto",    idade:52, telefone:"(41) 95432-1098", tratamento:"Canal",                 status:"Concluído",      ultimaConsulta:"01/04/2026", codigo:"BD-0004", totalValue: 1800, paidValue: 1800, address: "Rua XV de Novembro, 101 - Batel" },
  { id:5, nome:"Fernanda Oliveira",     idade:38, telefone:"(51) 94321-0987", tratamento:"Limpeza e Profilaxia", status:"Ativo",          ultimaConsulta:"20/04/2026", codigo:"BD-0005", totalValue: 280, paidValue: 280, address: "Av. Ipiranga, 202 - Moinhos de Vento" },
  { id:6, nome:"João Henrique Matos",   idade:25, telefone:"(61) 93210-9876", tratamento:"Extração do Siso",      status:"Ativo",          ultimaConsulta:"18/04/2026", codigo:"BD-0006", totalValue: 450, paidValue: 0, address: "SQS 305, Bloco A - Asa Sul" },
];

const AGENDA = [
  { id: 1, data: "2026-04-24", horario: "08:00", paciente: "Ana Paula Ferreira", procedimento: "Clareamento — Sessão 2", status: "confirmado", avatar: "A" },
  { id: 2, data: "2026-04-24", horario: "09:00", paciente: "Carlos Eduardo Souza", procedimento: "Acompanhamento de Implante", status: "confirmado", avatar: "C" },
  { id: 3, data: "2026-04-24", horario: "10:30", paciente: "Mariana Lima Costa", procedimento: "Ajuste de Aparelho", status: "aguardando", avatar: "M" },
  { id: 4, data: "2026-04-25", horario: "09:00", paciente: "Roberto Alves Neto", procedimento: "Retorno Pós-Canal", status: "confirmado", avatar: "R" },
  { id: 5, data: "2026-04-25", horario: "11:00", paciente: "Fernanda Oliveira", procedimento: "Limpeza Semestral", status: "confirmado", avatar: "F" },
  { id: 6, data: "2026-04-26", horario: "08:30", paciente: "João Henrique Matos", procedimento: "Avaliação Pós-Extração", status: "aguardando", avatar: "J" },
];

const TRANSACOES = [
  { data:"01/04/2026", descricao:"Clareamento — Ana Paula",       tipo:"receita", valor:1200.00, pagamento:"PIX",          status:"pago"     },
  { data:"03/04/2026", descricao:"Implante — Carlos Eduardo",     tipo:"receita", valor:3500.00, pagamento:"Cartão",       status:"pago"     },
  { data:"05/04/2026", descricao:"Aluguel da Clínica",            tipo:"despesa", valor:2800.00, pagamento:"Transferência",status:"pago"     },
  { data:"07/04/2026", descricao:"Materiais Odontológicos",       tipo:"despesa", valor: 650.00, pagamento:"Boleto",       status:"pago"     },
  { data:"08/04/2026", descricao:"Ajuste de Aparelho — Mariana", tipo:"receita", valor: 350.00, pagamento:"PIX",          status:"pago"     },
  { data:"10/04/2026", descricao:"Canal — Roberto Alves",         tipo:"receita", valor:1800.00, pagamento:"Dinheiro",    status:"pago"     },
];

const PRONTUARIOS = [
  { paciente:"Ana Paula Ferreira",   data:"15/04/2026", procedimento:"Clareamento Dental — Sessão 1",      observacao:"Paciente tolera bem o gel clareador (HP 35%). Sensibilidade leve relatada nas primeiras 24h. Recomendado dessensibilizante.", profissional:"Dr. Edimilson Matos" },
  { paciente:"Carlos Eduardo Souza", data:"10/04/2026", procedimento:"Acompanhamento de Implante",          observacao:"Osseointegração do implante em região 46 apresenta evolução satisfatória. Hemograma dentro dos padrões.", profissional:"Dr. Edimilson Matos" },
];

// ---- ESTADO GLOBAL DA DEMO ----
let currentTab = 'agenda';
let selectedDate = new Date(2026, 3, 24); // Abril de 2026
let financeTab = 'all';

const pageTitles = { agenda: "Agenda", pacientes: "Pacientes", financeiro: "Financeiro", dashboard: "Painel Geral", relatorios: "Relatórios", prontuario: "Prontuário", configuracoes: "Configurações" };

// ---- NAVEGAÇÃO ----
function navigateTo(target) {
  currentTab = target;
  
  // Atualiza botões da sidebar
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const isActive = btn.dataset.target === target;
    if(isActive) {
      btn.className = "nav-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group bg-teal-600 text-white shadow-md shadow-teal-600/20";
    } else {
      btn.className = "nav-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white";
    }
  });

  const t = document.getElementById('page-title');
  if (t) t.textContent = pageTitles[target] || '';
  
  // Fecha sidebar no mobile
  document.getElementById('sidebar')?.classList.add('-translate-x-full');
  document.getElementById('sidebar-overlay')?.classList.add('hidden');

  renderSection(target);
}

document.querySelectorAll('.nav-btn').forEach(item => item.addEventListener('click', () => navigateTo(item.dataset.target)));

// ---- HEADER ACTIONS ----
// Dark Mode
document.getElementById('dark-mode-toggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  document.getElementById('moon-icon')?.classList.toggle('hidden');
  document.getElementById('sun-icon')?.classList.toggle('hidden');
});

// Notifications
document.getElementById('notif-btn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('notif-menu')?.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  document.getElementById('notif-menu')?.classList.add('hidden');
});

// Hamburger
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('-translate-x-full');
  document.getElementById('sidebar-overlay')?.classList.toggle('hidden');
});

document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.add('-translate-x-full');
  document.getElementById('sidebar-overlay')?.classList.add('hidden');
});

// ---- UTILS ----
function currency(v) { return v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }); }
function getStatusStyle(s) {
  s = s.toLowerCase();
  if (s === 'confirmado' || s === 'pago') return 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300';
  if (s === 'concluido') return 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300';
  if (s === 'cancelado') return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
  if (s === 'aguardando' || s === 'pendente') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
  return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
}

// ---- MODAL ----
function openModal(html) {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  if(modal && content) {
    content.innerHTML = html;
    modal.classList.remove('hidden');
    if(window.lucide) window.lucide.createIcons();
  }
}

window.closeModal = function() {
  document.getElementById('modal-container')?.classList.add('hidden');
}

// ---- RENDERIZADORES ----
function renderSection(t) {
  const map = { agenda: renderAgenda, pacientes: renderPacientes, financeiro: renderFinanceiro, dashboard: renderDashboard, relatorios: renderRelatorios, prontuario: renderProntuario, configuracoes: renderConfiguracoes };
  if(map[t]) map[t]();
  if(window.lucide) window.lucide.createIcons();
}

// AGENDA (CALENDÁRIO FIEL)
function renderAgenda() {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const monthName = `${monthNames[month]} ${year}`;
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push({ day: '', current: false });
  for (let i = 1; i <= daysInMonth; i++) {
    const dStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
    const hasApps = AGENDA.some(a => a.data === dStr);
    days.push({ day: i, current: true, today: i === 24 && month === 3, dateStr: dStr, hasApps });
  }

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const dayApps = AGENDA.filter(a => a.data === selectedDateStr);

  document.getElementById('content-container').innerHTML = `
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 animate-in fade-in duration-300">
      
      <!-- CALENDÁRIO VISUAL (Esquerda) -->
      <div class="flex-1 rounded-2xl shadow-sm border p-3 sm:p-6 flex flex-col transition-colors bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg sm:text-2xl font-bold capitalize dark:text-white">${monthName}</h2>
          <div class="flex gap-2 items-center">
            <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
            <button onclick="goToToday()" class="px-3 py-1 text-sm font-medium bg-teal-50 dark:bg-slate-700 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-100 transition-colors">Hoje</button>
            <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
          </div>
        </div>

        <div class="grid grid-cols-7 mb-2 text-center">
          ${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => `<div class="text-[10px] font-bold uppercase py-2 text-slate-400 dark:text-slate-500">${d}</div>`).join('')}
        </div>

        <div class="grid grid-cols-7 flex-1 auto-rows-fr gap-1">
          ${days.map(d => {
            const isSelected = d.current && d.day === selectedDate.getDate();
            return `
              <div onclick="${d.current ? `selectDate(${d.day})` : ''}" class="
                relative p-1.5 border rounded-xl cursor-pointer transition-all flex flex-col items-center h-16 sm:h-20 lg:h-24 overflow-hidden
                ${!d.current ? 'text-slate-300 dark:text-slate-700 bg-slate-50/50 dark:bg-slate-900/30 border-transparent cursor-default' : 'text-slate-700 dark:text-slate-300 border-transparent hover:bg-gray-50 dark:hover:bg-slate-700/50'}
                ${isSelected ? '!bg-teal-600 !text-white shadow-md transform scale-105 z-10' : ''}
                ${d.today && !isSelected ? 'bg-teal-50 dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-bold border-teal-100 dark:border-slate-600' : ''}
              ">
                <span class="text-xs sm:text-sm ${isSelected ? 'font-bold' : ''}">${d.day}</span>
                ${d.hasApps ? `
                  <div class="w-full mt-1 space-y-px hidden sm:block">
                    ${AGENDA.filter(a => a.data === d.dateStr).slice(0, 2).map(a => `
                      <div class="text-[8px] leading-tight px-1 py-px rounded truncate text-center font-medium ${isSelected ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'}">
                        ${a.paciente.split(' ')[0]}
                      </div>
                    `).join('')}
                    ${AGENDA.filter(a => a.data === d.dateStr).length > 2 ? `<div class="text-[8px] text-center font-bold ${isSelected ? 'text-white/70' : 'text-slate-400'}">+${AGENDA.filter(a => a.data === d.dateStr).length - 2}</div>` : ''}
                  </div>
                  <div class="sm:hidden w-1 h-1 bg-teal-500 rounded-full mt-1"></div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- LISTA E BOTÕES (Direita) -->
      <div class="w-full lg:w-80 xl:w-96 flex flex-col gap-4">
        <div class="bg-gradient-to-br from-teal-700 to-teal-800 p-5 sm:p-6 rounded-2xl text-white shadow-lg">
          <p class="opacity-80 text-[10px] font-bold uppercase tracking-widest mb-1">Agenda para</p>
          <h2 class="text-xl sm:text-2xl font-bold capitalize mb-4">${selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
          <button onclick="simulateNewAppointment()" class="w-full py-3 bg-white text-teal-800 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 active:scale-95">
            <i data-lucide="plus" class="w-4 h-4"></i> Novo Agendamento
          </button>
        </div>

        <div class="flex-1 rounded-2xl shadow-sm border overflow-hidden flex flex-col bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 min-h-[300px]">
          <div class="p-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
            <h3 class="font-bold dark:text-white text-sm">Horários do Dia</h3>
            <span class="text-[10px] font-bold text-slate-400">${dayApps.length} Marcados</span>
          </div>
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            ${dayApps.length === 0 ? `
              <div class="text-center py-10 text-slate-400 dark:text-slate-600">
                <i data-lucide="calendar" class="w-8 h-8 mx-auto mb-2 opacity-20"></i>
                <p class="text-xs">Nenhum agendamento.</p>
              </div>
            ` : dayApps.map(a => `
              <div class="group flex items-center justify-between p-3 rounded-xl border bg-gray-50 dark:bg-slate-900/50 border-gray-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
                <div class="flex items-center gap-3">
                  <span class="font-bold text-teal-600 dark:text-teal-400 text-xs">${a.horario}</span>
                  <div>
                    <p class="text-sm font-bold dark:text-white leading-tight">${a.paciente}</p>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">${a.procedimento}</p>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ${getStatusStyle(a.status)}">${a.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

window.selectDate = function(day) {
  selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
  renderAgenda();
};

window.goToToday = function() {
  selectedDate = new Date(2026, 3, 24);
  renderAgenda();
};

window.simulateNewAppointment = function() {
  openModal(`
    <div class="bg-teal-700 px-6 py-4 flex justify-between items-center">
      <h3 class="text-white font-bold text-lg">Novo Agendamento (Demo)</h3>
      <button onclick="closeModal()" class="text-white/80 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <div>
        <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Paciente</label>
        <div class="h-10 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-lg px-3 flex items-center text-sm text-slate-400">Selecionar paciente...</div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Data</label>
          <div class="h-10 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-lg px-3 flex items-center text-sm text-slate-700 dark:text-slate-300">24/04/2026</div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Horário</label>
          <div class="h-10 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-lg px-3 flex items-center text-sm text-slate-700 dark:text-slate-300">08:00</div>
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Procedimento</label>
        <div class="h-20 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-lg p-3 text-sm text-slate-400">Detalhes do atendimento...</div>
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-slate-700">
        <button onclick="closeModal()" class="px-4 py-2 rounded-lg font-medium text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
        <button onclick="closeModal()" class="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold shadow-md hover:bg-teal-700 transition-all">Salvar</button>
      </div>
    </div>
  `);
}

// PACIENTES (REFINADO)
function renderPacientes() {
  document.getElementById('content-container').innerHTML = `
    <div class="space-y-6 animate-in fade-in duration-300">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div class="relative flex-1 w-full sm:max-w-md">
          <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px]"></i>
          <input type="text" id="busca-pac" oninput="filtrarPac()" placeholder="Buscar por nome do paciente..." class="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm dark:text-white">
        </div>
        <div class="flex gap-2 sm:gap-3">
          <button class="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95">
            <i data-lucide="camera" class="w-4 h-4"></i> Escanear
          </button>
          <button class="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-slate-800 dark:bg-teal-600 hover:bg-slate-900 dark:hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95">
            <i data-lucide="plus" class="w-4 h-4"></i> Novo Paciente
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" id="pac-grid">
        ${renderPacientesGrid(PACIENTES)}
      </div>
    </div>
  `;
}

function renderPacientesGrid(list) {
  if (list.length === 0) return `<div class="col-span-full py-20 text-center text-slate-400">Nenhum paciente encontrado.</div>`;
  return list.map(p => `
    <div class="rounded-2xl border p-5 transition-all hover:shadow-lg bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 group">
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xl border border-teal-100 dark:border-teal-800">
            ${p.nome[0]}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-slate-800 dark:text-white">${p.nome}</h3>
              <span class="text-[9px] font-mono bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-md font-bold uppercase">${p.codigo}</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400">${p.telefone}</p>
          </div>
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button class="p-1.5 text-slate-400 hover:text-teal-600"><i data-lucide="pencil" class="w-4 h-4"></i></button>
          <button class="p-1.5 text-slate-400 hover:text-rose-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 py-3 border-y border-gray-50 dark:border-slate-700 my-4">
        <div>
          <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Tratamento</p>
          <p class="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">${p.tratamento}</p>
        </div>
        <div>
          <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Status</p>
          <span class="text-[9px] font-bold uppercase text-teal-600 dark:text-teal-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span> ${p.status}
          </span>
        </div>
      </div>
      <button class="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-xs font-bold border border-gray-100 dark:border-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-300 hover:border-teal-200 transition-all flex items-center justify-center gap-2">
        <i data-lucide="clipboard-list" class="w-3.5 h-3.5"></i> Abrir Prontuário
      </button>
    </div>
  `).join('');
}

window.filtrarPac = function() {
  const q = document.getElementById('busca-pac').value.toLowerCase();
  const list = PACIENTES.filter(p => p.nome.toLowerCase().includes(q));
  document.getElementById('pac-grid').innerHTML = renderPacientesGrid(list);
  if(window.lucide) window.lucide.createIcons();
};

// FINANCEIRO (COM TABS FIÉIS)
function renderFinanceiro() {
  const receita = TRANSACOES.filter(t=>t.tipo==='receita').reduce((a,t)=>a+t.valor,0);
  const despesa = TRANSACOES.filter(t=>t.tipo==='despesa').reduce((a,t)=>a+t.valor,0);
  
  const filtered = TRANSACOES.filter(t => {
    if(financeTab === 'income') return t.tipo === 'receita';
    if(financeTab === 'expense') return t.tipo === 'despesa';
    return true;
  });

  document.getElementById('content-container').innerHTML = `
    <div class="space-y-6 animate-in fade-in duration-300">
      
      <!-- HEADER FINANCEIRO -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-xl p-1 border border-gray-200 dark:border-slate-700">
          <button onclick="setFinanceTab('all')" class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${financeTab==='all' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}">Ver Todos</button>
          <button onclick="setFinanceTab('income')" class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${financeTab==='income' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}">Receitas</button>
          <button onclick="setFinanceTab('expense')" class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${financeTab==='expense' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}">Despesas</button>
        </div>
        <button onclick="simulateFinanceModal()" class="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 w-full sm:w-auto">
          <i data-lucide="plus" class="w-4 h-4"></i> Novo Lançamento
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm border-l-4 border-l-emerald-500">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entradas do Mês</p>
          <p class="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">R$ ${currency(receita)}</p>
        </div>
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm border-l-4 border-l-rose-500">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saídas do Mês</p>
          <p class="text-3xl font-extrabold text-rose-500 dark:text-rose-400 mt-1">R$ ${currency(despesa)}</p>
        </div>
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm border-l-4 border-l-teal-500">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo Disponível</p>
          <p class="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">R$ ${currency(receita - despesa)}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th class="px-6 py-4 border-b dark:border-slate-700">Data</th>
                <th class="px-6 py-4 border-b dark:border-slate-700">Descrição</th>
                <th class="px-6 py-4 border-b dark:border-slate-700">Paciente / Origem</th>
                <th class="px-6 py-4 border-b dark:border-slate-700 text-right">Valor</th>
                <th class="px-6 py-4 border-b dark:border-slate-700 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-slate-700">
              ${filtered.map(t => `
                <tr class="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 font-medium">${t.data}</td>
                  <td class="px-6 py-4">
                    <p class="font-bold text-slate-800 dark:text-white">${t.descricao}</p>
                    <p class="text-[10px] text-slate-400 uppercase font-bold">${t.pagamento}</p>
                  </td>
                  <td class="px-6 py-4">
                    ${t.tipo==='receita' ? `<span class="text-teal-600 dark:text-teal-400 font-bold text-xs">Paciente Vinculado</span>` : `<span class="text-slate-400 text-xs italic">Fluxo Administrativo</span>`}
                  </td>
                  <td class="px-6 py-4 text-right font-extrabold ${t.tipo==='receita'?'text-emerald-600 dark:text-emerald-400':'text-rose-500 dark:text-rose-400'}">
                    ${t.tipo==='receita'?'+':'-'} R$ ${currency(t.valor)}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-[9px] px-2.5 py-1 rounded-full font-bold uppercase ${getStatusStyle(t.status)}">${t.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

window.setFinanceTab = function(t) { financeTab = t; renderFinanceiro(); if(window.lucide) window.lucide.createIcons(); };

window.simulateFinanceModal = function() {
  openModal(`
    <div class="bg-teal-700 px-6 py-4 flex justify-between items-center">
      <h3 class="text-white font-bold text-lg">Novo Lançamento Financeiro</h3>
      <button onclick="closeModal()" class="text-white/80 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <div class="grid grid-cols-2 gap-4">
         <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Tipo</label>
            <select class="w-full h-10 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-lg px-3 text-sm dark:text-white">
              <option>Receita</option>
              <option>Despesa</option>
            </select>
         </div>
         <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Valor</label>
            <input type="text" placeholder="R$ 0,00" class="w-full h-10 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-lg px-3 text-sm dark:text-white">
         </div>
      </div>
      <div>
         <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Descrição</label>
         <input type="text" placeholder="Ex: Pagamento Consulta" class="w-full h-10 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-lg px-3 text-sm dark:text-white">
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-slate-700">
        <button onclick="closeModal()" class="px-4 py-2 rounded-lg font-medium text-gray-500 hover:bg-gray-50 transition-colors">Cancelar</button>
        <button onclick="closeModal()" class="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold shadow-md hover:bg-teal-700 transition-all">Salvar Lançamento</button>
      </div>
    </div>
  `);
};

// DASHBOARD (FINAL)
function renderDashboard() {
  document.getElementById('content-container').innerHTML = `
    <div class="space-y-6 animate-in fade-in duration-300">
      <div class="bg-gradient-to-r from-teal-600 to-teal-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div class="relative z-10">
          <h2 class="text-2xl sm:text-3xl font-extrabold mb-2">Bom dia, Dr. Edimilson</h2>
          <p class="text-teal-100 text-sm max-w-md">Você tem <span class="font-bold text-white">3 consultas</span> agendadas para hoje e o saldo da clínica está <span class="font-bold text-white">12% acima</span> da meta mensal.</p>
        </div>
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${[
          { label: 'Pacientes Ativos', val: '142', icon: 'users', color: 'teal' },
          { label: 'Consultas Hoje', val: '3', icon: 'calendar', color: 'orange' },
          { label: 'Faturamento Mês', val: 'R$ 12.450', icon: 'trending-up', color: 'emerald' },
          { label: 'Contas a Pagar', val: 'R$ 2.800', icon: 'alert-circle', color: 'rose' }
        ].map(card => `
          <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-900/20 flex items-center justify-center text-${card.color}-600 dark:text-${card.color}-400">
              <i data-lucide="${card.icon}" class="w-6 h-6"></i>
            </div>
            <div>
              <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">${card.label}</p>
              <p class="text-xl font-extrabold dark:text-white">${card.val}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2 rounded-3xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold dark:text-white">Produtividade da Semana</h3>
            <select class="text-xs bg-gray-50 dark:bg-slate-900 border-none rounded-lg font-bold text-teal-600 p-2">
              <option>Abril 2026</option>
            </select>
          </div>
          <div class="h-64 flex items-end justify-between gap-2 px-2">
            ${[40, 70, 45, 90, 65, 30, 20].map((h, i) => `
              <div class="flex-1 flex flex-col items-center gap-2 group">
                <div class="w-full bg-teal-100 dark:bg-teal-900/20 rounded-t-lg relative transition-all group-hover:bg-teal-500" style="height: ${h}%">
                   <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">${h}%</span>
                </div>
                <span class="text-[10px] font-bold text-slate-400 uppercase">${['S','T','Q','Q','S','S','D'][i]}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="rounded-3xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm flex flex-col">
          <div class="p-5 border-b dark:border-slate-700">
            <h3 class="font-bold dark:text-white">Status Financeiro</h3>
          </div>
          <div class="p-5 flex-1 flex flex-col justify-center space-y-6">
            <div class="relative w-32 h-32 mx-auto">
               <svg class="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="50" stroke="currentColor" stroke-width="12" fill="transparent" class="text-gray-100 dark:text-slate-700" />
                 <circle cx="64" cy="64" r="50" stroke="currentColor" stroke-width="12" fill="transparent" stroke-dasharray="314" stroke-dashoffset="100" class="text-teal-500" />
               </svg>
               <div class="absolute inset-0 flex flex-col items-center justify-center">
                 <span class="text-2xl font-black dark:text-white">68%</span>
                 <span class="text-[8px] font-bold uppercase text-slate-400">Meta</span>
               </div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <p class="text-xs font-bold text-slate-400">Meta</p>
                <p class="text-sm font-black dark:text-white">R$ 20.000</p>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-400">Atual</p>
                <p class="text-sm font-black text-teal-600">R$ 13.600</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// RELATÓRIOS (PLACEHOLDER FIEL)
function renderRelatorios() {
  document.getElementById('content-container').innerHTML = `
    <div class="space-y-6 animate-in fade-in duration-300">
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
         <div class="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
            <i data-lucide="bar-chart-3" class="w-8 h-8"></i>
         </div>
         <h3 class="text-xl font-bold dark:text-white mb-2">Relatórios Gerenciais</h3>
         <p class="text-slate-500 max-w-sm mx-auto text-sm">Esta funcionalidade requer processamento de dados dinâmicos e está disponível apenas na versão completa do sistema.</p>
         <button class="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl font-bold shadow-md hover:bg-teal-700 transition-all active:scale-95">Solicitar Relatório Completo</button>
      </div>
    </div>
  `;
}

// PRONTUÁRIO (ESTILO CARDS)
function renderProntuario() {
  document.getElementById('content-container').innerHTML = `
    <div class="space-y-4 animate-in fade-in duration-300">
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
         <h2 class="text-xl font-extrabold text-slate-800 dark:text-white">Histórico de Atendimentos</h2>
         <button class="text-teal-600 font-bold text-xs hover:underline flex items-center gap-1">
            <i data-lucide="filter" class="w-3.5 h-3.5"></i> Filtrar por Paciente
         </button>
      </div>
      <div class="grid gap-4">
        ${[
          { pac: "Ana Paula Ferreira", data: "15/04/2026", proc: "Clareamento Dental", obs: "Paciente relatou sensibilidade leve. Aplicado dessensibilizante em consultório.", prof: "Dr. Edimilson Matos" },
          { pac: "Carlos Eduardo Souza", data: "10/04/2026", proc: "Implante Dentário", obs: "Suturas removidas. Cicatrização excelente. Próxima etapa em 90 dias.", prof: "Dr. Edimilson Matos" }
        ].map(p => `
          <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-teal-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex items-start justify-between mb-3 border-b border-gray-50 dark:border-slate-700 pb-3">
              <div>
                <p class="font-extrabold text-slate-800 dark:text-white text-base">${p.pac}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${p.data} • ${p.proc}</p>
              </div>
              <span class="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter">${p.prof}</span>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${p.obs}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// CONFIGURAÇÕES
function renderConfiguracoes() {
  document.getElementById('content-container').innerHTML = `
    <div class="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
        <h3 class="font-black text-xl text-slate-800 dark:text-white mb-6 flex items-center gap-2">
          <i data-lucide="settings" class="w-6 h-6 text-teal-600"></i> Ajustes do Sistema
        </h3>
        <div class="space-y-6">
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl">
             <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600"><i data-lucide="bell" class="w-5 h-5"></i></div>
                <div>
                   <p class="text-sm font-bold dark:text-white">Notificações Push</p>
                   <p class="text-[10px] text-slate-400">Receba alertas de novos agendamentos</p>
                </div>
             </div>
             <div class="w-10 h-5 bg-teal-500 rounded-full relative"><div class="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div></div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl">
             <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600"><i data-lucide="shield" class="w-5 h-5"></i></div>
                <div>
                   <p class="text-sm font-bold dark:text-white">Segurança em Duas Etapas</p>
                   <p class="text-[10px] text-slate-400">Proteja seus dados clínicos</p>
                </div>
             </div>
             <div class="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full relative"><div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// INIT
navigateTo('agenda');
