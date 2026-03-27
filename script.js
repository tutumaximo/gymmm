/**
 * GYM PRIVATE TRACKER — script.js
 * ─────────────────────────────────────────────────────────────
 * SPA puro sem frameworks. Navegação via estado, persistência
 * via LocalStorage. Escalável: adicione categorias/exercícios
 * apenas no objeto WORKOUTS abaixo.
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ============================================================
   1. DADOS — edite aqui para personalizar seus treinos
   ============================================================ */

/**
 * @typedef {Object} Exercise
 * @property {string} name       - Nome do exercício
 * @property {string} sets       - Ex: "4x10" ou "3x12-15"
 * @property {string} [notes]    - Dica de carga, execução etc.
 */

/**
 * @typedef {Object} WorkoutCategory
 * @property {string}     id      - Identificador único (snake_case)
 * @property {string}     name    - Nome exibido
 * @property {string}     emoji   - Ícone representativo
 * @property {Exercise[]} exercises
 */

/** @type {WorkoutCategory[]} */
const WORKOUTS = [
  {
    id: 'peito',
    name: 'Peito',
    emoji: '💪',
    exercises: [
      {
        name: 'Supino Reto com Barra',
        sets: '4 × 8–10',
        notes: 'Carga progressiva. Desça controlado, 2 seg na descida.'
      },
      {
        name: 'Supino Inclinado com Halteres',
        sets: '3 × 10–12',
        notes: 'Ângulo ~30°. Foco na parte superior do peitoral.'
      },
      {
        name: 'Crucifixo na Polia (cabo)',
        sets: '3 × 12–15',
        notes: 'Amplitude total. Pico de contração no centro.'
      },
      {
        name: 'Flexão de Braços',
        sets: '3 × falha',
        notes: 'Finalizador. Controle o tempo de execução.'
      },
      {
        name: 'Peck Deck (voador)',
        sets: '3 × 15',
        notes: 'Carga moderada. Squeeze no fechamento.'
      },
    ],
  },
  {
    id: 'leg_day',
    name: 'Leg Day',
    emoji: '🦵',
    exercises: [
      {
        name: 'Agachamento Livre',
        sets: '5 × 5',
        notes: 'Barra nas costas. Desça abaixo do paralelo. Rei dos exercícios.'
      },
      {
        name: 'Leg Press 45°',
        sets: '4 × 10–12',
        notes: 'Pés na largura dos ombros. Não trave os joelhos no topo.'
      },
      {
        name: 'Cadeira Extensora',
        sets: '3 × 12–15',
        notes: 'Isola o quadríceps. Pausa de 1 seg na extensão total.'
      },
      {
        name: 'Mesa Flexora (cadeira)',
        sets: '3 × 12',
        notes: 'Foco no femoral. Descida lenta (3 seg).'
      },
      {
        name: 'Panturrilha no Smith ou Leg Press',
        sets: '4 × 20',
        notes: 'Amplitude total. Suba na ponta, segure 1 seg, desça devagar.'
      },
      {
        name: 'Stiff com Halteres',
        sets: '3 × 10',
        notes: 'Quadril para trás, costas retas. Sente o estiramento do femoral.'
      },
    ],
  },
  {
    id: 'dorsal',
    name: 'Dorsal',
    emoji: '🔱',
    exercises: [
      {
        name: 'Barra Fixa (pegada aberta)',
        sets: '4 × máximo',
        notes: 'Puxe o cotovelo em direção ao quadril. Escápula ativa.'
      },
      {
        name: 'Remada Curvada com Barra',
        sets: '4 × 8–10',
        notes: 'Tronco ~45°. Puxe para o umbigo. Contrai ao final.'
      },
      {
        name: 'Puxada Frontal na Polia',
        sets: '3 × 12',
        notes: 'Pegada fechada supinada ou neutra. Cotovelos guiam o movimento.'
      },
      {
        name: 'Remada Serrote com Halter',
        sets: '3 × 10 cada',
        notes: 'Apoie o joelho no banco. Puxe alto, cotovelo próximo ao corpo.'
      },
      {
        name: 'Face Pull',
        sets: '3 × 15',
        notes: 'Cabo na altura da testa. Ótimo para saúde do ombro.'
      },
    ],
  },
  {
    id: 'ombros_trap',
    name: 'Ombros & Trapézio',
    emoji: '🏔️',
    exercises: [
      {
        name: 'Desenvolvimento com Halteres',
        sets: '4 × 10',
        notes: 'Amplitude total. Não trave no topo. Cotovelos ligeiramente à frente.'
      },
      {
        name: 'Elevação Lateral',
        sets: '4 × 15',
        notes: 'Carga leve/média. Cotovelo levemente flexionado. Controla a descida.'
      },
      {
        name: 'Elevação Frontal com Anilha',
        sets: '3 × 12',
        notes: 'Alternado ou junto. Sobe até a altura do ombro.'
      },
      {
        name: 'Crucifixo Inverso (peck deck)',
        sets: '3 × 15',
        notes: 'Deltóide posterior. Essencial para postura e equilíbrio.'
      },
      {
        name: 'Encolhimento de Ombros (barra ou halteres)',
        sets: '4 × 12',
        notes: 'Amplitude total. Sobe, pausa 1 seg, desce. Sem rotação.'
      },
    ],
  },
  {
    id: 'biceps_triceps',
    name: 'Bíceps & Tríceps',
    emoji: '🥊',
    exercises: [
      {
        name: 'Rosca Direta com Barra',
        sets: '4 × 10',
        notes: 'Cotovelos fixos no corpo. Não balancie o tronco.'
      },
      {
        name: 'Rosca Martelo com Halteres',
        sets: '3 × 12',
        notes: 'Trabalha braquial e braquiorradial. Pegada neutra.'
      },
      {
        name: 'Tríceps Pulley (corda ou barra reta)',
        sets: '4 × 12',
        notes: 'Cotovelos colados ao corpo. Extensão total no final.'
      },
      {
        name: 'Tríceps Testa (Skull Crusher)',
        sets: '3 × 10',
        notes: 'Barra EZ ou halteres. Cuidado com a descida. Cotovelos fixos.'
      },
      {
        name: 'Rosca Concentrada',
        sets: '3 × 12 cada',
        notes: 'Isolamento máximo. Squeeze no topo.'
      },
      {
        name: 'Mergulho no Banco (tríceps)',
        sets: '3 × falha',
        notes: 'Finalizador. Corpo ereto, cotovelos para trás.'
      },
    ],
  },
];

