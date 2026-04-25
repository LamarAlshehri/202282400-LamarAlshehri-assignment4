# Technical Documentation – Assignment 4

**Student:** Lamar Alshehri (202282400)  
**Course:** SWE363 – Web Development  
**Assignment:** 4 – Complete Personal Web Application

---

## 1. Architecture Overview

Single-page portfolio — plain HTML, CSS, and JavaScript. No frameworks, no build tools, no external dependencies beyond the GitHub REST API (consumed at runtime).

```
Browser
└── index.html
    ├── css/styles.css     Visual layer (variables, dark mode, animations, layout, responsive)
    └── js/script.js       Logic layer (greeting, theme, typewriter, filter, sort, GitHub API, form)
```

All state is managed in JavaScript variables and `localStorage`. There is no backend.

---

## 2. New Features in Assignment 4

### 2.1 Animated Gradient Background

**Implementation:** A CSS `::before` pseudo-element is attached to `body` with `position: fixed; inset: 0; z-index: -1`. This creates a full-viewport layer behind all content without affecting card or section backgrounds.

```css
body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background: linear-gradient(135deg, ...);
    background-size: 400% 400%;
    animation: gradientShift 14s ease infinite;
}
```

`background-size: 400% 400%` combined with animating `background-position` from `0% 50%` to `100% 50%` creates the slow colour-shift effect. A separate `body.dark::before` rule provides the dark-mode palette — deep navy and purple tones — without duplicating the animation keyframes.

**Why pseudo-element:** Setting the gradient directly on `body` would bleed through semi-transparent card backgrounds. The pseudo-element sits entirely behind the content layer.

---

### 2.2 Transparent Navbar with Blur

**Implementation:**

```css
.navbar {
    background: rgba(30, 30, 46, 0.5);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

`backdrop-filter: blur` blurs whatever is behind the navbar (the animated gradient), creating a frosted-glass effect. The `-webkit-` prefix is required for Safari. The semi-transparent border-bottom adds subtle separation without a hard edge.

---

### 2.3 Centred Navigation with CSS Grid

**Implementation:**

```css
.navbar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
}
```

Three columns: logo takes the left `1fr`, nav links sit in the `auto` centre column, nav controls take the right `1fr` with `justify-content: flex-end`. This guarantees the nav links are geometrically centred in the viewport regardless of how wide the logo or controls are — something Flexbox cannot achieve without knowing widths in advance.

---

### 2.4 Logo with Fallback

**Implementation:**

```html
<a href="#about" class="logo-link">
    <img src="assets/images/logo.png" alt="Lamar Alshehri" class="logo-img"
         onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
    <span class="logo-fallback">Lamar Alshehri</span>
