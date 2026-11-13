/* Pomodoro Timer · vanilla JS, everything saved in localStorage */
(() => {
  'use strict';

  const KEY = 'pomodoro-timer.v1';
  const $ = (id) => document.getElementById(id);
  const C = 2 * Math.PI * 140; // ring circumference

  /* ---------- texts ---------- */
  const T = {
    he: {
      appName: 'טיימר פומודורו', tagline: 'להתרכז. לנוח. לחזור על זה.', repo: 'הקוד בגיטהאב',
      focus: 'פוקוס', short: 'הפסקה קצרה', long: 'הפסקה ארוכה',
      focusTitle: 'זמן להתרכז', shortTitle: 'נושמים רגע', longTitle: 'הפסקה ארוכה ומגיעה לך',
      start: 'התחלה', pause: 'עצירה', resume: 'המשך', reset: 'איפוס', skip: 'דילוג',
      round: (a, b) => `סבב ${a} מתוך ${b}`,
      shortcuts: 'קיצורים: רווח להתחלה או עצירה · R לאיפוס · S לדילוג',
      tasks: 'משימות', taskPh: 'על מה עובדים היום?', estimate: 'כמה פומודורו', add: 'הוספה',
      noTasks: 'עדיין אין משימות. הוסיפי משימה ראשונה ולחצי עליה כדי לבחור אותה.',
      clearDone: 'ניקוי משימות שהושלמו', working: (t) => `🍅 עובדים על: ${t}`,
      del: 'מחיקה', toggleDone: 'סימון כהושלם',
      stats: 'הסטטיסטיקה שלי', statToday: 'פומודורו היום', statMinutes: 'דקות פוקוס היום',
      statStreak: 'ימים ברצף 🔥', statTotal: 'סך הכל פומודורו', week: '7 הימים האחרונים',
      madeBy: 'נוצר על ידי נויה אדיבי', portfolio: 'תיק עבודות',
      settings: 'הגדרות', theme: 'מצב כהה או בהיר',
      focusMin: 'פוקוס (דקות)', shortMin: 'הפסקה קצרה', longMin: 'הפסקה ארוכה',
      interval: 'הפסקה ארוכה אחרי כמה סבבים', autoBreak: 'להתחיל הפסקות אוטומטית',
      autoFocus: 'להתחיל פוקוס אוטומטית אחרי הפסקה', sound: 'צליל בסיום', notify: 'התראה בדפדפן',
      testSound: '🔔 לשמוע צליל', resetStats: 'איפוס סטטיסטיקה', confirmReset: 'בטוחה? לחצי שוב',
      cancel: 'ביטול', save: 'שמירה', saved: 'ההגדרות נשמרו ✨', statsCleared: 'הסטטיסטיקה אופסה',
      doneFocus: 'כל הכבוד! סיימת פומודורו 🎉', doneBreak: 'ההפסקה נגמרה, חוזרים לעבודה 💪',
      notifyDenied: 'הדפדפן חסם התראות', cleared: 'נוקו משימות שהושלמו', nothingToClear: 'אין משימות שהושלמו',
      welcomeBack: 'הטיימר הסתיים בזמן שלא היית כאן', langLabel: 'EN', langAria: 'Switch to English'
    },
    en: {
      appName: 'Pomodoro Timer', tagline: 'Focus. Rest. Repeat.', repo: 'Code on GitHub',
      focus: 'Focus', short: 'Short break', long: 'Long break',
      focusTitle: 'Time to focus', shortTitle: 'Take a breath', longTitle: 'You earned a long break',
      start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset', skip: 'Skip',
      round: (a, b) => `Round ${a} of ${b}`,
      shortcuts: 'Shortcuts: Space to start or pause · R to reset · S to skip',
      tasks: 'Tasks', taskPh: 'What are you working on?', estimate: 'Pomodoros', add: 'Add',
      noTasks: 'No tasks yet. Add your first one and click it to select it.',
      clearDone: 'Clear finished tasks', working: (t) => `🍅 Working on: ${t}`,
      del: 'Delete', toggleDone: 'Mark as done',
      stats: 'My stats', statToday: 'Pomodoros today', statMinutes: 'Focus minutes today',
      statStreak: 'Day streak 🔥', statTotal: 'Total pomodoros', week: 'Last 7 days',
      madeBy: 'Built by Noya Adivi', portfolio: 'Portfolio',
      settings: 'Settings', theme: 'Dark or light mode',
      focusMin: 'Focus (minutes)', shortMin: 'Short break', longMin: 'Long break',
      interval: 'Long break after how many rounds', autoBreak: 'Start breaks automatically',
      autoFocus: 'Start focus automatically after a break', sound: 'Sound when done', notify: 'Browser notification',
      testSound: '🔔 Test sound', resetStats: 'Reset stats', confirmReset: 'Sure? Click again',
      cancel: 'Cancel', save: 'Save', saved: 'Settings saved ✨', statsCleared: 'Stats were reset',
      doneFocus: 'Great job! Pomodoro complete 🎉', doneBreak: 'Break is over, back to work 💪',
      notifyDenied: 'Notifications are blocked', cleared: 'Finished tasks cleared', nothingToClear: 'No finished tasks',
      welcomeBack: 'The timer finished while you were away', langLabel: 'עב', langAria: 'לעברית'
    }
  };

  /* ---------- state ---------- */
  const defaults = {
    lang: 'he', theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    settings: { focus: 25, short: 5, long: 15, interval: 4, autoBreak: false, autoFocus: false, sound: true, notify: false },
    timer: { mode: 'focus', running: false, endAt: null, remaining: 25 * 60, round: 1 },
    tasks: [], activeTask: null, days: {}, total: 0
  };
  let S = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved) return { ...defaults, ...saved, settings: { ...defaults.settings, ...saved.settings }, timer: { ...defaults.timer, ...saved.timer } };
    } catch (e) { /* storage blocked or broken, start fresh */ }
    return structuredClone(defaults);
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  const t = (k, ...a) => { const v = T[S.lang][k]; return typeof v === 'function' ? v(...a) : v; };
  const dur = (m) => S.settings[m] * 60;
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  /* ---------- elements ---------- */
  const root = document.documentElement;
  const el = {
    time: $('time'), bar: $('ringBar'), dot: $('ringDot'), wrap: $('ringWrap'), title: $('modeTitle'), round: $('roundLabel'),
    start: $('startBtn'), startLabel: $('startLabel'), tabs: document.querySelectorAll('.tab'), pill: document.querySelector('.tab-pill'),
    list: $('taskList'), empty: $('tasksEmpty'), current: $('currentTask'), dialog: $('settingsDialog'), toast: $('toast')
  };
  el.bar.style.strokeDasharray = C;

  /* ---------- timer ---------- */
  let ticker = null;
  const remaining = () => S.timer.running ? Math.max(0, Math.ceil((S.timer.endAt - Date.now()) / 1000)) : S.timer.remaining;

  function start() {
    unlockAudio();
    S.timer.running = true;
    S.timer.endAt = Date.now() + S.timer.remaining * 1000;
    save(); loop(); render();
  }
  function pause() {
    S.timer.remaining = remaining();
    S.timer.running = false; S.timer.endAt = null;
    clearInterval(ticker); save(); render();
  }
  function toggle() { S.timer.running ? pause() : start(); }
  function reset() {
    clearInterval(ticker);
    S.timer.running = false; S.timer.endAt = null; S.timer.remaining = dur(S.timer.mode);
    save(); render();
  }
  function setMode(mode, autoStart = false) {
    clearInterval(ticker);
    S.timer.mode = mode; S.timer.running = false; S.timer.endAt = null; S.timer.remaining = dur(mode);
    save(); render();
    if (autoStart) start();
  }
  function next(finished, quiet = false) {
    const { mode } = S.timer;
    if (mode === 'focus') {
      if (finished) recordFocus();
      const longNow = S.timer.round >= S.settings.interval;
      setMode(longNow ? 'long' : 'short', finished && !quiet && S.settings.autoBreak);
    } else {
      S.timer.round = mode === 'long' ? 1 : S.timer.round + 1;
      setMode('focus', finished && !quiet && S.settings.autoFocus);
    }
  }
  function complete(quiet = false) {
    const wasFocus = S.timer.mode === 'focus';
    clearInterval(ticker);
    if (!quiet) {
      chime(); celebrate(wasFocus);
      toast(t(wasFocus ? 'doneFocus' : 'doneBreak'));
      notify(t(wasFocus ? 'doneFocus' : 'doneBreak'));
    }
    next(true, quiet);
  }
  function loop() {
    clearInterval(ticker);
    ticker = setInterval(() => {
      if (remaining() <= 0) complete(); else paintTime();
    }, 250);
  }

  function recordFocus() {
    const k = dayKey();
    const d = S.days[k] || (S.days[k] = { sessions: 0, minutes: 0 });
    d.sessions++; d.minutes += S.settings.focus; S.total++;
    const task = S.tasks.find((x) => x.id === S.activeTask);
    if (task) { task.count++; if (task.count >= task.est) task.done = true; }
    renderTasks(); renderStats(true);
  }

  /* ---------- rendering ---------- */
  let lastShown = '';
  function paintTime() {
    const r = remaining();
    const txt = fmt(r);
    if (txt !== lastShown) {
      el.time.textContent = txt;
      el.time.classList.remove('tick'); void el.time.offsetWidth; el.time.classList.add('tick');
      lastShown = txt;
      document.title = `${txt} · ${t(S.timer.mode)}`;
    }
    const p = 1 - r / dur(S.timer.mode);
    el.bar.style.strokeDashoffset = C * (1 - p);
    el.dot.style.transform = `rotate(${p * 360}deg)`;
  }

  function render() {
    root.dataset.mode = S.timer.mode;
    el.title.textContent = t(S.timer.mode + 'Title');
    el.round.textContent = t('round', Math.min(S.timer.round, S.settings.interval), S.settings.interval);
    el.startLabel.textContent = S.timer.running ? t('pause') : (S.timer.remaining < dur(S.timer.mode) ? t('resume') : t('start'));
    el.wrap.classList.toggle('running', S.timer.running);
    el.tabs.forEach((b) => { const on = b.dataset.mode === S.timer.mode; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
    movePill();
    const task = S.tasks.find((x) => x.id === S.activeTask && !x.done);
    el.current.textContent = task ? t('working', task.text) : '';
    lastShown = ''; paintTime();
  }
  function movePill() {
    const a = document.querySelector('.tab.active');
    if (a) { el.pill.style.left = a.offsetLeft + 'px'; el.pill.style.width = a.offsetWidth + 'px'; }
  }

  function applyLang() {
    root.lang = S.lang; root.dir = S.lang === 'he' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-label]').forEach((n) => { n.setAttribute('aria-label', t(n.dataset.i18nLabel)); n.title = t(n.dataset.i18nLabel); });
    document.querySelectorAll('[data-i18n-title]').forEach((n) => { n.title = t(n.dataset.i18nTitle); });
    $('langLabel').textContent = t('langLabel');
    $('langBtn').setAttribute('aria-label', t('langAria'));
    render(); renderTasks(); renderStats();
  }
  function applyTheme() {
    root.dataset.theme = S.theme;
    $('themeIcon').textContent = S.theme === 'dark' ? '☀️' : '🌙';
    document.querySelector('meta[name="theme-color"]').content = S.theme === 'dark' ? '#1E1A33' : '#FFE6DE';
  }

  /* ---------- tasks ---------- */
  function renderTasks() {
    el.list.innerHTML = '';
    S.tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'task' + (task.done ? ' done' : '') + (task.id === S.activeTask ? ' active' : '');
      li.tabIndex = 0;
      li.innerHTML = `<button class="task-check" type="button">${task.done ? '✓' : ''}</button>
        <span class="task-text"></span><span class="task-count">${task.count}/${task.est} 🍅</span>
        <button class="task-del" type="button">✕</button>`;
      li.querySelector('.task-text').textContent = task.text;
      const chk = li.querySelector('.task-check'); chk.setAttribute('aria-label', t('toggleDone'));
      const del = li.querySelector('.task-del'); del.setAttribute('aria-label', t('del'));
      chk.onclick = (e) => { e.stopPropagation(); task.done = !task.done; save(); renderTasks(); render(); };
      del.onclick = (e) => {
        e.stopPropagation(); li.classList.add('leaving');
        setTimeout(() => { S.tasks = S.tasks.filter((x) => x.id !== task.id); if (S.activeTask === task.id) S.activeTask = null; save(); renderTasks(); render(); }, 250);
      };
      const select = () => { S.activeTask = S.activeTask === task.id ? null : task.id; save(); renderTasks(); render(); };
      li.onclick = select;
      li.onkeydown = (e) => { if (e.key === 'Enter') select(); };
      el.list.appendChild(li);
    });
    el.empty.hidden = S.tasks.length > 0;
    $('clearDoneBtn').hidden = !S.tasks.some((x) => x.done);
  }
  $('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = $('taskInput').value.trim();
    if (!text) return;
    const est = Math.min(12, Math.max(1, parseInt($('taskEst').value, 10) || 1));
    const task = { id: Date.now().toString(36), text, est, count: 0, done: false };
    S.tasks.push(task);
    if (!S.activeTask) S.activeTask = task.id;
    $('taskInput').value = ''; $('taskEst').value = 1;
    save(); renderTasks(); render();
  });
  $('clearDoneBtn').addEventListener('click', () => {
    const before = S.tasks.length;
    S.tasks = S.tasks.filter((x) => !x.done);
    if (!S.tasks.some((x) => x.id === S.activeTask)) S.activeTask = null;
    toast(t(before === S.tasks.length ? 'nothingToClear' : 'cleared'));
    save(); renderTasks(); render();
  });

  /* ---------- stats ---------- */
  function streak() {
    let n = 0; const d = new Date();
    if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1);
    while (S.days[dayKey(d)] && S.days[dayKey(d)].sessions > 0) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function renderStats(bump = false) {
    const today = S.days[dayKey()] || { sessions: 0, minutes: 0 };
    const vals = { statToday: today.sessions, statMinutes: today.minutes, statStreak: streak(), statTotal: S.total };
    Object.entries(vals).forEach(([id, v]) => {
      const n = $(id); n.textContent = v;
      if (bump) { n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); }
    });
    const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d; });
    const counts = days.map((d) => (S.days[dayKey(d)] || {}).sessions || 0);
    const max = Math.max(4, ...counts);
    const name = new Intl.DateTimeFormat(S.lang === 'he' ? 'he-IL' : 'en-US', { weekday: 'short' });
    $('weekChart').innerHTML = days.map((d, i) =>
      `<div class="bar${i === 6 ? ' today' : ''}"><b>${counts[i] || ''}</b><i style="height:${(counts[i] / max) * 100}%;animation-delay:${i * 60}ms"></i><span>${name.format(d)}</span></div>`).join('');
  }

  /* ---------- sound, notifications, fun ---------- */
  let ctx = null;
  function unlockAudio() { try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch (e) { ctx = null; } }
  function chime(force = false) {
    if (!S.settings.sound && !force) return;
    unlockAudio(); if (!ctx) return;
    [659.25, 783.99, 1046.5].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), at = ctx.currentTime + i * 0.18;
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(0.25, at + 0.02); g.gain.exponentialRampToValueAtTime(0.001, at + 0.9);
      o.connect(g).connect(ctx.destination); o.start(at); o.stop(at + 1);
    });
  }
  function notify(msg) {
    if (!S.settings.notify || !('Notification' in window) || Notification.permission !== 'granted') return;
    try { new Notification(t('appName'), { body: msg, icon: 'logo.svg' }); } catch (e) { /* ignore */ }
  }
  let toastTimer;
  function toast(msg) {
    el.toast.textContent = msg; el.toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.toast.classList.remove('show'), 2600);
  }
  function celebrate(big) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = $('confetti'), colors = ['#FFB4A2', '#B3A9FA', '#A9E3CD', '#F5B8C8', '#FFE29A', '#E36E57'];
    for (let i = 0; i < (big ? 90 : 40); i++) {
      const c = document.createElement('i');
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
      c.style.setProperty('--r', (Math.random() * 720) + 'deg');
      c.style.animationDuration = 1.8 + Math.random() * 1.8 + 's';
      c.style.animationDelay = Math.random() * 0.4 + 's';
      if (i % 3 === 0) c.style.borderRadius = '50%';
      box.appendChild(c);
      setTimeout(() => c.remove(), 4200);
    }
  }

  /* ---------- settings dialog ---------- */
  const fields = { setFocus: 'focus', setShort: 'short', setLong: 'long', setInterval: 'interval' };
  const toggles = { setAutoBreak: 'autoBreak', setAutoFocus: 'autoFocus', setSound: 'sound', setNotify: 'notify' };
  $('settingsBtn').addEventListener('click', () => {
    Object.entries(fields).forEach(([id, k]) => { $(id).value = S.settings[k]; });
    Object.entries(toggles).forEach(([id, k]) => { $(id).checked = S.settings[k]; });
    resetArmed = false; $('resetStatsBtn').textContent = t('resetStats');
    el.dialog.showModal();
  });
  $('cancelSettings').addEventListener('click', () => el.dialog.close());
  el.dialog.addEventListener('click', (e) => { if (e.target === el.dialog) el.dialog.close(); });
  $('settingsForm').addEventListener('submit', () => {
    const old = { ...S.settings };
    Object.entries(fields).forEach(([id, k]) => {
      const n = $(id); S.settings[k] = Math.min(+n.max, Math.max(+n.min, parseInt(n.value, 10) || old[k]));
    });
    Object.entries(toggles).forEach(([id, k]) => { S.settings[k] = $(id).checked; });
    if (!S.timer.running && S.settings[S.timer.mode] !== old[S.timer.mode]) S.timer.remaining = dur(S.timer.mode);
    if (S.timer.running && S.settings[S.timer.mode] !== old[S.timer.mode]) { S.timer.running = false; S.timer.endAt = null; clearInterval(ticker); S.timer.remaining = dur(S.timer.mode); }
    save(); render(); toast(t('saved'));
  });
  $('setNotify').addEventListener('change', async (e) => {
    if (!e.target.checked || !('Notification' in window)) return;
    const p = Notification.permission === 'default' ? await Notification.requestPermission() : Notification.permission;
    if (p !== 'granted') { e.target.checked = false; toast(t('notifyDenied')); }
  });
  $('testSoundBtn').addEventListener('click', () => chime(true));
  let resetArmed = false;
  $('resetStatsBtn').addEventListener('click', (e) => {
    if (!resetArmed) { resetArmed = true; e.target.textContent = t('confirmReset'); return; }
    S.days = {}; S.total = 0; resetArmed = false; e.target.textContent = t('resetStats');
    save(); renderStats(true); toast(t('statsCleared'));
  });

  /* ---------- controls ---------- */
  el.start.addEventListener('click', toggle);
  $('resetBtn').addEventListener('click', reset);
  $('skipBtn').addEventListener('click', () => next(false));
  el.tabs.forEach((b) => b.addEventListener('click', () => { if (b.dataset.mode !== S.timer.mode) setMode(b.dataset.mode); }));
  $('langBtn').addEventListener('click', () => { S.lang = S.lang === 'he' ? 'en' : 'he'; save(); applyLang(); });
  $('themeBtn').addEventListener('click', () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; save(); applyTheme(); });
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, dialog') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    else if (e.key.toLowerCase() === 'r') reset();
    else if (e.key.toLowerCase() === 's') next(false);
  });
  addEventListener('resize', movePill);
  addEventListener('storage', (e) => { if (e.key === KEY) { S = load(); applyTheme(); applyLang(); if (S.timer.running) loop(); else clearInterval(ticker); } });

  /* ---------- boot ---------- */
  applyTheme(); applyLang();
  if (S.timer.running) {
    if (remaining() <= 0) { complete(true); toast(t('welcomeBack')); } else loop();
  }
})();
