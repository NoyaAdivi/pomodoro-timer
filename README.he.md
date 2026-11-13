<div dir="rtl">

<p align="center">
  <a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="docs/readme/banner-he.svg" width="100%" alt="Pomodoro Timer: טיימר דו לשוני עם אנימציות, משימות וסטטיסטיקות"></a>
</p>

<p align="center"><a href="README.md"><img src="docs/readme/lang-en.svg" height="44" alt="English version"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="https://img.shields.io/badge/לפתיחת_הטיימר-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="לפתיחת הטיימר"></a>
  <a href="app.js"><img src="https://img.shields.io/badge/לקריאת_הקוד-DAD5FF?style=for-the-badge&logo=javascript&logoColor=5548C8" alt="לקריאת הקוד"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer/issues/new"><img src="https://img.shields.io/badge/להציע_רעיון-D9F3E7?style=for-the-badge&logo=github&logoColor=1F7350" alt="להציע רעיון"></a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/NoyaAdivi/pomodoro-timer?color=DAD5FF&labelColor=5548C8" alt="רישיון"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer/commits/main"><img src="https://img.shields.io/github/last-commit/NoyaAdivi/pomodoro-timer?color=FFD5C9&labelColor=A8483A" alt="עדכון אחרון"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer/search?l=javascript"><img src="https://img.shields.io/github/languages/top/NoyaAdivi/pomodoro-timer?color=D9F3E7&labelColor=1F7350" alt="שפה עיקרית"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer"><img src="https://img.shields.io/github/repo-size/NoyaAdivi/pomodoro-timer?color=FBD5E0&labelColor=A03A5C" alt="גודל המאגר"></a>
</p>

<h3 align="center">להתרכז. לנוח. לחזור על זה. טיימר ללמידה שבאמת כיף להסתכל עליו.</h3>

<p align="center">
  טיימר פומודורו ב־<b>JavaScript נקי</b>, עם אנימציות חלקות, רשימת משימות, סטטיסטיקה יומית וגרף שבועי.<br>
  הכל נשמר ב־<b>localStorage</b>, כך שרענון של הדף אף פעם לא מוחק את הטיימר, המשימות או הרצף שלך.
</p>

<table align="center">
  <tr>
    <td align="center" width="25%"><a href="#how-a-cycle-works"><b>🍅 25 · 5 · 15</b></a><br><sub>פוקוס, הפסקה קצרה וארוכה</sub></td>
    <td align="center" width="25%"><a href="#saved-in-your-browser"><b>💾 0 שרתים</b></a><br><sub>כל המידע נשאר בדפדפן</sub></td>
    <td align="center" width="25%"><a href="#see-it-in-action"><b>🌍 HE · EN</b></a><br><sub>דו לשוני לגמרי, כולל RTL</sub></td>
    <td align="center" width="25%"><a href="#keyboard-shortcuts"><b>⌨️ 3 מקשים</b></a><br><sub>רווח, R ו־S</sub></td>
  </tr>
</table>

<a name="highlights"></a>
<p align="center"><a href="#see-it-in-action"><img src="docs/readme/highlights-he.svg" width="100%" alt="מה מיוחד כאן"></a></p>

<table dir="rtl">
  <tr valign="top">
    <td valign="top" width="33%">
      <p><b>⏱️ טיימר שאפשר לסמוך עליו</b></p>
      <ul>
        <li><b>טבעת התקדמות מונפשת</b> עם נקודה שזזה וזוהר רך שנושם</li>
        <li><b>זמן מדויק:</b> סופר לאחור מחותמת זמן של הסיום ולא ממונה, אז הוא לא זז</li>
        <li><b>שורד רענון:</b> סוגרים את הלשונית, חוזרים, והוא ממשיך מאיפה שהיה</li>
        <li><b>סבבים אוטומטיים:</b> הפסקה ארוכה אחרי כל 4 סבבי פוקוס (את בוחרת את המספר)</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>📝 משימות וסטטיסטיקה</b></p>
      <ul>
        <li><b>רשימת משימות</b> עם הערכה של כמה פומודורו כל משימה תיקח</li>
        <li><b>המשימה שנבחרה</b> מקבלת 🍅 אחרי כל סבב פוקוס ומסומנת כהושלמה כשמגיעים ליעד</li>
        <li><b>סטטיסטיקה יומית:</b> פומודורו, דקות פוקוס, סך הכל ורצף ימים 🔥</li>
        <li><b>גרף עמודות שבועי</b> של 7 הימים האחרונים, עם עמודות מונפשות</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>💖 נבנה באהבה</b></p>
      <ul>
        <li><b>עברית ואנגלית</b> בלחיצה אחת, כולל פריסת RTL מלאה</li>
        <li><b>מצב בהיר וכהה</b>, ולכל מצב בטיימר יש צבע פסטל משלו</li>
        <li><b>קונפטי</b>, צליל עדין (Web Audio, בלי קובצי סאונד) והתראות בדפדפן</li>
        <li><b>נגיש:</b> קיצורי מקלדת, תוויות ARIA ותמיכה בהפחתת תנועה</li>
      </ul>
    </td>
  </tr>
