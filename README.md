<p align="center">
  <a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="docs/readme/banner-en.svg" width="100%" alt="Pomodoro Timer: a bilingual timer with animations, tasks and stats"></a>
</p>

<p align="center"><a href="README.he.md"><img src="docs/readme/lang-he.svg" height="44" alt="לגרסה בעברית"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="https://img.shields.io/badge/Open_the_timer-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Open the timer"></a>
  <a href="app.js"><img src="https://img.shields.io/badge/Read_the_code-DAD5FF?style=for-the-badge&logo=javascript&logoColor=5548C8" alt="Read the code"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer/issues/new"><img src="https://img.shields.io/badge/Suggest_an_idea-D9F3E7?style=for-the-badge&logo=github&logoColor=1F7350" alt="Suggest an idea"></a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/NoyaAdivi/pomodoro-timer?color=DAD5FF&labelColor=5548C8" alt="License"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer/commits/main"><img src="https://img.shields.io/github/last-commit/NoyaAdivi/pomodoro-timer?color=FFD5C9&labelColor=A8483A" alt="Last commit"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer/search?l=javascript"><img src="https://img.shields.io/github/languages/top/NoyaAdivi/pomodoro-timer?color=D9F3E7&labelColor=1F7350" alt="Top language"></a>
  <a href="https://github.com/NoyaAdivi/pomodoro-timer"><img src="https://img.shields.io/github/repo-size/NoyaAdivi/pomodoro-timer?color=FBD5E0&labelColor=A03A5C" alt="Repo size"></a>
</p>

<h3 align="center">Focus. Rest. Repeat. A study timer that is actually fun to look at.</h3>

<p align="center">
  A Pomodoro timer in <b>pure JavaScript</b>, with smooth animations, a task list, daily stats and a weekly chart.<br>
  Everything is saved in <b>localStorage</b>, so a refresh never loses your timer, your tasks or your streak.
</p>

<table align="center">
  <tr>
    <td align="center" width="25%"><a href="#how-a-cycle-works"><b>🍅 25 · 5 · 15</b></a><br><sub>focus, short and long break</sub></td>
    <td align="center" width="25%"><a href="#saved-in-your-browser"><b>💾 0 servers</b></a><br><sub>all data stays in your browser</sub></td>
    <td align="center" width="25%"><a href="#see-it-in-action"><b>🌍 HE · EN</b></a><br><sub>fully bilingual, RTL ready</sub></td>
    <td align="center" width="25%"><a href="#keyboard-shortcuts"><b>⌨️ 3 keys</b></a><br><sub>Space, R and S</sub></td>
  </tr>
</table>

<a name="highlights"></a>
<p align="center"><a href="#see-it-in-action"><img src="docs/readme/highlights-en.svg" width="100%" alt="Highlights"></a></p>

<table>
  <tr valign="top">
    <td valign="top" width="33%">
      <p><b>⏱️ A timer you can trust</b></p>
      <ul>
        <li><b>Animated progress ring</b> with a moving dot and a soft breathing glow</li>
        <li><b>Accurate time:</b> counts down from an end timestamp, not from a counter, so it never drifts</li>
        <li><b>Survives a refresh:</b> close the tab, come back, and it continues where it was</li>
        <li><b>Auto rounds:</b> a long break after every 4 focus sessions (you choose the number)</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>📝 Tasks and stats</b></p>
      <ul>
        <li><b>Task list</b> with a pomodoro estimate for every task</li>
        <li><b>The selected task</b> gets +1 🍅 after each focus session and is marked done at its goal</li>
        <li><b>Daily stats:</b> pomodoros, focus minutes, total and a 🔥 day streak</li>
        <li><b>Weekly bar chart</b> of the last 7 days, with animated bars</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>💖 Made with care</b></p>
      <ul>
        <li><b>Hebrew and English</b> with one click, including full RTL layout</li>
        <li><b>Light and dark mode</b>, and every mode has its own pastel color</li>
        <li><b>Confetti</b>, a soft chime (Web Audio, no sound files) and browser notifications</li>
        <li><b>Accessible:</b> keyboard shortcuts, ARIA labels and support for reduced motion</li>
      </ul>
    </td>
  </tr>