/* ============================================================
   2. ESTADO — gerenciado centralmente
   ============================================================ */

/** @type {{ view: 'home'|'workout', categoryId: string|null }} */
const STATE = {
  view: 'home',
  categoryId: null,
};

/* ============================================================
   3. STORAGE — chaves e helpers
   ============================================================ */

const STORAGE_KEY_PROGRESS  = 'gpt_progress_v1';
const STORAGE_KEY_LAST      = 'gpt_last_v1';
const STORAGE_KEY_HISTORY   = 'gpt_history_v1';

/**
 * Retorna o objeto de progresso salvo no LocalStorage.
 * Estrutura: { [categoryId]: Set<exerciseIndex> } (serializado como arrays)
 * @returns {Object}
 */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Converte arrays de volta para Sets
    const result = {};
    for (const [k, v] of Object.entries(parsed)) {
      result[k] = new Set(v);
    }
    return result;
  } catch {
    return {};
  }
}

/**
 * Persiste o objeto de progresso.
 * @param {Object} progress
 */
function saveProgress(progress) {
  const serializable = {};
  for (const [k, v] of Object.entries(progress)) {
    serializable[k] = Array.from(v);
  }
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(serializable));
}

/** Retorna o id da última categoria acessada */
function loadLastCategory() {
  return localStorage.getItem(STORAGE_KEY_LAST) || null;
}

/** Salva a última categoria acessada */
function saveLastCategory(id) {
  localStorage.setItem(STORAGE_KEY_LAST, id);
}

/**
 * Carrega histórico de treinos concluídos.
 * @returns {Array<{id: string, name: string, date: string}>}
 */
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_HISTORY)) || [];
  } catch {
    return [];
  }
}

/**
 * Adiciona um treino ao histórico.
 * @param {string} categoryId
 */
function pushHistory(categoryId) {
  const category = WORKOUTS.find(w => w.id === categoryId);
  if (!category) return;
  const history = loadHistory();
  history.unshift({
    id: categoryId,
    name: category.name,
    date: new Date().toISOString(),
  });
  // Mantém apenas os últimos 30
  if (history.length > 30) history.splice(30);
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
}

/* ============================================================
   4. ROTEAMENTO — navegação SPA
   ============================================================ */

/**
 * Navega para a view especificada.
 * @param {'home'|'workout'} view
 * @param {string|null} categoryId
 */