</table>

<a name="see-it-in-action"></a>
<p align="center"><a href="#how-a-cycle-works"><img src="docs/readme/screens-he.svg" width="100%" alt="ככה זה נראה"></a></p>

<table dir="rtl">
  <tr>
    <td width="50%"><a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="docs/images/preview-he.png" width="100%" alt="Pomodoro Timer בעברית, מצב בהיר"></a></td>
    <td width="50%"><a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="docs/images/preview-en.png" width="100%" alt="Pomodoro Timer באנגלית, מצב בהיר"></a></td>
  </tr>
  <tr>
    <td align="center"><sub>עברית · מצב בהיר</sub></td>
    <td align="center"><sub>English · מצב בהיר</sub></td>
  </tr>
</table>

<a name="how-a-cycle-works"></a>
<p align="center"><a href="#saved-in-your-browser"><img src="docs/readme/cycle-he.svg" width="100%" alt="איך עובד סבב"></a></p>

```mermaid
flowchart RL
  A([🍅 פוקוס<br/>25 דקות]) -->|סבבים 1 עד 3| B([☕ הפסקה קצרה<br/>5 דקות])
  B --> A
  A -->|סבב 4| C([🌿 הפסקה ארוכה<br/>15 דקות])
  C -->|מתחיל סבב חדש| A
  style A fill:#FFE6DE,stroke:#E36E57,color:#2C2668
  style B fill:#D9F3E7,stroke:#1F7350,color:#1F4D38
  style C fill:#E8E4FF,stroke:#6F60F0,color:#2C2668
```

<p align="center"><sub>כל סבב פוקוס שמסתיים נשמר בסטטיסטיקה. את כל הזמנים, מספר הסבבים וההתחלה האוטומטית אפשר לשנות ב־⚙️ הגדרות.</sub></p>

<a name="saved-in-your-browser"></a>
<p align="center"><a href="#tech-stack"><img src="docs/readme/storage-he.svg" width="100%" alt="נשמר בדפדפן"></a></p>

הכל נשמר תחת מפתח אחד, `pomodoro-timer.v1`, ב־`localStorage`:

| שדה | מה נשמר בו |
|---|---|
| `timer` | המצב הנוכחי, הסבב, הזמן שנשאר וחותמת הזמן של הסיום כשהטיימר רץ |
| `settings` | דקות לכל מצב, סבבים עד הפסקה ארוכה, התחלה אוטומטית, צליל והתראות |
| `tasks`, `activeTask` | המשימות, ההערכות וההתקדמות שלהן, והמשימה שנבחרה |
| `days`, `total` | פומודורו ודקות פוקוס לכל יום, וסך הכל מאז ומעולם |
| `lang`, `theme` | עברית או אנגלית, בהיר או כהה |

> [!TIP]
> אפשר לפתוח את הטיימר בשתי לשוניות: הן נשארות מסונכרנות בעזרת האירוע `storage`.

<a name="tech-stack"></a>
<p align="center"><a href="#run-locally"><img src="docs/readme/stack-he.svg" width="100%" alt="טכנולוגיות"></a></p>

<p align="center"><b>בסיס</b><br>
<a href="https://developer.mozilla.org/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-FFD5C9?style=for-the-badge&logo=html5&logoColor=A8483A" alt="HTML5"></a>
<a href="https://developer.mozilla.org/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-FFD5C9?style=for-the-badge&logo=css&logoColor=A8483A" alt="CSS3"></a>
<a href="https://developer.mozilla.org/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-FFD5C9?style=for-the-badge&logo=javascript&logoColor=A8483A" alt="JavaScript"></a>
</p>