</table>

<a name="see-it-in-action"></a>
<p align="center"><a href="#how-a-cycle-works"><img src="docs/readme/screens-en.svg" width="100%" alt="See it in action"></a></p>

<table>
  <tr>
    <td width="50%"><a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="docs/images/preview-en.png" width="100%" alt="Pomodoro Timer in English, dark mode"></a></td>
    <td width="50%"><a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="docs/images/preview-he.png" width="100%" alt="Pomodoro Timer in Hebrew, light mode"></a></td>
  </tr>
  <tr>
    <td align="center"><sub>English · dark mode</sub></td>
    <td align="center"><sub>עברית · light mode</sub></td>
  </tr>
</table>

<a name="how-a-cycle-works"></a>
<p align="center"><a href="#saved-in-your-browser"><img src="docs/readme/cycle-en.svg" width="100%" alt="How a cycle works"></a></p>

```mermaid
flowchart LR
  A([🍅 Focus<br/>25 min]) -->|rounds 1 to 3| B([☕ Short break<br/>5 min])
  B --> A
  A -->|round 4| C([🌿 Long break<br/>15 min])
  C -->|a new cycle starts| A
  style A fill:#FFE6DE,stroke:#E36E57,color:#2C2668
  style B fill:#D9F3E7,stroke:#1F7350,color:#1F4D38
  style C fill:#E8E4FF,stroke:#6F60F0,color:#2C2668
```

<p align="center"><sub>Every finished focus session is saved to your stats. All the times, the number of rounds and auto start can be changed in ⚙️ Settings.</sub></p>

<a name="saved-in-your-browser"></a>
<p align="center"><a href="#tech-stack"><img src="docs/readme/storage-en.svg" width="100%" alt="Saved in your browser"></a></p>

Everything lives under one key, `pomodoro-timer.v1`, in `localStorage`:

| Field | What it keeps |
|---|---|
| `timer` | Current mode, round, time left and the end timestamp of a running timer |
| `settings` | Minutes for each mode, rounds until a long break, auto start, sound, notifications |
| `tasks`, `activeTask` | Your tasks, their estimates and progress, and the selected task |
| `days`, `total` | Pomodoros and focus minutes per day, and the all time total |
| `lang`, `theme` | Hebrew or English, light or dark |

> [!TIP]
> Open the timer in two tabs: they stay in sync through the `storage` event.

<a name="tech-stack"></a>
<p align="center"><a href="#run-locally"><img src="docs/readme/stack-en.svg" width="100%" alt="Tech stack"></a></p>

<p align="center"><b>Core</b><br>
<a href="https://developer.mozilla.org/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-FFD5C9?style=for-the-badge&logo=html5&logoColor=A8483A" alt="HTML5"></a>
<a href="https://developer.mozilla.org/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-FFD5C9?style=for-the-badge&logo=css&logoColor=A8483A" alt="CSS3"></a>
<a href="https://developer.mozilla.org/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-FFD5C9?style=for-the-badge&logo=javascript&logoColor=A8483A" alt="JavaScript"></a>
</p>

<p align="center"><b>Browser APIs</b><br>
<a href="https://developer.mozilla.org/docs/Web/API/Window/localStorage"><img src="https://img.shields.io/badge/localStorage-DAD5FF?style=for-the-badge&logo=databricks&logoColor=5548C8" alt="localStorage"></a>
<a href="https://developer.mozilla.org/docs/Web/API/Web_Audio_API"><img src="https://img.shields.io/badge/Web_Audio-DAD5FF?style=for-the-badge&logo=audiomack&logoColor=5548C8" alt="Web Audio API"></a>
<a href="https://developer.mozilla.org/docs/Web/API/Notifications_API"><img src="https://img.shields.io/badge/Notifications-DAD5FF?style=for-the-badge&logo=googlechrome&logoColor=5548C8" alt="Notifications API"></a>
<a href="https://developer.mozilla.org/docs/Web/API/Intl"><img src="https://img.shields.io/badge/Intl-DAD5FF?style=for-the-badge&logo=googletranslate&logoColor=5548C8" alt="Intl API"></a>
</p>

