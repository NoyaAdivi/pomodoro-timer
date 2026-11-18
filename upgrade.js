/* Pomodoro Timer · extra features: focus heatmap, achievements, floating mini timer, backup & restore */
(function () {
  'use strict';
  const KEY = 'pomodoro-timer.v1';
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);
  const he = () => root.lang === 'he';
  const L = {
    he: {
      heat: 'מפת הפוקוס שלי', heatSub: (n, d) => `${n} פומודורו ב־${d} ימים פעילים`, less: 'פחות', more: 'יותר',
      ach: 'הישגים', achSub: (a, b) => `${a} מתוך ${b} נפתחו`,
      pip: 'טיימר צף מעל כל החלונות', pipTitle: 'טיימר צף',
      backup: '💾 גיבוי לקובץ', restore: '📂 שחזור מגיבוי', restored: 'הגיבוי שוחזר בהצלחה', bad: 'הקובץ הזה לא נראה כמו גיבוי של הטיימר',
      sure: 'השחזור יחליף את כל הנתונים הנוכחיים. להמשיך?', locked: 'נעול', day: (n, d) => `${d}: ${n} פומודורו`,
      a: [
        ['🌱', 'צעד ראשון', 'לסיים פומודורו ראשון'],
        ['🔥', 'על הגל', '3 ימים ברצף'],
        ['🏆', 'יעד הושג', 'להגיע ליעד היומי'],
        ['⚡', 'יום חזק', '8 פומודורו ביום אחד'],
        ['🌙', 'ינשוף לילה', 'לסיים פומודורו אחרי 22:00'],
        ['🌅', 'ציפור מוקדמת', 'לסיים פומודורו לפני 08:00'],
        ['📚', 'עשרה כבר', '10 פומודורו בסך הכל'],
        ['💎', 'מאה!', '100 פומודורו בסך הכל'],
        ['✅', 'סוגרת משימות', 'להשלים 5 משימות'],
        ['🗓️', 'שבוע מושלם', '7 ימים ברצף']
      ]
    },
    en: {
      heat: 'My focus map', heatSub: (n, d) => `${n} pomodoros over ${d} active days`, less: 'Less', more: 'More',
      ach: 'Achievements', achSub: (a, b) => `${a} of ${b} unlocked`,
      pip: 'Floating timer above all windows', pipTitle: 'Floating timer',
      backup: '💾 Back up to file', restore: '📂 Restore backup', restored: 'Backup restored', bad: 'This file does not look like a timer backup',
      sure: 'Restoring replaces all your current data. Continue?', locked: 'Locked', day: (n, d) => `${d}: ${n} pomodoros`,
      a: [
        ['🌱', 'First step', 'Finish your first pomodoro'],
        ['🔥', 'On a roll', '3 days in a row'],
        ['🏆', 'Goal reached', 'Hit your daily goal'],
        ['⚡', 'Power day', '8 pomodoros in one day'],
        ['🌙', 'Night owl', 'Finish a pomodoro after 22:00'],
        ['🌅', 'Early bird', 'Finish a pomodoro before 08:00'],
        ['📚', 'Ten already', '10 pomodoros in total'],
        ['💎', 'One hundred!', '100 pomodoros in total'],
        ['✅', 'Task closer', 'Complete 5 tasks'],
        ['🗓️', 'Perfect week', '7 days in a row']
      ]
    }
  };
  const t = (k, ...a) => { const v = L[he() ? 'he' : 'en'][k]; return typeof v === 'function' ? v(...a) : v; };
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const key = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  /* ---------- build the new sections ---------- */
  const stats = $('statsCard');
  const exportBtn = $('exportBtn');
  const box = document.createElement('div');
  box.className = 'up-box';
  box.innerHTML = `
    <h3 class="week-title"><span data-up="heat"></span></h3>
    <div class="heat-wrap"><div class="heat" id="heat"></div></div>
    <div class="heat-foot"><span id="heatSub"></span><span class="heat-legend"><span data-up="less"></span><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><span data-up="more"></span></span></div>
    <h3 class="week-title"><span data-up="ach"></span> <small id="achSub" class="ach-sub"></small></h3>
    <div class="ach" id="ach"></div>`;
  stats.insertBefore(box, $('logList').previousElementSibling);

  const backup = document.createElement('div');
  backup.className = 'backup-row';
  backup.innerHTML = '<button class="text-btn" id="backupBtn" type="button" data-up="backup"></button><button class="text-btn" id="restoreBtn" type="button" data-up="restore"></button><input type="file" id="restoreFile" accept="application/json" hidden>';
  exportBtn.insertAdjacentElement('afterend', backup);

  /* ---------- heatmap: last 18 weeks ---------- */
  function renderHeat(S) {
    const days = S.days || {};
    const weeks = innerWidth < 520 ? 12 : 18;
    const end = new Date(); end.setHours(0, 0, 0, 0);
    const start = new Date(end); start.setDate(end.getDate() - end.getDay() - (weeks - 1) * 7);
    const fmt = new Intl.DateTimeFormat(he() ? 'he-IL' : 'en-US', { day: 'numeric', month: 'short' });
    const goal = (S.settings && S.settings.goal) || 8;
    let html = '', total = 0, active = 0;
    for (let d = new Date(start), i = 0; d <= end; d.setDate(d.getDate() + 1), i++) {
      const n = (days[key(d)] || {}).sessions || 0;
      total += n; if (n) active++;
      const lvl = n === 0 ? 0 : n >= goal ? 4 : Math.min(3, Math.ceil((n / goal) * 3));
      const today = d.getTime() === end.getTime() ? ' today' : '';
      html += `<i class="l${lvl}${today}" style="--i:${i}" title="${t('day', n, fmt.format(d))}"></i>`;
    }
    $('heat').innerHTML = html;
    $('heat').style.setProperty('--weeks', weeks);
    $('heatSub').textContent = t('heatSub', total, active);
  }

  /* ---------- achievements ---------- */
  function streak(days) {
    let best = 0, cur = 0;
    Object.keys(days).filter((k) => days[k].sessions > 0).sort().forEach((k, i, arr) => {
      if (i && (new Date(k) - new Date(arr[i - 1])) / 864e5 === 1) cur++; else cur = 1;
      best = Math.max(best, cur);
    });
    return best;
  }
  let firstPaint = true, unlockedBefore = null;
  function renderAch(S) {
    const days = S.days || {}, log = S.log || [], vals = Object.values(days);
    const goal = (S.settings && S.settings.goal) || 8;
    const st = streak(days), hours = log.map((x) => new Date(x.at).getHours());
    const ok = [
      (S.total || 0) >= 1, st >= 3, vals.some((d) => d.sessions >= goal), vals.some((d) => d.sessions >= 8),
      hours.some((h) => h >= 22), hours.some((h) => h < 8), (S.total || 0) >= 10, (S.total || 0) >= 100,
      (S.tasks || []).filter((x) => x.done).length >= 5, st >= 7
    ];
    const list = L[he() ? 'he' : 'en'].a;
    $('ach').innerHTML = list.map((a, i) => `<div class="badge${ok[i] ? ' on' : ''}" style="--i:${i}" title="${a[1]}: ${a[2]}${ok[i] ? '' : ' (' + t('locked') + ')'}"><span class="b-ico">${ok[i] ? a[0] : '🔒'}</span><b>${a[1]}</b><small>${a[2]}</small></div>`).join('');
    const count = ok.filter(Boolean).length;
    $('achSub').textContent = t('achSub', count, ok.length);
    if (!firstPaint && unlockedBefore !== null) {
      ok.forEach((v, i) => { if (v && !unlockedBefore[i]) { const b = $('ach').children[i]; b.classList.add('new'); popToast(`${list[i][0]} ${list[i][1]}!`); } });
    }
    unlockedBefore = ok; firstPaint = false;
  }

  function popToast(msg) {
    const el = $('toast'); if (!el) return;
    el.textContent = msg; el.classList.add('show');
    clearTimeout(popToast.t); popToast.t = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function renderAll() {
    const S = read();
    document.querySelectorAll('[data-up]').forEach((n) => { n.textContent = t(n.dataset.up); });
    renderHeat(S); renderAch(S);
    if (pipBtn) { pipBtn.title = t('pip'); pipBtn.setAttribute('aria-label', t('pip')); }
  }

  /* ---------- floating mini timer (Document Picture-in-Picture) ---------- */
  let pipBtn = null, pipWin = null;
  if ('documentPictureInPicture' in window) {
    pipBtn = document.createElement('button');
    pipBtn.className = 'icon-btn'; pipBtn.id = 'pipBtn'; pipBtn.type = 'button'; pipBtn.textContent = '🪟';
    document.querySelector('.top-actions').prepend(pipBtn);
    pipBtn.addEventListener('click', async () => {
      if (pipWin) { pipWin.close(); return; }
      try {
        pipWin = await documentPictureInPicture.requestWindow({ width: 260, height: 200 });
      } catch (e) { return; }
      const d = pipWin.document;
      d.documentElement.lang = root.lang; d.documentElement.dir = root.dir;
      const a = getComputedStyle(root);
      d.head.innerHTML = `<title>${t('pipTitle')}</title><style>
        body{margin:0;height:100vh;display:grid;place-items:center;font-family:Rubik,system-ui,sans-serif;color:${a.getPropertyValue('--ink')};
        background:linear-gradient(135deg,${a.getPropertyValue('--bg1')},${a.getPropertyValue('--bg2')} 60%,${a.getPropertyValue('--bg3')})}
        .w{text-align:center}.m{font-weight:700;opacity:.75}.t{font-size:3.4rem;font-weight:800;color:${a.getPropertyValue('--deep')};letter-spacing:1px;margin:2px 0 10px}
        button{border:0;border-radius:999px;padding:10px 26px;font:700 1rem Rubik,system-ui,sans-serif;color:#fff;cursor:pointer;
        background:linear-gradient(135deg,${a.getPropertyValue('--a')},${a.getPropertyValue('--a2')});box-shadow:0 8px 20px rgba(0,0,0,.15)}
        button:hover{transform:translateY(-2px)}</style>`;
      d.body.innerHTML = '<div class="w"><div class="m" id="m"></div><div class="t" id="t"></div><button id="b"></button></div>';
      const sync = () => {
        d.getElementById('t').textContent = $('time').textContent;
        d.getElementById('m').textContent = $('modeTitle').textContent;
        d.getElementById('b').textContent = $('startLabel').textContent;
      };
      sync();
      d.getElementById('b').addEventListener('click', () => $('startBtn').click());
      const mo = new MutationObserver(sync);
      [$('time'), $('modeTitle'), $('startLabel')].forEach((n) => mo.observe(n, { childList: true, characterData: true, subtree: true }));
      pipBtn.classList.add('on');
      pipWin.addEventListener('pagehide', () => { mo.disconnect(); pipWin = null; pipBtn.classList.remove('on'); });
    });
  }

  /* ---------- backup & restore ---------- */
  $('backupBtn').addEventListener('click', () => {
    const blob = new Blob([localStorage.getItem(KEY) || '{}'], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `pomodoro-backup-${key(new Date())}.json`;
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $('restoreBtn').addEventListener('click', () => $('restoreFile').click());
  $('restoreFile').addEventListener('change', async (e) => {
    const f = e.target.files[0]; e.target.value = '';
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!data || typeof data !== 'object' || !('days' in data || 'settings' in data)) throw new Error();
      if (!confirm(t('sure'))) return;
      localStorage.setItem(KEY, JSON.stringify(data));
      sessionStorage.setItem('pomo-restored', '1');
      location.reload();
    } catch (err) { popToast(t('bad')); }
  });
  if (sessionStorage.getItem('pomo-restored')) { sessionStorage.removeItem('pomo-restored'); setTimeout(() => popToast(t('restored')), 600); }

  /* ---------- keep in sync with the app ---------- */
  renderAll();
  let pending;
  const later = () => { clearTimeout(pending); pending = setTimeout(renderAll, 150); };
  new MutationObserver(later).observe(root, { attributes: true, attributeFilter: ['lang'] });
  ['statTotal', 'statToday', 'taskList'].forEach((id) => { const n = $(id); if (n) new MutationObserver(later).observe(n, { childList: true, characterData: true, subtree: true }); });
  let w = innerWidth; addEventListener('resize', () => { if ((innerWidth < 520) !== (w < 520)) { w = innerWidth; later(); } });
})();