function navigate(view, categoryId = null) {
  STATE.view = view;
  STATE.categoryId = categoryId;

  const viewHome    = document.getElementById('viewHome');
  const viewWorkout = document.getElementById('viewWorkout');
  const btnBack     = document.getElementById('btnBack');
  const btnReset    = document.getElementById('btnReset');
  const headerEyebrow = document.getElementById('headerEyebrow');
  const headerMain    = document.getElementById('headerMain');

  if (view === 'home') {
    viewHome.hidden    = false;
    viewWorkout.hidden = true;
    btnBack.hidden     = true;
    btnReset.hidden    = true;
    headerEyebrow.textContent = 'Personal';
    headerMain.textContent    = 'GYM TRACKER';
    renderHome();
  }

  if (view === 'workout' && categoryId) {
    const category = WORKOUTS.find(w => w.id === categoryId);
    if (!category) return;
    viewHome.hidden    = true;
    viewWorkout.hidden = false;
    btnBack.hidden     = false;
    btnReset.hidden    = false;
    headerEyebrow.textContent = 'Treino';
    headerMain.textContent    = category.name.toUpperCase();
    saveLastCategory(categoryId);
    renderWorkout(category);
  }
}

/* ============================================================
   5. RENDERIZAÇÃO — HOME
   ============================================================ */

