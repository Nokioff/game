"use strict";

const STORAGE_KEY = "fixlab-simulator-v2";
const LEGACY_STORAGE_KEY = "fixlab-simulator-v1";
const INITIAL_BALANCE = 20000;

const catalog = [
  {
    id: "FL-001", brand: "Apple", name: "iPhone 11", issue: "Разбит экран", shortIssue: "Треснул дисплей",
    image: "assets/phones/iphone-11.svg", condition: "Экран разбит", color: "Чёрный", storage: "128 ГБ", battery: "82%",
    buyPrice: 5400, resalePrice: 10400, part: { id: "display", name: "Дисплейный модуль", cost: 1900, icon: "▣" },
    issueText: "На матрице трещины, сенсор срабатывает не везде. Нужна замена дисплейного модуля.", grade: "C+", difficulty: 3, difficultyLabel: "Сложный", tag: "ВЫГОДНЫЙ ЛОТ"
  },
  {
    id: "FL-002", brand: "Apple", name: "iPhone 12", issue: "Быстро разряжается", shortIssue: "Изношен аккумулятор",
    image: "assets/phones/iphone-12.svg", condition: "Слабая батарея", color: "Синий", storage: "128 ГБ", battery: "71%",
    buyPrice: 9200, resalePrice: 13800, part: { id: "battery", name: "Аккумулятор", cost: 1250, icon: "▰" },
    issueText: "Ёмкость аккумулятора упала до 71%. Телефон работает, но быстро выключается под нагрузкой.", grade: "B-", difficulty: 1, difficultyLabel: "Лёгкий", tag: "БЫСТРЫЙ РЕМОНТ"
  },
  {
    id: "FL-003", brand: "Apple", name: "iPhone 13", issue: "Не работает Face ID", shortIssue: "Неисправен шлейф датчиков",
    image: "assets/phones/iphone-13.svg", condition: "Ошибка Face ID", color: "Розовый", storage: "256 ГБ", battery: "86%",
    buyPrice: 10500, resalePrice: 15500, part: { id: "sensor", name: "Шлейф датчиков", cost: 2500, icon: "⌁" },
    issueText: "Система распознавания лица не запускается. Диагностика указывает на повреждение шлейфа датчиков.", grade: "B", difficulty: 4, difficultyLabel: "Экспертный", tag: "ПРЕМИУМ"
  },
  {
    id: "FL-004", brand: "Samsung", name: "Galaxy S21", issue: "Не заряжается", shortIssue: "Повреждён разъём USB-C",
    image: "assets/phones/galaxy-s21.svg", condition: "Проблема зарядки", color: "Графит", storage: "128 ГБ", battery: "89%",
    buyPrice: 5500, resalePrice: 9000, part: { id: "port", name: "Разъём USB-C", cost: 900, icon: "⌗" },
    issueText: "Кабель фиксируется нестабильно, зарядка прерывается. Требуется замена нижней платы с разъёмом USB-C.", grade: "C", difficulty: 2, difficultyLabel: "Средний", tag: "ВЫГОДНЫЙ ЛОТ"
  },
  {
    id: "FL-005", brand: "Xiaomi", name: "Redmi Note 12", issue: "Пятно на экране", shortIssue: "Повреждён дисплей",
    image: "assets/phones/redmi-note-12.svg", condition: "Дефект дисплея", color: "Ледяной синий", storage: "128 ГБ", battery: "92%",
    buyPrice: 3600, resalePrice: 6500, part: { id: "display", name: "Дисплейный модуль", cost: 1400, icon: "▣" },
    issueText: "На экране появилось светлое пятно. Остальные функции работают исправно — меняем дисплейный модуль.", grade: "B-", difficulty: 2, difficultyLabel: "Средний", tag: "БЮДЖЕТНЫЙ"
  },
  {
    id: "FL-006", brand: "Google", name: "Pixel 7", issue: "Не работает камера", shortIssue: "Неисправен модуль камеры",
    image: "assets/phones/pixel-7.svg", condition: "Ошибка камеры", color: "Obsidian", storage: "128 ГБ", battery: "84%",
    buyPrice: 7800, resalePrice: 11500, part: { id: "camera", name: "Модуль камеры", cost: 2000, icon: "◉" },
    issueText: "Основная камера не фокусируется и выдаёт ошибку. Нужна замена блока основной камеры.", grade: "B", difficulty: 3, difficultyLabel: "Сложный", tag: "РЕДКАЯ МОДЕЛЬ"
  },
  {
    id: "FL-007", brand: "Apple", name: "iPhone XR", issue: "Не держит заряд", shortIssue: "Изношен аккумулятор",
    image: "assets/phones/iphone-xr.svg", condition: "Слабая батарея", color: "Коралловый", storage: "64 ГБ", battery: "68%",
    buyPrice: 2600, resalePrice: 5000, part: { id: "battery", name: "Аккумулятор", cost: 850, icon: "▰" },
    issueText: "Аккумулятор сильно изношен, смартфон выключается на холоде. Поможет установка новой батареи.", grade: "C", difficulty: 1, difficultyLabel: "Лёгкий", tag: "БЫСТРЫЙ РЕМОНТ"
  },
  {
    id: "FL-008", brand: "Samsung", name: "Galaxy A54", issue: "Треснула задняя крышка", shortIssue: "Повреждено заднее стекло",
    image: "assets/phones/galaxy-a54.svg", condition: "Трещины корпуса", color: "Лаймовый", storage: "256 ГБ", battery: "91%",
    buyPrice: 4500, resalePrice: 7500, part: { id: "backglass", name: "Задняя крышка", cost: 1300, icon: "▤" },
    issueText: "Задняя панель разбита, но рама и внутренние компоненты целы. Требуется замена крышки.", grade: "B", difficulty: 2, difficultyLabel: "Средний", tag: "ВЫГОДНЫЙ ЛОТ"
  }
];