<p align="center"><b>Ship</b><br>
<a href="https://pages.github.com"><img src="https://img.shields.io/badge/GitHub_Pages-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="GitHub Pages"></a>
</p>

<a name="keyboard-shortcuts"></a>
<details open>
<summary><b>⌨️ Keyboard shortcuts</b></summary>
<br>

| Key | Action |
|---|---|
| <kbd>Space</kbd> | Start or pause |
| <kbd>R</kbd> | Reset the current timer |
| <kbd>S</kbd> | Skip to the next mode |

</details>

<a name="run-locally"></a>
<p align="center"><a href="#contact"><img src="docs/readme/run-en.svg" width="100%" alt="Run it locally"></a></p>

1. Clone the project:
   ```bash
   git clone https://github.com/NoyaAdivi/pomodoro-timer.git
   ```
2. Open `index.html` in your browser. That's it, there is nothing to install.

<details>
<summary><b>📂 Project structure</b></summary>

```
├── index.html          the page: timer, tasks, stats and the settings dialog
├── style.css           pastel theme, animations, dark mode and RTL
├── app.js              timer logic, localStorage, tasks, stats, sound and translations
├── logo.svg            the app logo and favicon
└── docs/
    ├── images/         screenshots for this README
    └── readme/         animated banners and section headers
```
</details>

<a name="contact"></a>
<p align="center"><a href="https://www.linkedin.com/in/noya-adivi/"><img src="docs/readme/footer-en.svg" width="100%" alt="Built by Noya Adivi"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/pomodoro-timer/"><img src="https://img.shields.io/badge/Open_the_timer-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Open the timer"></a>
  <a href="https://www.linkedin.com/in/noya-adivi/"><img src="https://img.shields.io/badge/LinkedIn-DAD5FF?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzU1NDhDOCIgZD0iTTIwLjQ1IDIwLjQ1aC0zLjU2di01LjU3YzAtMS4zMy0uMDMtMy4wNC0xLjg1LTMuMDQtMS44NiAwLTIuMTQgMS40NS0yLjE0IDIuOTR2NS42N0g5LjM1VjloMy40MXYxLjU2aC4wNWMuNDgtLjkgMS42NC0xLjg1IDMuMzctMS44NSAzLjYgMCA0LjI3IDIuMzcgNC4yNyA1LjQ2djYuMjh6TTUuMzQgNy40M2EyLjA2IDIuMDYgMCAxIDEgMC00LjEzIDIuMDYgMi4wNiAwIDAgMSAwIDQuMTN6TTcuMTIgMjAuNDVIMy41NlY5aDMuNTZ2MTEuNDV6TTIyLjIyIDBIMS43N0MuNzkgMCAwIC43NyAwIDEuNzN2MjAuNTRDMCAyMy4yMy43OSAyNCAxLjc3IDI0aDIwLjQ1Yy45OCAwIDEuNzgtLjc3IDEuNzgtMS43M1YxLjczQzI0IC43NyAyMy4yIDAgMjIuMjIgMHoiLz48L3N2Zz4=" alt="LinkedIn"></a>
  <a href="https://noyaadivi.github.io/noya-website"><img src="https://img.shields.io/badge/Portfolio-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="Portfolio"></a>
  <a href="https://github.com/NoyaAdivi"><img src="https://img.shields.io/badge/More_projects-FBD5E0?style=for-the-badge&logo=github&logoColor=A03A5C" alt="More projects"></a>
</p>
