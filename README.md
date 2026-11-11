# QuizNova - Quiz or Trivia Website

**Course:** Web Technologies-1 (Frontend)  
**University:** Astana IT University  
**Group:** SE-2538  
**Topic:** Quiz or Trivia Website  
**Live Website:** https://aibergen74-create.github.io/webendterm/  
**GitHub Repository:** https://github.com/aibergen74-create/webendterm  

---

## Group Members & Contributions

| Student | Role | Midterm Contribution | Endterm Contribution |
|---|---|---|---|
| **Adilzhan Tolegen** | Form Validation & Base Setup | Project repository setup, base CSS styling, `index.html` structure. | Built `register.html`, wrote client-side validation logic in `script.js` (email regex check, password strength bar, password match verification, input feedback). |
| **Rassul Sissenbay** | Search & Filter Specialist | Designed `quizzes.html` layout, grid styling, and difficulty badges. | Added dynamic real-time search input and category filter buttons using jQuery `.on('input')` and click events with instant card filtering. |
| **Aibergen Amanzhol** | Leaderboard & CRUD Engineer | Created semantic leaderboard ranking table and score summary layout. | Built full CRUD operations on `leaderboard.html` (modal create, table read, modal edit, confirm delete) and linked with LocalStorage. |
| **Nassypkeliyev Yerassyl** | Gallery & Lightbox Specialist | Designed `contact.html` and mobile media queries for responsive layouts. | Implemented `gallery.html` with responsive image grid, custom lightbox modal with jQuery `.fadeIn()` / `.fadeOut()`, navigation arrows, and keyboard controls. |

---

## Short Description

QuizNova is an interactive web platform for trivia and quiz competitions. The website allows users to browse quizzes across multiple categories (Computer Science, Astana IT University, History, Science, Pop Culture), search quizzes in real time, play interactive tests, view and manage a dynamic high-score leaderboard, explore tournament photos in a fullscreen lightbox gallery, and register with client-side form validation.

---

## Features Implemented

1. **Form Validation (`register.html`)**
   - Required input checks for name, email, password, confirm password, and terms agreement.
   - Email format verification using Regular Expressions (RegEx).
   - Real-time password strength meter that changes color and width (weak, medium, strong).
   - Live password confirmation match check.
   - Form submission lock when inputs are invalid, with clear error messages.

2. **Dynamic Search & Filter (`quizzes.html`)**
   - Real-time search bar that filters quiz cards as the user types without page reload.
   - Category filter buttons (All, Computer Science, Astana IT, History, Science, Pop Culture).
   - Combined search and category filtering working simultaneously.
   - Case-insensitive search across quiz titles and descriptions.
   - Live counter of matching quizzes and empty result message if no matches found.

3. **Playable Interactive Quizzes (`quizzes.html`)**
   - Modal-based quiz engine for 6 different categories with 4 options each.
   - Immediate feedback on correct (green) and incorrect (red) answers.
   - Progress bar and final score calculation.
   - Direct integration allowing users to save their quiz score to the Leaderboard.

4. **Dynamic Table with CRUD Operations (`leaderboard.html`)**
   - **Create:** Add new player records via a Bootstrap modal dialog.
   - **Read:** Dynamic table rendering with automatic sorting by score and medals for Top 3.
   - **Update:** Edit existing players and scores via modal with pre-filled inputs.
   - **Delete:** Remove records with a browser confirmation prompt (`confirm`).
   - **LocalStorage:** All changes persist in browser storage.
   - Live table search by player name or category and a button to reset default sample data.

5. **Image Gallery with Lightbox (`gallery.html`)**
   - Responsive image gallery grid using HTML, CSS, and Bootstrap.
   - Custom lightbox overlay to enlarge images when clicked.
   - Navigation arrows (Next / Previous) to switch between photos.
   - Smooth jQuery transitions (`fadeIn`, `fadeOut`).
   - Keyboard navigation support (`Escape` to close, `ArrowLeft` / `ArrowRight` to navigate).

6. **General Layout & Responsive Design**
   - Flexbox navigation header across all pages.
   - Responsive CSS Grid and Bootstrap utilities for mobile, tablet, and desktop viewports.
   - Floating back-to-top button with smooth scroll animation.

---

## Technologies Used

- **HTML5:** Semantic elements (`header`, `nav`, `main`, `section`, `footer`, `table`, `form`)
- **CSS3:** Custom styles, CSS variables (`:root`), Flexbox, CSS Grid, media queries
- **Bootstrap 5.3:** Grid system, responsive utilities, modals, buttons, alerts
- **JavaScript (ES6):** DOM manipulation, regex validation, array methods, LocalStorage API
- **jQuery 3.7.1:** Event handling, DOM selection and manipulation, `.fadeIn()`, `.fadeOut()`, `.animate()`

---

## How to Run & Deploy

### Run Locally:
Open `index.html` in any browser or launch with Live Server in VS Code.

### Publish to GitHub Pages:
1. Push updates to the GitHub repository:
   ```bash
   git add .
   git commit -m "Complete Endterm enhancements"
   git push origin main
   ```
2. Open your repository on GitHub.
3. Go to **Settings** > **Pages**.
4. Under **Source**, choose branch `main` and folder `/ (root)`.
5. Click **Save**. The live URL will be active in 1-2 minutes:
   `https://aibergen74-create.github.io/webendterm/`
