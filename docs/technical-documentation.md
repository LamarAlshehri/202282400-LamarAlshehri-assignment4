# Technical Documentation – Assignment 3

**Student:** Lamar Alshehri (202282400)  
**Assignment:** 3 – Advanced Functionality

---

## 1. Architecture Overview

Single-page portfolio — plain HTML, CSS, and JavaScript, no build tools or frameworks.

Browser
└── index.html
├── css/styles.css     Visual layer (variables, dark mode, layout, responsive)
└── js/script.js       Logic layer (state, API, DOM manipulation)

---

## 2. Feature Implementation Details

### 2.1 Theme Toggle (A2 carry-over)

- `localStorage.setItem("theme", "dark" | "light")` persists preference.
- On load, `localStorage.getItem("theme")` is read; `body.dark` class applied.
- CSS variables under `body.dark` override the `:root` defaults — zero code duplication.

### 2.2 Project Sort

- Each project card carries `data-date="YYYY-MM"` for date sorting.
- `applySortOrder()` collects all `.card` elements into an array, sorts with `.sort()`, then re-appends them to `#projectGrid` — O(n log n) and imperceptible for small lists.
- Sort is called at the end of `filterProjects()` so category, level, and search are all applied before ordering.

### 2.3 Experience Level Toggle (conditional content)

- Cards carry `data-level="beginner"` or `data-level="advanced"`.
- Clicking a level button updates `activeLevel` and calls `filterProjects()`.
- `filterProjects()` checks `matchesCategory && matchesLevel && matchesQuery` simultaneously — no separate pass needed.

### 2.4 Visit Timer

- `setInterval` fires every 1000 ms, incrementing `secondsOnSite`.
- `formatTime()` converts to `Ns` or `Nm Ns` format.
- Resets on every page load — measures the current visit only.

### 2.5 Login / Logout Simulation + Visitor Name Persistence

- Runtime state: `isLoggedIn` boolean.
- Persistence: `localStorage.setItem("visitorName", name)` on login; `removeItem` on logout.
- On load, `localStorage.getItem("visitorName")` is checked; if present, `setLoggedIn()` restores the session.
- Modal closes on: Cancel button, overlay click, Escape key.
- `setLoggedIn()` also personalises the time-based greeting by injecting the visitor's name.
- Name validation: required, ≥ 2 chars, letters only (English + Arabic via `\u0600-\u06FF`).

### 2.6 Enhanced Contact Form

Fields and rules:

| Field   | Rules                                        |
|---------|----------------------------------------------|
| Name    | Required; ≥ 2 chars; letters only (EN + AR)  |
| Email   | Required; RFC-5322 simplified regex           |
| Subject | Required; ≥ 3 chars                          |
| Message | Required; ≥ 20 chars; ≤ 500 chars            |

- Blur validation fires per-field as the user moves away.
- Character counter updates on every `input` event; turns amber at 85% of limit, red when over.
- On submit, all four fields re-validate; first invalid field receives `.focus()`.
- `aria-invalid="true"` set on invalid fields; removed on clear.

### 2.7 GitHub API (A2 carry-over)

- Endpoint: `GET https://api.github.com/users/LamarAlshehri/repos?sort=pushed&per_page=6`
- HTTP 403 shows a rate-limit-specific message.
- Loading spinner shown during fetch; hidden in `finally` block regardless of outcome.

---

## 3. CSS Architecture

### Variables

All colours, shadows, and transition durations live on `:root`. `body.dark` overrides them — no duplicate rules anywhere.

### Layout

- Navbar: `display: flex; justify-content: space-between` — three zones: logo, nav links, nav-controls.
- Project / repo grids: `repeat(auto-fill, minmax(..., 1fr))` — responsive without breakpoints.
- Modal: `position: fixed; inset: 0` overlay with flex centering.

### Animations

- Scroll fade-in: `opacity: 0; transform: translateY(18px)` → `.visible` via `IntersectionObserver`.
- Spinner: pure CSS `@keyframes spin` with `-webkit-` prefix.
- Modal entrance: `@keyframes fadeIn` on `.modal-box`.

---

## 4. Performance Optimisations

| Technique | Where |
|---|---|
| `loading="lazy"` | All 5 project `<img>` tags |
| Explicit `width`/`height` on images | Prevents Cumulative Layout Shift (CLS) |
| Descriptive `alt` text on all images | Accessibility + avoids layout recalculation |
| CSS variables instead of repeated values | Smaller stylesheet, single source of truth |
| `IntersectionObserver` with `unobserve()` | Observer detached after element animates |
| Zero external JS dependencies | No library download overhead |
| `<script>` at bottom of `<body>` | Non-blocking; DOM ready when script runs |

---

## 5. Browser Compatibility

| Feature | Support notes |
|---|---|
| CSS custom properties | All modern browsers; IE11 not supported by design |
| `IntersectionObserver` | Chrome 58+, Firefox 55+, Safari 12.1+ |
| `async/await` | Chrome 55+, Firefox 52+, Safari 10.1+ |
| `backdrop-filter` | Chrome 76+, Safari 9+ (with `-webkit-`), Firefox 103+ |
| Flexbox / Grid | Full support in all modern browsers |
| `-webkit-` prefixes | Applied to `animation`, `transform`, `appearance`, `backdrop-filter` |

---

## 6. Known Limitations

- **GitHub API rate limit:** Unauthenticated requests capped at 60/hour per IP. HTTP 403 shows a specific message.
- **Form not sent:** Contact form simulates submission — no backend. Real deployment would need Formspree, EmailJS, or a custom API.
- **Login is client-side only:** No server-side authentication. Demonstrates localStorage state management patterns only.