function renderHome() {
  const grid          = document.getElementById('categoryGrid');
  const homeDate      = document.getElementById('homeDate');
  const homeStreak    = document.getElementById('homeStreak');
  const progress      = loadProgress();
  const lastId        = loadLastCategory();
  const history       = loadHistory();

  // Data formatada
  homeDate.textContent = formatDate(new Date());

  // Grid de categorias
  grid.innerHTML = '';
  WORKOUTS.forEach((cat, idx) => {
    const done    = progress[cat.id] ? progress[cat.id].size : 0;
    const total   = cat.exercises.length;
    const pct     = total > 0 ? Math.round((done / total) * 100) : 0;
    const isLast  = cat.id === lastId;
    const isLarge = WORKOUTS.length % 2 !== 0 && idx === WORKOUTS.length - 1;

    const card = document.createElement('button');
    card.className = [
      'category-card',
      isLarge ? 'wide' : '',
      isLast  ? 'last-trained' : '',
      done === total && done > 0 ? 'completed' : '',
    ].filter(Boolean).join(' ');

    card.setAttribute('aria-label', `${cat.name}: ${done} de ${total} exercícios`);
    card.innerHTML = `
      <span class="category-emoji" aria-hidden="true">${cat.emoji}</span>
      <div class="category-info">
        <span class="category-name">${cat.name}</span>
        <span class="category-count">${total} exercícios · ${pct}%</span>
        <div class="category-progress-bar">
          <div class="category-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => navigate('workout', cat.id));
    grid.appendChild(card);
  });

  // Bloco de histórico/streak
  renderStreak(homeStreak, history);
}

/**
 * Renderiza o bloco de streak/último treino.
 * @param {HTMLElement} el
 * @param {Array} history
 */
function renderStreak(el, history) {
  if (history.length === 0) {
    el.innerHTML = '<strong>Sem histórico ainda.</strong> Comece seu primeiro treino!';
    return;
  }
  const last = history[0];
  const lastDate = new Date(last.date);
  const diff = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  const diffLabel = diff === 0 ? 'hoje' : diff === 1 ? 'ontem' : `há ${diff} dias`;
  const streakCount = computeStreak(history);
  el.innerHTML = `
    <strong>Último treino:</strong> ${last.name} — <em>${diffLabel}</em><br>
    🔥 Sequência ativa: <strong>${streakCount} dia${streakCount !== 1 ? 's' : ''}</strong>
  `;
}

/**
 * Calcula quantos dias seguidos o usuário treinou (aproximado).
 * @param {Array} history
 * @returns {number}
 */
function computeStreak(history) {
  if (!history.length) return 0;
  const days = new Set(history.map(h => h.date.slice(0, 10)));
  const sorted = Array.from(days).sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  if (sorted[0] !== today && sorted[0] !== yesterday()) return 0;
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = Math.round((prev - curr) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/* ============================================================
   6. RENDERIZAÇÃO — WORKOUT
   ============================================================ */

/**
 * Renderiza a view de treino para uma categoria.
 * @param {WorkoutCategory} category
 */
function renderWorkout(category) {
  const list     = document.getElementById('exerciseList');
  const meta     = document.getElementById('workoutMeta');
  const progress = loadProgress();

  if (!progress[category.id]) progress[category.id] = new Set();
  const done = progress[category.id];

  // Meta header
  meta.innerHTML = `
    <span class="meta-category">${category.emoji} ${category.name}</span>
    <span class="meta-title">${getWorkoutTitle(category.id)}</span>
  `;

  // Atualiza barra de progresso
  updateProgressBar(done.size, category.exercises.length);

  // Renderiza exercícios
  list.innerHTML = '';
  category.exercises.forEach((ex, idx) => {
    const item = createExerciseItem(ex, idx, done.has(idx), (checked) => {
      const prog = loadProgress();
      if (!prog[category.id]) prog[category.id] = new Set();
      if (checked) {
        prog[category.id].add(idx);
      } else {
        prog[category.id].delete(idx);
      }
      saveProgress(prog);
      updateProgressBar(prog[category.id].size, category.exercises.length);
    });
    list.appendChild(item);
  });
}

/**
 * Cria um elemento li para um exercício.
 * @param {Exercise} exercise
 * @param {number} idx
 * @param {boolean} isDone
 * @param {function(boolean): void} onToggle
 * @returns {HTMLLIElement}
 */
function createExerciseItem(exercise, idx, isDone, onToggle) {
  const li = document.createElement('li');
  li.className = `exercise-item${isDone ? ' done' : ''}`;
  li.setAttribute('role', 'button');
  li.setAttribute('tabindex', '0');
  li.setAttribute('aria-label', `${exercise.name}: ${isDone ? 'concluído' : 'pendente'}`);

  li.innerHTML = `
    <div class="exercise-check" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
    <div class="exercise-content">
      <span class="exercise-name">${exercise.name}</span>
      <span class="exercise-sets">${exercise.sets}</span>
      ${exercise.notes ? `<span class="exercise-notes">${exercise.notes}</span>` : ''}
    </div>
  `;

  const toggle = () => {
    const nowDone = !li.classList.contains('done');
    li.classList.toggle('done', nowDone);
    li.setAttribute('aria-label', `${exercise.name}: ${nowDone ? 'concluído' : 'pendente'}`);
    onToggle(nowDone);
  };

  li.addEventListener('click', toggle);
  li.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
  });

  return li;
}

/**
 * Atualiza a barra de progresso e o label.
 * @param {number} done
 * @param {number} total
 */
function updateProgressBar(done, total) {
  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  fill.style.width = `${pct}%`;
  fill.classList.toggle('complete', pct === 100);
  label.textContent = `${done} de ${total} exercícios (${pct}%)`;
}

/* ============================================================
   7. AÇÕES — Reset, Finalizar, Botões
   ============================================================ */

/**
 * Reseta o progresso da categoria atual.
 */
function resetCurrentWorkout() {
  const { categoryId } = STATE;
  if (!categoryId) return;
  const category = WORKOUTS.find(w => w.id === categoryId);
  if (!category) return;

  const progress = loadProgress();
  progress[categoryId] = new Set();
  saveProgress(progress);
  renderWorkout(category);
  showToast('Treino resetado ✓');
}

/**
 * Finaliza o treino, mostra modal.
 */
function finishWorkout() {
  const { categoryId } = STATE;
  if (!categoryId) return;
  const category = WORKOUTS.find(w => w.id === categoryId);
  const progress = loadProgress();
  const done  = progress[categoryId] ? progress[categoryId].size : 0;
  const total = category.exercises.length;

  if (done < total) {
    const remaining = total - done;
    showToast(`Ainda ${remaining} exercício${remaining > 1 ? 's' : ''} pendente${remaining > 1 ? 's' : ''}`);
    return;
  }

  // Treino completo — salvar no histórico
  pushHistory(categoryId);

  // Exibe modal
  const modalBody = document.getElementById('modalBody');
  modalBody.textContent = `Você completou todos os ${total} exercícios de ${category.name}. Bom trabalho!`;
  document.getElementById('modalOverlay').hidden = false;
}

/* ============================================================
   8. UTILITÁRIOS
   ============================================================ */

/**
 * Formata uma data em português.
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const dias   = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const meses  = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return `${dias[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]}`;
}

/**
 * Retorna um título motivacional para cada grupo muscular.
 * @param {string} id
 * @returns {string}
 */
function getWorkoutTitle(id) {
  const titles = {
    peito:         'Dia de Peito',
    leg_day:       'Leg Day',
    dorsal:        'Dia de Costas',
    ombros_trap:   'Ombros & Trap',
    biceps_triceps:'Braços',
  };
  return titles[id] || 'Treino';
}

/** Toast leve de feedback */
let _toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ============================================================
   9. INICIALIZAÇÃO
   ============================================================ */

function init() {
  // Botão voltar
  document.getElementById('btnBack').addEventListener('click', () => navigate('home'));

  // Botão reset
  document.getElementById('btnReset').addEventListener('click', () => {
    if (confirm('Resetar o progresso deste treino?')) resetCurrentWorkout();
  });

  // Botão finalizar
  document.getElementById('btnFinish').addEventListener('click', finishWorkout);

  // Modal — manter editando
  document.getElementById('btnModalKeep').addEventListener('click', () => {
    document.getElementById('modalOverlay').hidden = true;
  });

  // Modal — voltar home
  document.getElementById('btnModalHome').addEventListener('click', () => {
    document.getElementById('modalOverlay').hidden = true;
    navigate('home');
  });

  // Fechar modal ao clicar no overlay
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('modalOverlay').hidden = true;
    }
  });

  // Navega para a home
  navigate('home');
}

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