</a>
```

If the image file is missing or fails to load, the `onerror` handler hides the `<img>` and reveals the text `<span>`. This makes the navbar robust to missing assets.

`transform: scale(1.5); transform-origin: left center` on `.logo-img` visually enlarges the logo without changing the navbar height, because CSS transforms do not affect layout flow.

---

### 2.5 Hero Section

**Implementation:** A dedicated `<section id="hero">` inserted between the navbar and the About section. It uses `display: flex` with `gap: 48px` to place the illustration and greeting side by side.

**Floating animation:**

```css
@keyframes heroFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-16px); }
}
```

Applied with `animation: heroFloat 4s ease-in-out infinite` — the `ease-in-out` timing function gives it a natural, breath-like motion.

**Responsive behaviour:** At `max-width: 768px` the flex direction switches to `column` so the illustration stacks above the greeting on mobile.

---

### 2.6 Typewriter Greeting

**Implementation:** The greeting is driven entirely by JavaScript — no CSS `width` animation — which allows multi-line output and programmatic cursor control.

```js
function typeLines(el, lines, speed = 60) {
    let lineIndex = 0;
    let charIndex = 0;
    let current = '';

    function tick() {
        if (lineIndex >= lines.length) {
            const cursor = el.querySelector('.typing-cursor');
            if (cursor) cursor.style.borderRight = 'none';
            return;
        }
        current += lines[lineIndex][charIndex];
        charIndex++;
        el.innerHTML = lines.slice(0, lineIndex)
                            .map(l => `<span>${l}</span>`)
                            .join('<br>') +
                       (lineIndex > 0 ? '<br>' : '') +
                       `<span class="typing-cursor">${current}</span>`;

        if (charIndex >= lines[lineIndex].length) {
            lineIndex++;
            charIndex = 0;
            current = '';
            setTimeout(tick, 300); // pause between lines
        } else {
            setTimeout(tick, speed); // per-character delay
        }
    }
    tick();
}
```

**Cursor behaviour:** The blinking cursor is a `border-right` applied only to the `.typing-cursor` span — the last span being actively typed. This ensures the cursor appears only on the current line, not across the whole element. When typing finishes, `cursor.style.borderRight = 'none'` removes it.

---

### 2.7 Standalone Skill Set Section

The `.skills-row` div was extracted from the About section and placed in its own `<section id="skills">` between About and Projects. A matching nav link `<a href="#skills">Skills</a>` was added to the navbar. No JavaScript changes were required — the `IntersectionObserver` picks up the new section automatically via `document.querySelectorAll(".fade-in")`.

---

### 2.8 Unified Filter Bar

**Previous design:** Separate pill buttons for category + a level toggle in the About section.  
**New design:** Two `<select>` dropdowns — Filter By and Sort By — both inside the Projects section filter bar, with the difficulty level toggle also moved here.

**Filter By dropdown values:**

| Option | Behaviour |
|---|---|
| All | Shows all projects |
| Web | Matches `data-category="web"` |
| Data | Matches `data-category="data"` |
| Desktop | Matches `data-category="desktop"` |
| Beginner | Matches `data-level="beginner"` regardless of category |
| Advanced | Matches `data-level="advanced"` regardless of category |

**Implementation logic:**

```js
let matchesFilter = true;
if (filterVal === "beginner" || filterVal === "advanced") {
    matchesFilter = level === filterVal;
} else if (filterVal !== "all") {
    matchesFilter = category === filterVal;
}
```

Difficulty options in the Filter By dropdown and the separate difficulty pill buttons both call `filterProjects()`, which evaluates `matchesFilter && matchesLevel && matchesQuery` in a single pass.

**Default sort:** The sort dropdown's first option is `name-asc` (A → Z). `filterProjects()` is called once on page load, so cards are sorted alphabetically immediately without user interaction.

---

## 3. Carry-Over Features from Assignment 3

The following features were implemented in Assignment 3 and carried forward unchanged into Assignment 4:

| Feature | Key technical detail |
|---|---|
| Dark / Light theme toggle | `body.dark` class toggles CSS variable overrides; preference persisted in `localStorage` |
| Scroll fade-in | `IntersectionObserver` adds `.visible` class; observer detaches after first trigger |
| Visit timer | `setInterval` at 1000 ms; `formatTime()` formats to `Ns` or `Nm Ns` |
| GitHub API | `fetch` to GitHub REST API; spinner during load; retry button on error |
| Contact form validation | Blur-event per-field validation + full re-validation on submit; character counter with colour thresholds |

---

## 4. CSS Architecture

### Variable System

All colours, shadows, and transitions are defined as CSS custom properties on `:root`. `body.dark` overrides only the values that change — no duplicate rules.

### Layout Patterns

| Component | Technique |
|---|---|
| Navbar | CSS Grid `1fr auto 1fr` — logo left, links centre, controls right |
| Hero | Flexbox row with `gap`; column on mobile |
| Project grid | `repeat(auto-fill, minmax(270px, 1fr))` — responsive without breakpoints |
| Repo grid | `repeat(auto-fill, minmax(260px, 1fr))` |
| Filter bar | Flexbox column; filter controls row is a nested Flexbox row |

### Animation Inventory

| Animation | Technique |
|---|---|
| Background gradient | `@keyframes gradientShift` on `::before` pseudo-element |
| Hero float | `@keyframes heroFloat` with `ease-in-out` on `.hero-img` |
| Typewriter cursor blink | `@keyframes blink` on `.typing-cursor` border |
| Scroll fade-in | CSS transition on `opacity` and `transform`; triggered by JS class add |
| Loading spinner | `@keyframes spin` with `-webkit-` prefix |

---

## 5. Performance

| Technique | Location |
|---|---|
| `loading="lazy"` on all project images | `index.html` — all 5 project cards |
| Explicit `width` and `height` on images | Prevents Cumulative Layout Shift (CLS) |
| `IntersectionObserver` with `unobserve()` | Observer detaches after element animates — no continuous observation |
| CSS transforms for logo scaling | `transform: scale()` — no layout reflow |
| Zero external JS dependencies | No library download; instant script parse |
| `<script>` at bottom of `<body>` | DOM fully parsed before script runs |
| CSS variables instead of repeated values | Single source of truth; smaller stylesheet |

---

## 6. Browser Compatibility

| Feature | Support |
|---|---|
| CSS custom properties | All modern browsers |
| `backdrop-filter` | Chrome 76+, Safari 9+ (`-webkit-`), Firefox 103+ |
| `IntersectionObserver` | Chrome 58+, Firefox 55+, Safari 12.1+ |
| CSS Grid | Full support in all modern browsers |
| `async/await` | Chrome 55+, Firefox 52+, Safari 10.1+ |
| CSS `@keyframes` | Full support; `-webkit-animation` prefix applied for older Safari |

Vendor prefixes applied: `-webkit-backdrop-filter`, `-webkit-appearance`, `-moz-appearance`, `-webkit-animation`, `-webkit-transform`.

---

## 7. Known Limitations

- **GitHub API rate limit:** Unauthenticated requests are capped at 60 per hour per IP. The error banner handles HTTP 403 specifically.
- **Contact form is client-side only:** No backend — form submission is simulated. A real deployment would integrate Formspree or EmailJS.
- **`backdrop-filter` on Firefox < 103:** The blur effect falls back gracefully to a solid semi-transparent background — the navbar remains usable.
- **Hero image is a static asset:** The illustration does not adapt to theme. A future improvement would be separate hero images for dark and light mode.
