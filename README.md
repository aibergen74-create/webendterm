# QuizNova - Quiz or Trivia Website

**Course:** Web Technologies-1 (Frontend)  
**University:** Astana IT University  
**Group:** SE-2538  
**Topic:** Quiz or Trivia Website  
**Live Website:** https://aibergen74-create.github.io/webendterm/  
**GitHub Repository:** https://github.com/aibergen74-create/webendterm  

---

## Group Members & Contributions

| Student | Role | Midterm & Endterm Contribution | Final Project Contribution |
|---|---|---|---|
| **Adilzhan Tolegen** | Team Lead & Auth / Validation | Repository setup, base CSS, `index.html`, `register.html` with email regex validation, password strength meter, and real-time feedback. | Implemented Sign-in / Sign-out functionality (`signin.html` and navbar session UI) using `localStorage`, form validation, and signed-in player profile view. |
| **Rassul Sissenbay** | Quizzes, Search & API Integration | Built `quizzes.html` catalog, interactive modal quiz engine, real-time search, and multi-category filter buttons. | Integrated the Open Trivia Database API (`fetch()` + JSON) on `quizzes.html` with category/difficulty/count selectors, dynamic question rendering, live scoring, and error handling; added random fact refresh API on `index.html`. |
| **Aibergen Amanzhol** | Leaderboard CRUD & Theme System | Built dynamic `leaderboard.html` table with Create, Read, Update, Delete operations, confirmation prompts, and `localStorage` persistence. | Implemented the site-wide Light/Dark Theme Toggle saved in `localStorage` across all pages with Bootstrap 5.3 dark theme integration and custom CSS variables. |
| **Nassypkeliyev Yerassyl** | Gallery, FAQ & Responsive Design | Built `contact.html`, responsive media queries, and `gallery.html` with custom lightbox using jQuery `.fadeIn()` / `.fadeOut()` and keyboard navigation. | Implemented the 6-question FAQ accordion on `index.html` using jQuery `.slideToggle()` with smooth animations and `+` / `−` state indicators, and verified responsive layout across devices. |

---

## Project Description

QuizNova is a multi-page interactive trivia and quiz web platform built with HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6), and jQuery 3.7.1. Users can switch between Light and Dark themes, register and sign in with persistent browser sessions, play both curated and live API-powered trivia quizzes, manage scores in a CRUD leaderboard, browse a photo lightbox gallery, and explore answers in an interactive FAQ accordion.

---

## Implemented Features

1. **HTML5 & Responsive CSS3 (8 Connected Pages)**
   - Pages: `index.html`, `quizzes.html`, `leaderboard.html`, `gallery.html`, `about.html`, `contact.html`, `signin.html`, `register.html`.
   - Shared Flexbox navigation bar across all pages, CSS Grid layouts, custom CSS variables, and responsive breakpoints for desktop, tablet, and mobile devices.

2. **Light / Dark Theme Toggle (`localStorage`)**
   - Theme toggle button in the navigation bar on every page.
   - Persists theme selection in `localStorage` (`quiznova_theme`) and applies it immediately on page load across the entire site.

3. **Sign-in & Sign-out Functionality (`localStorage`)**
   - Dedicated `signin.html` page with client-side email and password validation.
   - Saves non-sensitive user session info (display name, email, login time) in `localStorage` (`quiznova_user`) and keeps users signed in after page refresh.
   - Dynamically updates the navbar to display the signed-in player badge and a Sign Out button that clears the session.

4. **jQuery FAQ Accordion (`.slideToggle()`)**
   - 6 project-related questions on `index.html` (`#faq`).
   - Smooth sliding open/close animation using jQuery `.slideToggle()` with `+` / `−` visual indicators.

5. **Public API Integration (`fetch()` + JSON)**
   - **Open Trivia Database API** on `quizzes.html`: dynamically fetches JSON trivia questions with user controls for category, difficulty, question count, and refresh, plus full error handling and retry support.
   - **Useless Facts API** on `index.html`: allows users to refresh the Fact of the Day dynamically with error fallback.

6. **Endterm Core Features**
   - Client-side registration validation with email regex and password strength bar (`register.html`).
   - Live quiz search, category filters, and playable modal quizzes (`quizzes.html`).
   - Full Leaderboard CRUD with `localStorage` (`leaderboard.html`).
   - Responsive photo gallery with jQuery lightbox and keyboard controls (`gallery.html`).

---

## Technologies Used

- **HTML5** — semantic structure (`header`, `nav`, `main`, `section`, `footer`, `table`, `form`)
- **CSS3** — CSS variables, Flexbox, Grid, responsive media queries, Light/Dark theme styles
- **Bootstrap 5.3** — responsive grid, modals, alerts, forms, native dark theme support
- **JavaScript** — `fetch()` API, JSON parsing, `localStorage`, DOM manipulation, regex validation
- **jQuery 3.7.1** — `.slideToggle()`, `.fadeIn()`, `.fadeOut()`, `.animate()`, event handling

---

## How to Run & Deploy

1. Open `index.html` locally in a browser or using VS Code Live Server.
2. Push all files to the `main` branch of `https://github.com/aibergen74-create/webendterm` before the LMS deadline.
3. GitHub Pages automatically serves the live site at `https://aibergen74-create.github.io/webendterm/`.