const spareParts = [
  { id: "display", name: "Дисплейный модуль", cost: 1900, icon: "▣", hint: "Экран и сенсор" },
  { id: "battery", name: "Аккумулятор", cost: 1250, icon: "▰", hint: "Батарея питания" },
  { id: "sensor", name: "Шлейф датчиков", cost: 2500, icon: "⌁", hint: "Face ID / датчики" },
  { id: "port", name: "Разъём USB-C", cost: 900, icon: "⌗", hint: "Плата зарядки" },
  { id: "camera", name: "Модуль камеры", cost: 2000, icon: "◉", hint: "Основная камера" },
  { id: "backglass", name: "Задняя крышка", cost: 1300, icon: "▤", hint: "Стекло корпуса" }
];

const levelNames = ["Новичок", "Подмастерье", "Техник", "Мастер", "Эксперт", "Легенда"];

function createDefaultState() {
  return {
    balance: INITIAL_BALANCE,
    xp: 0,
    repairs: 0,
    totalProfit: 0,
    favorites: [],
    activeJob: null,
    reputation: 0
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : null;
    if (!saved || typeof saved !== "object") return createDefaultState();
    const base = createDefaultState();
    return {
      ...base,
      ...saved,
      balance: Number.isFinite(saved.balance) ? Math.max(0, saved.balance) : base.balance,
      xp: Number.isFinite(saved.xp) ? Math.max(0, saved.xp) : 0,
      repairs: Number.isFinite(saved.repairs) ? Math.max(0, saved.repairs) : 0,
      totalProfit: Number.isFinite(saved.totalProfit) ? saved.totalProfit : 0,
      reputation: Number.isFinite(saved.reputation) ? Math.max(0, Math.min(100, saved.reputation)) : 0,
      favorites: Array.isArray(saved.favorites) ? saved.favorites.filter(id => catalog.some(item => item.id === id)) : [],
      activeJob: saved.activeJob && catalog.some(item => item.id === saved.activeJob.id) && ["diagnosis", "parts", "install", "ready"].includes(saved.activeJob.stage) ? { id: saved.activeJob.id, stage: saved.activeJob.stage, selectedPartId: saved.activeJob.selectedPartId || null } : null
    };
  } catch (error) {
    console.warn("Не удалось загрузить сохранение FixLab:", error);
    return createDefaultState();
  }
}

let state = loadState();
let selectedBrand = "all";
let favoritesMode = false;
let currentModalId = null;
let toastTimeout = null;

const $ = (selector) => document.querySelector(selector);
const money = (value) => `${Math.round(value).toLocaleString("ru-RU")} ₽`;

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Не удалось сохранить прогресс:", error);
    showToast("Браузер не разрешил сохранить прогресс.");
  }
}

