/* Pomodoro Timer · vanilla JS, everything saved in localStorage */
(() => {
  'use strict';

  const KEY = 'pomodoro-timer.v1';
  const $ = (id) => document.getElementById(id);
  const C = 2 * Math.PI * 140; // ring circumference

  /* ---------- texts ---------- */
  const T = {
    he: {
      appName: 'Pomodoro Timer', tagline: 'להתרכז. לנוח. לחזור על זה.', repo: 'הקוד בגיטהאב',
      focus: 'פוקוס', short: 'הפסקה קצרה', long: 'הפסקה ארוכה',
      focusTitle: 'זמן להתרכז', shortTitle: 'נושמים רגע', longTitle: 'הפסקה ארוכה ומגיעה לך',
      start: 'התחלה', pause: 'עצירה', resume: 'המשך', reset: 'איפוס', skip: 'דילוג',
      round: (a, b) => `סבב ${a} מתוך ${b}`, endsAt: (h) => `מסתיים ב־${h}`,
      shortcuts: 'רווח התחלה/עצירה · R איפוס · S דילוג · +/− דקה · F מסך מלא · N משימה חדשה',
      presets: 'מצבי עבודה', pClassic: 'קלאסי', pDeep: 'עבודה עמוקה', pMarathon: 'מרתון', pCustom: 'מותאם',
      plusMin: 'הוספת דקה', minusMin: 'הורדת דקה', zen: 'מצב ריכוז במסך מלא', exitZen: 'יציאה ממצב ריכוז',
      sounds: 'צלילי רקע', sNone: 'שקט', sRain: 'גשם', sWaves: 'גלים', sBrown: 'רעש חום', sCafe: 'בית קפה', volume: 'עוצמה',
      soundsOnlyFocus: 'צלילי רקע רק בזמן פוקוס',
      tasks: 'משימות', taskPh: 'על מה עובדים היום?', estimate: 'כמה פומודורו', add: 'הוספה',
      noTasks: 'עדיין אין משימות. הוסיפו משימה ראשונה ולחצו עליה כדי לבחור אותה.',
      clearDone: 'ניקוי משימות שהושלמו', working: (t) => `🍅 עובדים על: ${t}`,
      del: 'מחיקה', toggleDone: 'סימון כהושלם', editHint: 'לחיצה כפולה לעריכה', moveUp: 'הזזה למעלה',
      tasksLeft: (n, m) => `נשארו ${n} פומודורו · בערך ${m}`,
      stats: 'הסטטיסטיקה שלי', statToday: 'פומודורו היום', statMinutes: 'דקות פוקוס היום',
      statStreak: 'ימים ברצף 🔥', statTotal: 'סך הכל פומודורו', week: '7 הימים האחרונים',
      goal: 'יעד יומי', goalOf: (a, b) => `${a} מתוך ${b} פומודורו`, goalDone: 'הגעת ליעד היומי! 🏆',
      weekSum: (h) => `השבוע: ${h} שעות פוקוס`, best: (n) => `שיא יומי: ${n}`,
      log: 'יומן היום', noLog: 'הסבבים שתסיימו היום יופיעו כאן', minShort: 'דק׳', exportCsv: '⬇️ ייצוא לאקסל (CSV)',
      madeBy: 'נבנה על ידי נויה אדיבי', portfolio: 'תיק עבודות',
      settings: 'הגדרות', theme: 'מצב כהה או בהיר',
      focusMin: 'פוקוס (דקות)', shortMin: 'הפסקה קצרה', longMin: 'הפסקה ארוכה',
      interval: 'הפסקה ארוכה אחרי כמה סבבים', goalSet: 'יעד יומי (פומודורו)', autoBreak: 'להתחיל הפסקות אוטומטית',
      autoFocus: 'להתחיל פוקוס אוטומטית אחרי הפסקה', sound: 'צליל בסיום', notify: 'התראה בדפדפן',
      wake: 'להשאיר את המסך דלוק בזמן ריצה', tips: 'רעיונות להפסקה',
      testSound: '🔔 לשמוע צליל', resetStats: 'איפוס סטטיסטיקה', confirmReset: 'בטוח? לוחצים שוב',
      cancel: 'ביטול', save: 'שמירה', saved: 'ההגדרות נשמרו ✨', statsCleared: 'הסטטיסטיקה אופסה',
      doneFocus: 'כל הכבוד! סיימת פומודורו 🎉', doneBreak: 'ההפסקה נגמרה, חוזרים לעבודה 💪',
      notifyDenied: 'הדפדפן חסם התראות', cleared: 'נוקו משימות שהושלמו', nothingToClear: 'אין משימות שהושלמו',
      welcomeBack: 'הטיימר הסתיים בזמן שלא היית כאן', langLabel: 'EN', langAria: 'Switch to English',
      presetSet: (n) => `עברנו למצב ${n}`, exported: 'הקובץ ירד ✨',
      breakTips: ['🚰 לשתות כוס מים', '🧘 שלוש נשימות עמוקות', '👀 להסתכל רחוק 20 שניות', '🤸 למתוח ידיים וגב', '🚶 לקום ולהסתובב קצת', '🪟 לפתוח חלון לאוויר', '🍎 נשנוש קטן ובריא', '📵 לנוח גם מהטלפון']
    },
    en: {
      appName: 'Pomodoro Timer', tagline: 'Focus. Rest. Repeat.', repo: 'Code on GitHub',
      focus: 'Focus', short: 'Short break', long: 'Long break',
      focusTitle: 'Time to focus', shortTitle: 'Take a breath', longTitle: 'You earned a long break',
      start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset', skip: 'Skip',
      round: (a, b) => `Round ${a} of ${b}`, endsAt: (h) => `Ends at ${h}`,
      shortcuts: 'Space start/pause · R reset · S skip · +/− minute · F full screen · N new task',
      presets: 'Work modes', pClassic: 'Classic', pDeep: 'Deep work', pMarathon: 'Marathon', pCustom: 'Custom',
      plusMin: 'Add a minute', minusMin: 'Remove a minute', zen: 'Full screen focus mode', exitZen: 'Exit focus mode',
      sounds: 'Background sounds', sNone: 'Silent', sRain: 'Rain', sWaves: 'Waves', sBrown: 'Brown noise', sCafe: 'Cafe', volume: 'Volume',
      soundsOnlyFocus: 'Background sounds only during focus',
      tasks: 'Tasks', taskPh: 'What are you working on?', estimate: 'Pomodoros', add: 'Add',
      noTasks: 'No tasks yet. Add your first one and click it to select it.',
      clearDone: 'Clear finished tasks', working: (t) => `🍅 Working on: ${t}`,
      del: 'Delete', toggleDone: 'Mark as done', editHint: 'Double click to edit', moveUp: 'Move up',
      tasksLeft: (n, m) => `${n} pomodoros left · about ${m}`,
      stats: 'My stats', statToday: 'Pomodoros today', statMinutes: 'Focus minutes today',
      statStreak: 'Day streak 🔥', statTotal: 'Total pomodoros', week: 'Last 7 days',
      goal: 'Daily goal', goalOf: (a, b) => `${a} of ${b} pomodoros`, goalDone: 'Daily goal reached! 🏆',
      weekSum: (h) => `This week: ${h} focus hours`, best: (n) => `Best day: ${n}`,
      log: "Today's log", noLog: 'Rounds you finish today will show up here', minShort: 'min', exportCsv: '⬇️ Export to Excel (CSV)',
      madeBy: 'Built by Noya Adivi', portfolio: 'Portfolio',
      settings: 'Settings', theme: 'Dark or light mode',
      focusMin: 'Focus (minutes)', shortMin: 'Short break', longMin: 'Long break',
      interval: 'Long break after how many rounds', goalSet: 'Daily goal (pomodoros)', autoBreak: 'Start breaks automatically',
      autoFocus: 'Start focus automatically after a break', sound: 'Sound when done', notify: 'Browser notification',
      wake: 'Keep the screen on while running', tips: 'Break ideas',
      testSound: '🔔 Test sound', resetStats: 'Reset stats', confirmReset: 'Sure? Click again',
      cancel: 'Cancel', save: 'Save', saved: 'Settings saved ✨', statsCleared: 'Stats were reset',
      doneFocus: 'Great job! Pomodoro complete 🎉', doneBreak: 'Break is over, back to work 💪',
      notifyDenied: 'Notifications are blocked', cleared: 'Finished tasks cleared', nothingToClear: 'No finished tasks',
      welcomeBack: 'The timer finished while you were away', langLabel: 'עב', langAria: 'לעברית',
      presetSet: (n) => `Switched to ${n}`, exported: 'File downloaded ✨',
      breakTips: ['🚰 Drink a glass of water', '🧘 Take three deep breaths', '👀 Look far away for 20 seconds', '🤸 Stretch your arms and back', '🚶 Get up and walk a little', '🪟 Open a window for fresh air', '🍎 Grab a small healthy snack', '📵 Rest from your phone too']
    }
  };

  const PRESETS = { classic: [25, 5, 15], deep: [50, 10, 20], marathon: [90, 20, 30] };

  /* ---------- state ---------- */
  const defaults = {
    lang: 'he', theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    settings: { focus: 25, short: 5, long: 15, interval: 4, goal: 8, autoBreak: false, autoFocus: false, sound: true, notify: false, wake: true },
    timer: { mode: 'focus', running: false, endAt: null, remaining: 25 * 60, total: 25 * 60, round: 1 },
    ambient: { kind: 'none', vol: 0.5, onlyFocus: true },
    tasks: [], activeTask: null, days: {}, total: 0, log: []
  };
  let S = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved) return { ...defaults, ...saved, settings: { ...defaults.settings, ...saved.settings }, timer: { ...defaults.timer, ...saved.timer }, ambient: { ...defaults.ambient, ...saved.ambient }, log: saved.log || [] };
    } catch (e) { /* storage blocked or broken, start fresh */ }
    return structuredClone(defaults);
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  const t = (k, ...a) => { const v = T[S.lang][k]; return typeof v === 'function' ? v(...a) : v; };
  const dur = (m) => S.settings[m] * 60;
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const fmt = (s) => s >= 3600
    ? `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
    : `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const clock = (d) => new Intl.DateTimeFormat(S.lang === 'he' ? 'he-IL' : 'en-US', { hour: '2-digit', minute: '2-digit' }).format(d);

  /* ---------- elements ---------- */
  const root = document.documentElement;
  const el = {
    time: $('time'), bar: $('ringBar'), dot: $('ringDot'), wrap: $('ringWrap'), title: $('modeTitle'), round: $('roundLabel'),
    ends: $('endsAt'), start: $('startBtn'), startLabel: $('startLabel'), tabs: document.querySelectorAll('.tab'), pill: document.querySelector('.tab-pill'),
    list: $('taskList'), empty: $('tasksEmpty'), current: $('currentTask'), dialog: $('settingsDialog'), toast: $('toast')
  };
  el.bar.style.strokeDasharray = C;

  /* ---------- timer ---------- */
  let ticker = null, finisher = null;
  const remaining = () => S.timer.running ? Math.max(0, Math.ceil((S.timer.endAt - Date.now()) / 1000)) : S.timer.remaining;
  const totalNow = () => Math.max(S.timer.total || dur(S.timer.mode), remaining(), 1);

  function start() {
    unlockAudio();
    S.timer.running = true;
    S.timer.endAt = Date.now() + S.timer.remaining * 1000;
    save(); loop(); render(); wake(true); ambientSync();
  }
  function pause() {
    S.timer.remaining = remaining();
    S.timer.running = false; S.timer.endAt = null;
    stopLoop(); save(); render(); wake(false); ambientSync();
  }
  function toggle() { S.timer.running ? pause() : start(); }
  function reset() {
    stopLoop();
    S.timer.running = false; S.timer.endAt = null; S.timer.remaining = S.timer.total = dur(S.timer.mode);
    save(); render(); wake(false); ambientSync();
  }
  function setMode(mode, autoStart = false) {
    stopLoop();
    S.timer.mode = mode; S.timer.running = false; S.timer.endAt = null; S.timer.remaining = S.timer.total = dur(mode);
    if (mode !== 'focus') tipIndex = Math.floor(Math.random() * T.he.breakTips.length);
    save(); render(); wake(false); ambientSync();
    if (autoStart) start();
  }
  function addMinutes(n) {
    const r = remaining();
    if (n < 0 && r <= 60) return;
    if (S.timer.running) S.timer.endAt += n * 60000; else S.timer.remaining = r + n * 60;
    S.timer.total = Math.max(60, (S.timer.total || dur(S.timer.mode)) + n * 60);
    save(); loop(S.timer.running); render();
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
    stopLoop();
    if (!quiet) {
      chime(); celebrate(wasFocus);
      toast(t(wasFocus ? 'doneFocus' : 'doneBreak'));
      notify(t(wasFocus ? 'doneFocus' : 'doneBreak'));
    }
    next(true, quiet);
  }
  function stopLoop() { clearInterval(ticker); clearTimeout(finisher); }
  function loop(onlyIfRunning) {
    stopLoop();
    if (onlyIfRunning === false) return;
    ticker = setInterval(() => { if (remaining() <= 0) complete(); else paintTime(); }, 250);
    // exact finish even when the tab is in the background and intervals are slowed
    finisher = setTimeout(() => { if (S.timer.running && remaining() <= 0) complete(); }, Math.max(0, S.timer.endAt - Date.now()) + 50);
  }

  function recordFocus() {
    const k = dayKey();
    const d = S.days[k] || (S.days[k] = { sessions: 0, minutes: 0 });
    const minutes = Math.round(totalNow() / 60);
    const before = d.sessions;
    d.sessions++; d.minutes += minutes; S.total++;
    const task = S.tasks.find((x) => x.id === S.activeTask);
    if (task) { task.count++; if (task.count >= task.est) task.done = true; }
    S.log.push({ at: Date.now(), min: minutes, task: task ? task.text : '' });
    if (S.log.length > 500) S.log = S.log.slice(-500);
    if (before < S.settings.goal && d.sessions >= S.settings.goal) setTimeout(() => { toast(t('goalDone')); celebrate(true); }, 1400);
    renderTasks(); renderStats(true);
  }

  /* ---------- rendering ---------- */
  let lastShown = '', tipIndex = 0;
  function paintTime() {
    const r = remaining();
    const txt = fmt(r);
    const p = 1 - r / totalNow();
    if (txt !== lastShown) {
      el.time.textContent = txt;
      el.time.classList.remove('tick'); void el.time.offsetWidth; el.time.classList.add('tick');
      lastShown = txt;
      document.title = `${S.timer.running ? (S.timer.mode === 'focus' ? '🍅' : '☕') : '⏸'} ${txt} · ${t(S.timer.mode)}`;
      favicon(p);
    }
    el.bar.style.strokeDashoffset = C * (1 - p);
    el.dot.style.transform = `rotate(${p * 360}deg)`;
    $('zenBar').style.transform = `scaleX(${p})`;
  }

  function render() {
    root.dataset.mode = S.timer.mode;
    root.classList.toggle('is-running', S.timer.running);
    el.title.textContent = t(S.timer.mode + 'Title');
    el.round.textContent = t('round', Math.min(S.timer.round, S.settings.interval), S.settings.interval);
    el.ends.textContent = S.timer.running ? t('endsAt', clock(new Date(S.timer.endAt))) : '';
    el.startLabel.textContent = S.timer.running ? t('pause') : (S.timer.remaining < totalNow() ? t('resume') : t('start'));
    el.wrap.classList.toggle('running', S.timer.running);
    el.tabs.forEach((b) => { const on = b.dataset.mode === S.timer.mode; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
    movePill();
    const task = S.tasks.find((x) => x.id === S.activeTask && !x.done);
    el.current.classList.toggle('tip', S.timer.mode !== 'focus');
    el.current.textContent = S.timer.mode !== 'focus' ? `${t('tips')}: ${T[S.lang].breakTips[tipIndex]}` : (task ? t('working', task.text) : '');
    renderPresets();
    lastShown = ''; paintTime();
  }
  function movePill() {
    const a = document.querySelector('.tab.active');
    if (a) { el.pill.style.left = a.offsetLeft + 'px'; el.pill.style.width = a.offsetWidth + 'px'; }
  }
  function renderPresets() {
    const cur = [S.settings.focus, S.settings.short, S.settings.long].join();
    document.querySelectorAll('.preset').forEach((b) => {
      const on = b.dataset.preset === 'custom' ? !Object.values(PRESETS).some((p) => p.join() === cur) : PRESETS[b.dataset.preset].join() === cur;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
    });
  }

  // tab icon that fills up like the ring
  const fav = document.querySelector('link[rel="icon"]');
  const favCanvas = document.createElement('canvas'); favCanvas.width = favCanvas.height = 64;
  let favLast = -1;
  function favicon(p) {
    const step = Math.round(p * 40);
    if (step === favLast && S.timer.running) return;
    favLast = step;
    if (!S.timer.running && p === 0) { fav.href = 'logo.svg'; return; }
    const g = favCanvas.getContext('2d'), col = getComputedStyle(root).getPropertyValue('--a').trim() || '#E36E57';
    g.clearRect(0, 0, 64, 64);
    g.lineWidth = 10; g.lineCap = 'round';
    g.strokeStyle = 'rgba(150,140,200,.35)'; g.beginPath(); g.arc(32, 32, 25, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = col; g.beginPath(); g.arc(32, 32, 25, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(.02, p)); g.stroke();
    g.fillStyle = col; g.beginPath(); g.arc(32, 32, 11, 0, Math.PI * 2); g.fill();
    fav.href = favCanvas.toDataURL('image/png');
  }

  function applyLang() {
    root.lang = S.lang; root.dir = S.lang === 'he' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-label]').forEach((n) => { n.setAttribute('aria-label', t(n.dataset.i18nLabel)); n.title = t(n.dataset.i18nLabel); });
    document.querySelectorAll('[data-i18n-title]').forEach((n) => { n.title = t(n.dataset.i18nTitle); });
    $('langLabel').textContent = t('langLabel');
    $('langBtn').setAttribute('aria-label', t('langAria'));
    render(); renderTasks(); renderStats(); renderAmbient();
  }
  function applyTheme() {
    root.dataset.theme = S.theme;
    $('themeIcon').textContent = S.theme === 'dark' ? '☀️' : '🌙';
    document.querySelector('meta[name="theme-color"]').content = S.theme === 'dark' ? '#1E1A33' : '#FFE6DE';
  }

  /* ---------- tasks ---------- */
  function renderTasks() {
    el.list.innerHTML = '';
    S.tasks.forEach((task, i) => {
      const li = document.createElement('li');
      li.className = 'task' + (task.done ? ' done' : '') + (task.id === S.activeTask ? ' active' : '');
      li.tabIndex = 0;
      li.innerHTML = `<button class="task-check" type="button">${task.done ? '✓' : ''}</button>
        <span class="task-text"></span>
        <span class="task-count"><button class="cnt" type="button" data-d="-1">−</button><b>${task.count}/${task.est}</b><button class="cnt" type="button" data-d="1">+</button> 🍅</span>
        ${i > 0 ? '<button class="task-up" type="button">↑</button>' : ''}
        <button class="task-del" type="button">✕</button>`;
      const txt = li.querySelector('.task-text'); txt.textContent = task.text; txt.title = t('editHint');
      const chk = li.querySelector('.task-check'); chk.setAttribute('aria-label', t('toggleDone'));
      const del = li.querySelector('.task-del'); del.setAttribute('aria-label', t('del'));
      const up = li.querySelector('.task-up');
      if (up) { up.setAttribute('aria-label', t('moveUp')); up.onclick = (e) => { e.stopPropagation(); [S.tasks[i - 1], S.tasks[i]] = [S.tasks[i], S.tasks[i - 1]]; save(); renderTasks(); }; }
      li.querySelectorAll('.cnt').forEach((b) => b.onclick = (e) => {
        e.stopPropagation(); task.est = Math.min(12, Math.max(1, task.est + +b.dataset.d)); task.done = task.count >= task.est && task.done; save(); renderTasks();
      });
      chk.onclick = (e) => { e.stopPropagation(); task.done = !task.done; if (task.done) li.classList.add('pop'); save(); setTimeout(() => { renderTasks(); render(); }, task.done ? 250 : 0); };
      del.onclick = (e) => {
        e.stopPropagation(); li.classList.add('leaving');
        setTimeout(() => { S.tasks = S.tasks.filter((x) => x.id !== task.id); if (S.activeTask === task.id) S.activeTask = null; save(); renderTasks(); render(); }, 250);
      };
      txt.ondblclick = (e) => {
        e.stopPropagation(); txt.contentEditable = 'true'; txt.focus();
        document.getSelection().selectAllChildren(txt);
        const done = (ok) => { txt.contentEditable = 'false'; const v = txt.textContent.trim().slice(0, 80); if (ok && v) task.text = v; save(); renderTasks(); render(); };
        txt.onkeydown = (k) => { k.stopPropagation(); if (k.key === 'Enter') { k.preventDefault(); done(true); } if (k.key === 'Escape') done(false); };
        txt.onblur = () => done(true);
      };
      const select = () => { if (txt.isContentEditable) return; S.activeTask = S.activeTask === task.id ? null : task.id; save(); renderTasks(); render(); };
      li.onclick = select;
      li.onkeydown = (e) => { if (e.key === 'Enter' && e.target === li) select(); };
      el.list.appendChild(li);
    });
    el.empty.hidden = S.tasks.length > 0;
    $('clearDoneBtn').hidden = !S.tasks.some((x) => x.done);
    const left = S.tasks.filter((x) => !x.done).reduce((a, x) => a + Math.max(0, x.est - x.count), 0);
    const mins = left * S.settings.focus + Math.max(0, left - 1) * S.settings.short;
    $('tasksLeft').textContent = left ? t('tasksLeft', left, `${Math.floor(mins / 60) ? Math.floor(mins / 60) + (S.lang === 'he' ? ' שע׳ ' : 'h ') : ''}${mins % 60} ${t('minShort')}`) : '';
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
    // daily goal
    const g = S.settings.goal, pct = Math.min(100, (today.sessions / g) * 100);
    $('goalText').textContent = t('goalOf', today.sessions, g);
    $('goalFill').style.width = pct + '%';
    $('goalBox').classList.toggle('reached', today.sessions >= g);
    $('goalDots').innerHTML = [...Array(Math.min(g, 16))].map((_, i) => `<i class="${i < today.sessions ? 'on' : ''}" style="--d:${i * 40}ms"></i>`).join('');
    // week
    const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d; });
    const counts = days.map((d) => (S.days[dayKey(d)] || {}).sessions || 0);
    const weekMin = days.reduce((a, d) => a + ((S.days[dayKey(d)] || {}).minutes || 0), 0);
    const max = Math.max(4, ...counts);
    const name = new Intl.DateTimeFormat(S.lang === 'he' ? 'he-IL' : 'en-US', { weekday: 'short' });
    $('weekChart').innerHTML = days.map((d, i) =>
      `<div class="bar${i === 6 ? ' today' : ''}${counts[i] >= g ? ' hit' : ''}"><b>${counts[i] || ''}</b><i style="height:${(counts[i] / max) * 100}%;animation-delay:${i * 60}ms"></i><span>${name.format(d)}</span></div>`).join('');
    const best = Math.max(0, ...Object.values(S.days).map((x) => x.sessions));
    $('weekSum').textContent = `${t('weekSum', (weekMin / 60).toFixed(1))} · ${t('best', best)}`;
    // today's log
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const todayLog = S.log.filter((x) => x.at >= start.getTime()).reverse();
    $('logList').innerHTML = todayLog.length ? todayLog.map((x) => `<li><time>${clock(new Date(x.at))}</time><span>${x.min} ${t('minShort')}</span><em></em></li>`).join('') : `<li class="muted">${t('noLog')}</li>`;
    $('logList').querySelectorAll('em').forEach((n, i) => { n.textContent = todayLog[i].task || '🍅'; });
  }
  $('exportBtn').addEventListener('click', () => {
    const rows = [['date', 'time', 'minutes', 'task']].concat(S.log.map((x) => { const d = new Date(x.at); return [dayKey(d), clock(d), x.min, x.task]; }));
    const days = [['date', 'pomodoros', 'focus minutes']].concat(Object.keys(S.days).sort().map((k) => [k, S.days[k].sessions, S.days[k].minutes]));
    const csv = (r) => r.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv(rows) + '\r\n\r\n' + csv(days)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `pomodoro-${dayKey()}.csv`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast(t('exported'));
  });

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

  /* background sounds, made live with Web Audio (no files to download) */
  let amb = null;
  function noiseBuffer(type) {
    const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    let last = 0, b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (type === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      else { b0 = 0.997 * b0 + w * 0.029; b1 = 0.985 * b1 + w * 0.032; b2 = 0.95 * b2 + w * 0.048; d[i] = (b0 + b1 + b2 + w * 0.02) * 1.6; }
    }
    return buf;
  }
  function ambientStop() {
    if (!amb) return;
    const a = amb; amb = null;
    try { a.out.gain.setTargetAtTime(0, ctx.currentTime, 0.25); setTimeout(() => a.nodes.forEach((n) => { try { n.stop ? n.stop() : n.disconnect(); } catch (e) { /* done */ } }), 900); } catch (e) { /* ignore */ }
  }
  function ambientStart(kind) {
    unlockAudio(); if (!ctx) return;
    ambientStop();
    const out = ctx.createGain(); out.gain.value = 0; out.connect(ctx.destination);
    const nodes = [out];
    const src = ctx.createBufferSource(); src.buffer = noiseBuffer(kind === 'brown' || kind === 'waves' ? 'brown' : 'pink'); src.loop = true; nodes.push(src);
    const f = ctx.createBiquadFilter(); nodes.push(f);
    if (kind === 'rain') { f.type = 'highpass'; f.frequency.value = 600; }
    else if (kind === 'cafe') { f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.6; }
    else { f.type = 'lowpass'; f.frequency.value = kind === 'waves' ? 700 : 1200; }
    src.connect(f).connect(out);
    if (kind === 'waves') { // slow swell like the sea
      const lfo = ctx.createOscillator(), depth = ctx.createGain(), base = ctx.createGain();
      lfo.frequency.value = 0.09; depth.gain.value = 0.45; base.gain.value = 0.55;
      f.disconnect(); f.connect(base).connect(out); lfo.connect(depth).connect(base.gain); lfo.start(); nodes.push(lfo, depth, base);
    }
    if (kind === 'cafe') { // soft cups and murmur
      const o = ctx.createOscillator(), og = ctx.createGain(); o.type = 'triangle'; o.frequency.value = 180; og.gain.value = 0.015; o.connect(og).connect(out); o.start(); nodes.push(o, og);
    }
    src.start();
    out.gain.setTargetAtTime(S.ambient.vol * (kind === 'rain' ? 0.55 : 0.4), ctx.currentTime, 0.4);
    amb = { kind, out, nodes };
  }
  function ambientWanted() { return S.ambient.kind !== 'none' && S.timer.running && (!S.ambient.onlyFocus || S.timer.mode === 'focus'); }
  function ambientSync() {
    if (ambientWanted()) { if (!amb || amb.kind !== S.ambient.kind) ambientStart(S.ambient.kind); }
    else ambientStop();
  }
  function renderAmbient() {
    document.querySelectorAll('.snd').forEach((b) => { const on = b.dataset.snd === S.ambient.kind; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    $('ambVol').value = S.ambient.vol; $('ambOnlyFocus').checked = S.ambient.onlyFocus;
    $('soundBox').classList.toggle('playing', !!amb);
  }
  document.querySelectorAll('.snd').forEach((b) => b.addEventListener('click', () => {
    unlockAudio(); S.ambient.kind = b.dataset.snd; save();
    // a quick preview even when the timer is stopped
    if (S.ambient.kind !== 'none' && !ambientWanted()) { ambientStart(S.ambient.kind); clearTimeout(previewT); previewT = setTimeout(ambientSync, 3500); }
    else ambientSync();
    renderAmbient();
  }));
  let previewT;
  $('ambVol').addEventListener('input', (e) => {
    S.ambient.vol = +e.target.value; save();
    if (amb && ctx) amb.out.gain.setTargetAtTime(S.ambient.vol * (amb.kind === 'rain' ? 0.55 : 0.4), ctx.currentTime, 0.1);
  });
  $('ambOnlyFocus').addEventListener('change', (e) => { S.ambient.onlyFocus = e.target.checked; save(); ambientSync(); renderAmbient(); });
  setInterval(() => $('soundBox').classList.toggle('playing', !!amb), 600);

  /* keep the screen awake while the timer runs */
  let lock = null;
  async function wake(on) {
    try {
      if (on && S.settings.wake && 'wakeLock' in navigator && !lock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); }
      if (!on && lock) { await lock.release(); lock = null; }
    } catch (e) { lock = null; }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (S.timer.running) { if (remaining() <= 0) complete(); else { wake(true); paintTime(); } }
    }
  });

  function notify(msg) {
    if (!S.settings.notify || !('Notification' in window) || Notification.permission !== 'granted') return;
    const opts = { body: msg, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'pomodoro', renotify: true };
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.ready.then((r) => r.showNotification(t('appName'), opts));
      else new Notification(t('appName'), opts);
    } catch (e) { /* ignore */ }
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

  /* ---------- zen (full screen focus) ---------- */
  function setZen(on) {
    root.classList.toggle('zen', on);
    $('zenBtn').setAttribute('aria-label', t(on ? 'exitZen' : 'zen')); $('zenBtn').title = t(on ? 'exitZen' : 'zen');
    try {
      if (on && !document.fullscreenElement && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
      if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    } catch (e) { /* not supported */ }
    setTimeout(movePill, 50);
  }
  $('zenBtn').addEventListener('click', () => setZen(!root.classList.contains('zen')));
  $('zenExit').addEventListener('click', () => setZen(false));
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && root.classList.contains('zen')) setZen(false); });

  /* ---------- presets ---------- */
  document.querySelectorAll('.preset').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.preset === 'custom') { $('settingsBtn').click(); return; }
    const [f, s, l] = PRESETS[b.dataset.preset];
    Object.assign(S.settings, { focus: f, short: s, long: l });
    if (!S.timer.running) { S.timer.remaining = S.timer.total = dur(S.timer.mode); }
    save(); render(); renderTasks(); toast(t('presetSet', b.textContent.trim()));
  }));

  /* ---------- settings dialog ---------- */
  const fields = { setFocus: 'focus', setShort: 'short', setLong: 'long', setInterval: 'interval', setGoal: 'goal' };
  const toggles = { setAutoBreak: 'autoBreak', setAutoFocus: 'autoFocus', setSound: 'sound', setNotify: 'notify', setWake: 'wake' };
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
    if (S.settings[S.timer.mode] !== old[S.timer.mode]) { stopLoop(); S.timer.running = false; S.timer.endAt = null; S.timer.remaining = S.timer.total = dur(S.timer.mode); wake(false); ambientSync(); }
    if (!S.settings.wake) wake(false);
    save(); render(); renderTasks(); renderStats(); toast(t('saved'));
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
    S.days = {}; S.total = 0; S.log = []; resetArmed = false; e.target.textContent = t('resetStats');
    save(); renderStats(true); toast(t('statsCleared'));
  });

  /* ---------- controls ---------- */
  el.start.addEventListener('click', (e) => {
    const r = el.start.getBoundingClientRect(), w = document.createElement('span');
    w.className = 'ripple'; w.style.left = (e.clientX - r.left || r.width / 2) + 'px'; w.style.top = (e.clientY - r.top || r.height / 2) + 'px';
    el.start.appendChild(w); setTimeout(() => w.remove(), 700);
    toggle();
  });
  $('resetBtn').addEventListener('click', reset);
  $('skipBtn').addEventListener('click', () => next(false));
  $('plusBtn').addEventListener('click', () => addMinutes(1));
  $('minusBtn').addEventListener('click', () => addMinutes(-1));
  el.tabs.forEach((b) => b.addEventListener('click', () => { if (b.dataset.mode !== S.timer.mode) setMode(b.dataset.mode); }));
  $('langBtn').addEventListener('click', () => { S.lang = S.lang === 'he' ? 'en' : 'he'; save(); applyLang(); });
  $('themeBtn').addEventListener('click', () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; save(); applyTheme(); favLast = -1; paintTime(); });
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, dialog, [contenteditable="true"]') || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    else if (k === 'r') reset();
    else if (k === 's') next(false);
    else if (k === 'f') setZen(!root.classList.contains('zen'));
    else if (k === '+' || k === '=') addMinutes(1);
    else if (k === '-' || k === '_') addMinutes(-1);
    else if (k === 'n') { e.preventDefault(); if (root.classList.contains('zen')) setZen(false); $('taskInput').focus(); }
    else if (k === 'escape' && root.classList.contains('zen')) setZen(false);
  });
  addEventListener('resize', movePill);
  addEventListener('storage', (e) => { if (e.key === KEY) { S = load(); applyTheme(); applyLang(); if (S.timer.running) loop(); else stopLoop(); ambientSync(); } });

  /* ---------- boot ---------- */
  applyTheme(); applyLang();
  if (S.timer.running) {
    if (remaining() <= 0) { complete(true); toast(t('welcomeBack')); } else { loop(); wake(true); }
  }
  // the day can change while the page is open: refresh stats at midnight
  setInterval(() => { const k = dayKey(); if (k !== bootDay) { bootDay = k; renderStats(); } }, 60000);
  let bootDay = dayKey();
})();
