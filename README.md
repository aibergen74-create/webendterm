# QuizNova — Interactive Quiz & Trivia Platform

An interactive multi-page trivia and quiz web application built for **Web Technologies-1 (Frontend)** at **Astana IT University** (Group **SE-2538**).

- **Live Website:** [https://aibergen74-create.github.io/webendterm/](https://aibergen74-create.github.io/webendterm/)
- **Repository:** [https://github.com/aibergen74-create/webendterm](https://github.com/aibergen74-create/webendterm)

## Overview

QuizNova lets players explore curated trivia categories, play live API-powered quiz rounds, save and manage high scores in a dynamic leaderboard, browse tournament highlights in a lightbox gallery, and personalize their experience with persistent Light/Dark themes and player sessions.

## Pages & Project Structure

| File | Description |
| :--- | :--- |
| `index.html` | Landing page with hero banner, community stats, Fact of the Day API refresh, and 6-question jQuery FAQ accordion |
| `quizzes.html` | Quiz catalog with live search, category filters, modal quiz game, and Live Trivia Challenge (Open Trivia DB API) |
| `leaderboard.html` | Dynamic ranking table with full CRUD operations, search, sorting, and `localStorage` persistence |
| `gallery.html` | Responsive photo grid with custom jQuery lightbox, fade transitions, and keyboard navigation |
| `about.html` | Project summary, tech stack overview, and Group SE-2538 team profiles |
| `contact.html` | Contact page with a form to submit custom trivia question ideas |
| `signin.html` | Validated Sign-In form, persistent player profile view, and Sign-Out controls |
| `register.html` | Player registration form with email regex validation, password strength meter, and confirmation check |
| `css/style.css` | Shared design system with CSS variables, Flexbox, CSS Grid, responsive breakpoints, and Dark Theme styles |
| `js/script.js` | Application logic for theme toggle, auth sessions, FAQ accordion, API integration, quiz engine, CRUD, and lightbox |

## Key Features

- **Responsive Multi-Page Layout (HTML5 & CSS3):** 8 connected semantic pages with a shared Flexbox navigation bar, CSS Grid layouts, and responsive styling for desktop, tablet, and mobile screens.
- **Light / Dark Theme Toggle (`localStorage`):** Switch themes from the header on any page. The selected theme is stored in `localStorage` (`quiznova_theme`) and applied before page paint to stay consistent across reloads and navigation.
- **Player Sign-In & Sign-Out (`localStorage`):** Client-side form validation on `signin.html` stores non-sensitive session data (`quiznova_user`) in `localStorage`, displays a signed-in user badge and profile view, and clears the session on Sign Out.
- **Interactive FAQ Accordion (jQuery `.slideToggle()`):** 6 project-related questions on `index.html` with smooth sliding animations and `+` / `−` state indicators.
- **Live Public API Integration (`fetch()` & JSON):**
  - **Open Trivia Database API** on `quizzes.html` with category, difficulty, and question count filters, dynamic rendering, live scoring, leaderboard saving, and error/retry handling.
  - **Useless Facts API** on `index.html` for on-demand Fact of the Day updates with fallback error handling.
- **Quizzes, Leaderboard CRUD & Gallery:** Real-time quiz search and filtering, playable modal quizzes, full Create/Read/Update/Delete leaderboard backed by `localStorage`, and a keyboard-accessible photo lightbox.

## Team Members & Contributions

| Student | Role | Key Contributions |
| :--- | :--- | :--- |
| **Adilzhan Tolegen** | Team Lead & Auth / Validation | Repository setup, base layout, `register.html` validation (email regex, password strength meter), and `signin.html` + navbar Sign-In/Sign-Out session management with `localStorage`. |
| **Rassul Sissenbay** | Quizzes, Search & API Integration | `quizzes.html` catalog, live search and multi-category filtering, modal quiz engine, Open Trivia Database API (`fetch()` + JSON + error handling), and Fact of the Day API refresh. |
| **Aibergen Amanzhol** | Leaderboard CRUD & Theme System | Dynamic `leaderboard.html` table with Create, Read, Update, Delete operations and `localStorage`, plus site-wide Light/Dark Theme Toggle across all 8 pages. |
| **Nassypkeliyev Yerassyl** | Gallery, FAQ & Responsive Design | `contact.html`, responsive `gallery.html` with jQuery lightbox and keyboard controls, 6-question jQuery `.slideToggle()` FAQ accordion with `+` / `−` indicators, and responsive styling. |

## Technologies Used

- **HTML5:** Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`, `table`, `form`)
- **CSS3:** Custom properties (`:root`), Flexbox, CSS Grid, media queries, Light/Dark theme rules
- **Bootstrap 5.3:** Grid system, forms, modals, alerts, and native dark mode (`data-bs-theme`)
- **JavaScript (ES6):** `fetch()` API, JSON parsing, `localStorage`, DOM manipulation, RegEx validation
- **jQuery 3.7.1:** `.slideToggle()`, `.fadeIn()`, `.fadeOut()`, `.animate()`, event handling

## Running Locally & Deployment

1. Clone or download the repository and open `index.html` in a browser (or run it with VS Code Live Server).
2. Commit and push changes to the `main` branch before the submission deadline.
3. GitHub Pages publishes the site automatically from `main` (`/root`) at [https://aibergen74-create.github.io/webendterm/](https://aibergen74-create.github.io/webendterm/).
<img width="987" height="848" alt="image" src="https://github.com/user-attachments/assets/a52fef34-03f4-4cbb-a6ef-8fe85cfe99e4" />
<img width="1185" height="854" alt="image" src="https://github.com/user-attachments/assets/ff29c616-2177-4850-85ea-91757a68261e" />
<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/d4267141-8f78-42d2-b126-4d5a9fbb0b4f" />
<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/ee67660c-60e3-4370-9e0e-546382d7626b" />
<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/ea7a50af-6381-4caa-a5f3-39c10ae826d2" />
<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/a55126f1-dc6e-4b64-a982-ad4e9332d1b8" />

