# Lamar Alshehri – Portfolio (Assignment 3)

**Student ID:** 202282400  
**Course:** Web Development  
**Assignment:** 3 – Advanced Functionality  

Built on top of Assignment 2. This assignment extends the portfolio with API integration, complex logic, state management, performance optimisations, and enhanced documentation.

---

## File Structure
202282400-LamarAlshehri-assignment3/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── .gitignore
└── README.md

---

## Setup Instructions

1. Clone or download the repository.
2. Open `index.html` in any modern browser.
3. No build step, server, or dependencies required — everything runs client-side.

### GitHub Pages deployment

1. Push to GitHub.
2. Go to **Settings → Pages**, set source to `main` branch, root folder.
3. Site will be live at `https://<username>.github.io/<repo>/`.

---

## Features

| Feature | Details |
|---|---|
| Dark / Light mode | Toggle button in navbar; preference saved in `localStorage` |
| Time-based greeting | Changes with the hour (morning / afternoon / evening / night) |
| Scroll animations | `IntersectionObserver` fade-in for all sections and cards |
| Project filter + search | Filter by category (Web / Desktop / Data) and keyword search |
| Project sort | Sort by name A→Z, Z→A, newest first, or oldest first |
| Experience level toggle | Conditional content: Beginner / Advanced / All |
| Visit timer | Counts seconds/minutes the visitor has been on the page |
| Login / Logout simulation | Modal collects visitor name; stored in `localStorage` |
| GitHub API | Latest 6 public repos with error handling and retry |
| Enhanced contact form | Subject field, character counter, stronger validation rules |

---

## AI Use Summary

Claude (Anthropic) was used for code generation, debugging, and documentation drafting. All output was reviewed, tested, and adapted. See `docs/ai-usage-report.md` for the full breakdown.

---

## Browser Compatibility

Tested on Chrome 124+, Firefox 125+, Safari 17+, Edge 124+.  
CSS vendor prefixes applied where needed (`-webkit-`, `-ms-`).