<p align="center"><b>ממשקי דפדפן</b><br>
<a href="https://developer.mozilla.org/docs/Web/API/Window/localStorage"><img src="https://img.shields.io/badge/localStorage-DAD5FF?style=for-the-badge&logo=databricks&logoColor=5548C8" alt="localStorage"></a>
<a href="https://developer.mozilla.org/docs/Web/API/Web_Audio_API"><img src="https://img.shields.io/badge/Web_Audio-DAD5FF?style=for-the-badge&logo=audiomack&logoColor=5548C8" alt="Web Audio API"></a>
<a href="https://developer.mozilla.org/docs/Web/API/Notifications_API"><img src="https://img.shields.io/badge/Notifications-DAD5FF?style=for-the-badge&logo=googlechrome&logoColor=5548C8" alt="Notifications API"></a>
<a href="https://developer.mozilla.org/docs/Web/API/Intl"><img src="https://img.shields.io/badge/Intl-DAD5FF?style=for-the-badge&logo=googletranslate&logoColor=5548C8" alt="Intl API"></a>
</p>

<p align="center"><b>העלאה לאוויר</b><br>
<a href="https://pages.github.com"><img src="https://img.shields.io/badge/GitHub_Pages-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="GitHub Pages"></a>
</p>

<a name="keyboard-shortcuts"></a>
<details open>
<summary><b>⌨️ קיצורי מקלדת</b></summary>
<br>

| מקש | פעולה |
|---|---|
| <kbd>Space</kbd> | התחלה או עצירה |
| <kbd>R</kbd> | איפוס הטיימר הנוכחי |
| <kbd>S</kbd> | דילוג למצב הבא |

</details>

<a name="run-locally"></a>
<p align="center"><a href="#contact"><img src="docs/readme/run-he.svg" width="100%" alt="הרצה מקומית"></a></p>

1. מורידים את הפרויקט:
   ```bash
   git clone https://github.com/NoyaAdivi/pomodoro-timer.git
   ```
2. פותחים את `index.html` בדפדפן. זהו, אין מה להתקין.

<details>
<summary><b>📂 מבנה הפרויקט</b></summary>

```
├── index.html          הדף: טיימר, משימות, סטטיסטיקה וחלון ההגדרות
├── style.css           עיצוב פסטל, אנימציות, מצב כהה ו־RTL
├── app.js              לוגיקת הטיימר, localStorage, משימות, סטטיסטיקה, צליל ותרגומים
├── logo.svg            הלוגו והאייקון של הלשונית
└── docs/
    ├── images/         צילומי מסך ל־README
    └── readme/         באנרים וכותרות מונפשים
```
</details>

<a name="contact"></a>
<p align="center"><a href="https://www.linkedin.com/in/noya-adivi/"><img src="docs/readme/footer-he.svg" width="100%" alt="נוצר על ידי נויה אדיבי"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="https://img.shields.io/badge/לפתיחת_הטיימר-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="לפתיחת הטיימר"></a>
  <a href="https://www.linkedin.com/in/noya-adivi/"><img src="https://img.shields.io/badge/LinkedIn-DAD5FF?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzU1NDhDOCIgZD0iTTIwLjQ1IDIwLjQ1aC0zLjU2di01LjU3YzAtMS4zMy0uMDMtMy4wNC0xLjg1LTMuMDQtMS44NiAwLTIuMTQgMS40NS0yLjE0IDIuOTR2NS42N0g5LjM1VjloMy40MXYxLjU2aC4wNWMuNDgtLjkgMS42NC0xLjg1IDMuMzctMS44NSAzLjYgMCA0LjI3IDIuMzcgNC4yNyA1LjQ2djYuMjh6TTUuMzQgNy40M2EyLjA2IDIuMDYgMCAxIDEgMC00LjEzIDIuMDYgMi4wNiAwIDAgMSAwIDQuMTN6TTcuMTIgMjAuNDVIMy41NlY5aDMuNTZ2MTEuNDV6TTIyLjIyIDBIMS43N0MuNzkgMCAwIC43NyAwIDEuNzN2MjAuNTRDMCAyMy4yMy43OSAyNCAxLjc3IDI0aDIwLjQ1Yy45OCAwIDEuNzgtLjc3IDEuNzgtMS43M1YxLjczQzI0IC43NyAyMy4yIDAgMjIuMjIgMHoiLz48L3N2Zz4=" alt="LinkedIn"></a>
  <a href="https://noyaadivi.github.io/noya-website"><img src="https://img.shields.io/badge/תיק_עבודות-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="תיק עבודות"></a>
  <a href="https://github.com/NoyaAdivi"><img src="https://img.shields.io/badge/עוד_פרויקטים-FBD5E0?style=for-the-badge&logo=github&logoColor=A03A5C" alt="עוד פרויקטים"></a>
</p>

</div>