function getLevel() {
  const maxXp = levelNames.length * 250;
  if (state.xp >= maxXp) {
    return { level: levelNames.length, name: levelNames[levelNames.length - 1], inLevel: 250, percent: 100 };
  }
  const level = Math.floor(state.xp / 250) + 1;
  const inLevel = state.xp % 250;
  return { level, name: levelNames[level - 1], inLevel, percent: (inLevel / 250) * 100 };
}

function updateStats() {
  const level = getLevel();
  $("#balanceValue").textContent = money(state.balance);
  $("#levelLabel").textContent = `${String(level.level).padStart(2, "0")} · ${level.name}`;
  $("#xpValue").textContent = `${level.inLevel} / 250 XP`;
  $("#xpFill").style.width = `${level.percent}%`;
  $("#repairsValue").textContent = `${state.repairs} ${plural(state.repairs, "ремонт", "ремонта", "ремонтов")}`;
  $("#profitValue").textContent = money(state.totalProfit);
  $("#completedValue").textContent = String(state.repairs);
  $("#reputationValue").textContent = `${state.reputation} / 100`;
  $("#favoritesCount").textContent = String(state.favorites.length);
}

function plural(value, one, few, many) {
  const n = Math.abs(value) % 100;
  const last = n % 10;
  if (n > 10 && n < 20) return many;
  if (last > 1 && last < 5) return few;
  if (last === 1) return one;
  return many;
}

// Плата мастеру зависит от стоимости запчасти и сложности ремонта.
// Чем дороже и сложнее работа, тем больше игровая награда.
function getRepairReward(item) {
  const difficulty = Number(item.difficulty) || 1;
  const rawReward = item.part.cost * 0.9 + difficulty * 250;
  return Math.round(rawReward / 50) * 50;
}

function getXpReward(item) {
  return 40 + (Number(item.difficulty) || 1) * 25;
}

function getProfit(item) {
  return item.resalePrice + getRepairReward(item) - item.buyPrice - item.part.cost;
}

