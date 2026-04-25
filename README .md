# Lamar Alshehri – Personal Portfolio (Assignment 4)

**Student ID:** 202282400  
**Course:** SWE363 – Web Development  
**Assignment:** 4 – Complete Personal Web Application  
**Live Deployment:** [https://lamaralshehri.github.io/202282400-LamarAlshehri-assignment4/](https://lamaralshehri.github.io/202282400-LamarAlshehri-assignment4/)

---

## Project Description

A fully polished, production-quality personal portfolio website built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies. The site presents my background, projects, and skills in a professional and visually engaging way, and is designed to be shared with recruiters, collaborators, and peers.

This assignment builds directly on Assignment 3, extending it with a complete visual redesign, new sections, improved interaction patterns, and deployment to GitHub Pages.

### What makes this version different from Assignment 3

| Area | Assignment 3 | Assignment 4 |
|---|---|---|
| Background | Solid colour | Animated gradient, adapts to dark/light mode |
| Navbar | Opaque, name as text | 50% transparent with blur, logo image, centred nav links, icon-only social buttons |
| Hero | None | Full hero section with floating illustration and typewriter greeting |
| Skill tags | Embedded inside About Me | Standalone **Skill Set** section with its own nav link |
| Filter bar | Category buttons + separate level toggle in About | Unified Filter By dropdown (category + difficulty) + Sort By dropdown |
| Login feature | Modal login simulation | Removed; replaced with LinkedIn and GitHub nav links |
| Default sort | No default order | Alphabetical A → Z by default |

---

## File Structure

```
202282400-LamarAlshehri-assignment4/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── logo.png
│       ├── hero.png
│       ├── project1.png
│       ├── project2.png
│       ├── project3.png
│       ├── project4.png
│       └── project5.png
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides.pdf
│   └── demo-video.mp4
├── .gitignore
└── README.md
```

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/LamarAlshehri/202282400-LamarAlshehri-assignment4.git
   ```
2. Open the project folder:
   ```bash
   cd 202282400-LamarAlshehri-assignment4
   ```
3. Open `index.html` in any modern browser.

No installation, build step, server, or internet connection required for core features. The GitHub API section requires an internet connection to fetch live repository data.

---

## Features

| Feature | Details |
|---|---|
| Animated background | CSS `@keyframes` gradient shifts continuously; separate colour palettes for dark and light mode |
| Hero section | Floating illustration with CSS animation; typewriter greeting that types line by line and removes cursor on completion |
| Dark / Light mode | Toggle button in navbar; preference saved in `localStorage` |
| Transparent navbar | 50% opacity with `backdrop-filter: blur` for a glass effect |
| Logo | Image-based logo with text fallback via `onerror` handler |
| Centred navigation | CSS Grid (`1fr auto 1fr`) keeps nav links centred regardless of logo or control width |
| LinkedIn & GitHub links | Icon-only nav buttons linking to live profiles |
| Skill Set section | Dedicated section with hoverable skill tags; linked from navbar |
| Project filter | Single **Filter By** dropdown covering category (Web, Data, Desktop) and difficulty (Beginner, Advanced) |
| Project sort | **Sort By** dropdown; default is A → Z |
| Difficulty toggle | Pill buttons for All / Beginner / Advanced, now co-located with the filter bar under Projects |
| Search | Keyword search across title, description, and tags |
| Visit timer | Counts seconds/minutes on the current page load |
| GitHub API | Latest 6 public repos with loading spinner, error handling, and retry button |
| Contact form | Full client-side validation with blur events, character counter, and submit guard |
| Scroll animations | `IntersectionObserver` fade-in on all sections and cards |

---

## Deployment

Deployed via **GitHub Pages** from the `main` branch, root folder.  
Live URL: [https://lamaralshehri.github.io/202282400-LamarAlshehri-assignment4/](https://lamaralshehri.github.io/202282400-LamarAlshehri-assignment4/)

---

## AI Tools Summary

**Claude (Anthropic)** was the primary AI tool used throughout this assignment for code generation, debugging, CSS architecture, interaction design, and documentation drafting. All AI output was reviewed, tested, modified, and integrated manually.

See [`docs/ai-usage-report.md`](docs/ai-usage-report.md) for the full breakdown including specific use cases, benefits, challenges, and the review process applied to every AI-generated piece.

---

## Browser Compatibility

Tested on Chrome 124+, Firefox 125+, Safari 17+, Edge 124+.  
CSS vendor prefixes applied where needed (`-webkit-`, `-moz-`).