function renderCatalog() {
  const query = $("#searchInput").value.trim().toLocaleLowerCase("ru");
  let items = catalog.filter(item => {
    const matchesBrand = selectedBrand === "all" || item.brand === selectedBrand;
    const matchesFavorite = !favoritesMode || state.favorites.includes(item.id);
    const searchable = `${item.brand} ${item.name} ${item.issue} ${item.shortIssue}`.toLocaleLowerCase("ru");
    return matchesBrand && matchesFavorite && (!query || searchable.includes(query));
  });

  $("#lotCount").textContent = String(items.length).padStart(2, "0");
  const grid = $("#catalogGrid");
  if (!items.length) {
    grid.innerHTML = `<div class="no-results"><strong>Ничего не найдено</strong>Измени поисковый запрос или выбери другую категорию.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => {
    const isFavorite = state.favorites.includes(item.id);
    const isOccupied = Boolean(state.activeJob);
    return `
      <article class="product-card" data-card-id="${item.id}">
        <div class="product-visual">
          <span class="product-tag">${item.tag}</span>
          <button class="fav-button ${isFavorite ? "active" : ""}" type="button" data-action="favorite" data-id="${item.id}" aria-label="${isFavorite ? "Убрать из избранного" : "Добавить в избранное"}" aria-pressed="${isFavorite}">${isFavorite ? "♥" : "♡"}</button>
          <img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy" width="320" height="220">
        </div>
        <div class="product-info">
          <div class="product-brand">${item.brand} · ${item.grade}</div>
          <h3 class="product-name">${escapeHTML(item.name)}</h3>
          <div class="product-issue">${escapeHTML(item.shortIssue)}</div>
          <div class="product-repair-cost">Ремонт: ${money(item.part.cost)} · ${item.difficultyLabel.toLowerCase()}</div>
          <div class="product-meta"><strong class="product-price">${money(item.buyPrice)}</strong><span class="product-profit">Награда +${money(getRepairReward(item))}</span></div>
          <div class="product-net">Чистая прибыль: <strong>+${money(getProfit(item))}</strong></div>
          <div class="card-actions">
            <button class="primary-button card-buy ${isOccupied ? "occupied" : ""}" type="button" data-action="buy" data-id="${item.id}" ${isOccupied ? "disabled" : ""}>${isOccupied ? "Верстак занят" : "Купить"}</button>
            <button class="card-details" type="button" data-action="details" data-id="${item.id}" aria-label="Подробнее о ${escapeHTML(item.name)}">↗</button>
          </div>
        </div>
      </article>`;
  }).join("");
}

function renderJob() {
  const job = state.activeJob;
  const empty = !job;
  $("#emptyPhoneState").classList.toggle("hidden", !empty);
  $("#jobDevice").classList.toggle("hidden", empty);
  $("#jobTitle").textContent = empty ? "Ожидаем устройство" : (catalog.find(entry => entry.id === job.id)?.name || "Ремонт телефона");
  $("#jobStep").textContent = empty ? "НЕТ ЗАКАЗА" : stepLabel(job.stage);

  if (empty) {
    $("#jobContent").innerHTML = `<div class="job-empty-note"><span class="note-icon">✳</span><span>Здесь появятся диагностика, выбор запчасти и этап продажи после покупки телефона.</span></div>`;
    $("#jobPhoneImage").src = "assets/phones/iphone-11.svg";
    $("#deviceIssueTag").textContent = "ОЖИДАЕТ УСТРОЙСТВО";
    $("#tipText").textContent = "Сначала проведи диагностику — она подскажет, какую деталь нужно заменить.";
    renderCatalog();
    return;
  }

  const item = catalog.find(entry => entry.id === job.id);
  $("#jobPhoneImage").src = item.image;
  $("#jobPhoneImage").alt = `${item.name} на ремонте`;
  $("#deviceIssueTag").textContent = job.stage === "ready" ? "РЕМОНТ ЗАВЕРШЁН" : item.issue.toLocaleUpperCase("ru");
  const summary = `
    <div class="job-summary">
      <div class="job-summary-main"><strong>${escapeHTML(item.name)} · ${item.condition}</strong><small>Покупка: ${money(item.buyPrice)} · Сложность: ${item.difficultyLabel}</small></div>
      <div class="job-price"><small>ЦЕНА ПРОДАЖИ</small><strong>${money(item.resalePrice)}</strong></div>
    </div>`;

  if (job.stage === "diagnosis") {
    $("#jobContent").innerHTML = `${summary}
      <p class="job-copy">Устройство куплено. Проведи диагностику, чтобы определить неисправность и подобрать нужную запчасть.</p>
      <button class="primary-button" type="button" data-job-action="diagnose">Провести диагностику <span>→</span></button>`;
    $("#tipText").textContent = "Диагностика бесплатная. Она откроет список деталей, подходящих для этого ремонта.";
  } else if (job.stage === "parts") {
    const options = getPartOptions(item);
    const selected = job.selectedPartId || "";
    $("#jobContent").innerHTML = `${summary}
      <p class="job-copy">Диагностика: <strong>${escapeHTML(item.issue)}</strong>. ${escapeHTML(item.issueText)} Выбери подходящую деталь.</p>
      <div class="part-options">${options.map(part => `
        <button class="part-option ${selected === part.id ? "selected" : ""}" type="button" data-part-id="${part.id}">
          <span class="part-symbol">${part.icon}</span><strong>${escapeHTML(part.name)}</strong><small>${money(part.cost)}</small>
        </button>`).join("")}</div>
      <div class="button-row"><button class="primary-button" type="button" data-job-action="confirm-part" ${selected ? "" : "disabled"}>Подтвердить деталь <span>→</span></button></div>`;
    $("#tipText").textContent = "Не торопись: выбери деталь, которая соответствует результату диагностики. Ошибочный выбор не спишет деньги.";
  } else if (job.stage === "install") {
    const part = item.part;
    $("#jobContent").innerHTML = `${summary}
      <div class="job-success"><span class="success-mark">✓</span><span>Деталь выбрана верно: <strong>${escapeHTML(part.name)}</strong>. Осталось установить её.</span></div>
      <div class="job-summary"><div class="job-summary-main"><strong>${escapeHTML(part.name)}</strong><small>Запчасть: ${money(part.cost)} · Награда мастеру: ${money(getRepairReward(item))}</small></div><div class="job-price"><small>СЛОЖНОСТЬ: ${item.difficultyLabel.toUpperCase()}</small><strong>${money(part.cost)}</strong></div></div>
      <button class="primary-button" type="button" data-job-action="install">Установить деталь <span>→</span></button>`;
    $("#tipText").textContent = "Стоимость запчасти спишется с баланса только после установки. После этого телефон будет готов к продаже.";
  } else if (job.stage === "ready") {
    const profit = getProfit(item);
    $("#jobContent").innerHTML = `${summary}
      <div class="job-success"><span class="success-mark">✓</span><span>Ремонт завершён! Телефон проверен и готов отправиться новому владельцу.</span></div>
      <div class="job-summary"><div class="job-summary-main"><strong>Награда за ремонт: +${money(getRepairReward(item))}</strong><small>Продажа ${money(item.resalePrice)} + оплата работы − вложения</small></div><div class="job-price"><small>ЧИСТАЯ ПРИБЫЛЬ</small><strong>+${money(profit)}</strong></div></div>
      <button class="primary-button" type="button" data-job-action="sell">Продать и получить ${money(item.resalePrice + getRepairReward(item))} <span>↗</span></button>`;
    $("#tipText").textContent = "Награда зависит от цены запчасти и сложности ремонта. За сложную работу начисляется больше денег и опыта.";
  }
  renderCatalog();
}

function stepLabel(stage) {
  return ({ diagnosis: "ДИАГНОСТИКА", parts: "ВЫБОР ДЕТАЛИ", install: "УСТАНОВКА", ready: "ГОТОВ К ПРОДАЖЕ" })[stage] || "В РАБОТЕ";
}

function getPartOptions(item) {
  const correct = item.part;
  const distractors = spareParts.filter(part => part.id !== correct.id);
  const start = catalog.findIndex(entry => entry.id === item.id);
  const first = distractors[start % distractors.length];
  const second = distractors[(start + 2) % distractors.length];
  return [correct, first, second];
}

function buyPhone(id) {
  const item = catalog.find(entry => entry.id === id);
  if (!item) return;
  if (state.activeJob) {
    showToast("Сначала заверши текущий ремонт — верстак занят.");
    return;
  }
  if (state.balance < item.buyPrice) {
    showToast(`Не хватает ${money(item.buyPrice - state.balance)} для покупки.`);
    return;
  }
  state.balance -= item.buyPrice;
  state.activeJob = { id: item.id, stage: "diagnosis", selectedPartId: null };
  saveState();
  updateStats();
  renderJob();
  closeModal();
  showToast(`${item.name} куплен. Телефон уже на верстаке!`);
  document.querySelector("#workshop").scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleJobAction(action) {
  const job = state.activeJob;
  if (!job) return;
  const item = catalog.find(entry => entry.id === job.id);

  if (action === "diagnose" && job.stage === "diagnosis") {
    job.stage = "parts";
    job.selectedPartId = null;
    showToast(`Диагностика завершена: ${item.issue.toLocaleLowerCase("ru")}.`);
  } else if (action === "confirm-part" && job.stage === "parts") {
    if (!job.selectedPartId) {
      showToast("Сначала выбери запчасть.");
      return;
    }
    if (job.selectedPartId !== item.part.id) {
      showToast("Эта деталь не подходит. Проверь результат диагностики.");
      return;
    }
    job.stage = "install";
    showToast("Верно! Запчасть совместима с устройством.");
  } else if (action === "install" && job.stage === "install") {
    if (state.balance < item.part.cost) {
      showToast(`Не хватает ${money(item.part.cost - state.balance)} на запчасть.`);
      return;
    }
    state.balance -= item.part.cost;
    job.stage = "ready";
    showToast(`${item.part.name} установлена. Телефон исправен!`);
  } else if (action === "sell" && job.stage === "ready") {
    const repairReward = getRepairReward(item);
    const xpReward = getXpReward(item);
    const profit = getProfit(item);
    state.balance += item.resalePrice + repairReward;
    state.totalProfit += profit;
    state.repairs += 1;
    state.xp += xpReward;
    state.reputation = Math.min(100, state.reputation + 4 + Math.min(3, item.difficulty));
    state.activeJob = null;
    saveState();
    updateStats();
    renderJob();
    showToast(`Продано за ${money(item.resalePrice)}. Награда: +${money(repairReward)} · Прибыль: +${money(profit)} · +${xpReward} XP`);
    return;
  }
  saveState();
  updateStats();
  renderJob();
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(favoriteId => favoriteId !== id);
    showToast("Убрано из избранного.");
  } else {
    state.favorites.push(id);
    showToast("Добавлено в избранное.");
  }
  saveState();
  updateStats();
  renderCatalog();
}

function openDetails(id) {
  const item = catalog.find(entry => entry.id === id);
  if (!item) return;
  currentModalId = id;
  $("#modalImage").src = item.image;
  $("#modalImage").alt = item.name;
  $("#modalLotId").textContent = `#${item.id}`;
  $("#modalCondition").textContent = item.condition;
  $("#modalTitle").textContent = item.name;
  $("#modalIssue").textContent = item.issue;
  $("#modalBuyPrice").textContent = money(item.buyPrice);
  $("#modalPartCost").textContent = money(item.part.cost);
  $("#modalResale").textContent = money(item.resalePrice);
  $("#modalRepairReward").textContent = `+${money(getRepairReward(item))}`;
  $("#modalProfit").textContent = `+${money(getProfit(item))}`;
  $("#modalSpecs").innerHTML = [
    ["ПАМЯТЬ", item.storage], ["АККУМУЛЯТОР", item.battery], ["ЦВЕТ", item.color], ["СЛОЖНОСТЬ", item.difficultyLabel]
  ].map(([label, value]) => `<div class="modal-spec"><small>${label}</small><strong>${escapeHTML(value)}</strong></div>`).join("");
  $("#modalBuy").disabled = Boolean(state.activeJob) || state.balance < item.buyPrice;
  $("#modalBuy").textContent = state.activeJob ? "Сначала заверши ремонт" : state.balance < item.buyPrice ? "Недостаточно средств" : `Купить за ${money(item.buyPrice)} →`;
  $("#detailModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  $("#closeModal").focus();
}

function closeModal() {
  $("#detailModal").classList.add("hidden");
  document.body.style.overflow = "";
  currentModalId = null;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function resetGame() {
  const confirmed = window.confirm("Начать игру заново? Баланс, опыт, избранное и текущий ремонт будут сброшены.");
  if (!confirmed) return;
  state = createDefaultState();
  saveState();
  updateStats();
  renderJob();
  favoritesMode = false;
  $("#favoritesOnly").classList.remove("active");
  $("#favoritesOnly").setAttribute("aria-pressed", "false");
  $("#searchInput").value = "";
  selectedBrand = "all";
  document.querySelectorAll(".filter-chip").forEach(button => button.classList.toggle("active", button.dataset.brand === "all"));
  renderCatalog();
  showToast("Новая игра началась. На счету 20 000 ₽!");
}

function bindEvents() {
  $("#catalogGrid").addEventListener("click", event => {
    const actionButton = event.target.closest("[data-action]");
    const card = event.target.closest("[data-card-id]");
    if (actionButton) {
      event.stopPropagation();
      const { action, id } = actionButton.dataset;
      if (action === "favorite") toggleFavorite(id);
      if (action === "buy") buyPhone(id);
      if (action === "details") openDetails(id);
      return;
    }
    if (card) openDetails(card.dataset.cardId);
  });

  $("#jobContent").addEventListener("click", event => {
    const partButton = event.target.closest("[data-part-id]");
    if (partButton && state.activeJob?.stage === "parts") {
      state.activeJob.selectedPartId = partButton.dataset.partId;
      saveState();
      renderJob();
      return;
    }
    const actionButton = event.target.closest("[data-job-action]");
    if (actionButton) handleJobAction(actionButton.dataset.jobAction);
  });

  $("#brandFilters").addEventListener("click", event => {
    const button = event.target.closest("[data-brand]");
    if (!button) return;
    selectedBrand = button.dataset.brand;
    document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    renderCatalog();
  });

  $("#searchInput").addEventListener("input", renderCatalog);
  $("#favoritesOnly").addEventListener("click", () => {
    favoritesMode = !favoritesMode;
    $("#favoritesOnly").classList.toggle("active", favoritesMode);
    $("#favoritesOnly").setAttribute("aria-pressed", String(favoritesMode));
    renderCatalog();
  });

  $("#closeModal").addEventListener("click", closeModal);
  $("#detailModal").addEventListener("click", event => {
    if (event.target === $("#detailModal")) closeModal();
  });
  $("#modalBuy").addEventListener("click", () => {
    if (currentModalId) buyPhone(currentModalId);
  });
  $("#resetGame").addEventListener("click", resetGame);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      $("#searchInput").focus();
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

function init() {
  bindEvents();
  updateStats();
  renderCatalog();
  renderJob();
}

init();
