# AI Usage Report – Assignment 4

**Student:** Lamar Alshehri (202282400)  
**Course:** SWE363 – Web Development  
**Assignment:** 4 – Complete Personal Web Application

---

## 1. Tools Used & Use Cases

### Claude (Anthropic)

Claude was used as the primary AI assistant throughout Assignment 4. Every interaction was a back-and-forth conversation: I described what I wanted, Claude generated code or suggestions, I tested them in the browser, identified problems, and returned with specific follow-up corrections.

| Task | How Claude was used |
|---|---|
| Animated gradient background | Asked Claude to implement a CSS `@keyframes` background using `::before` pseudo-element so the gradient animates without affecting card or text backgrounds; requested separate light and dark palettes |
| Transparent navbar with blur | Asked Claude to change the navbar `background` to `rgba` at 50% opacity and add `backdrop-filter: blur` with the `-webkit-` prefix for Safari |
| Logo image with fallback | Asked Claude to replace the `<h1>` logo text with an `<img>` that falls back to a text `<span>` via the `onerror` attribute |
| Centred navigation links | Asked Claude to redesign the navbar layout using CSS Grid (`1fr auto 1fr`) so nav links are geometrically centred regardless of logo or controls width |
| LinkedIn & GitHub nav buttons | Asked Claude to replace the login button with two `<a>` tags containing inline SVG icons, icon-only with no visible labels |
| Hero section | Asked Claude to create a dedicated `<section id="hero">` above About with a floating image animation using `@keyframes` |
| Typewriter greeting | Asked Claude to implement a JS-driven typewriter that types two lines sequentially, pauses between them, and removes the blinking cursor when done |
| Cursor on second line only | When the cursor spanned both lines, asked Claude to isolate it to a `.typing-cursor` span on the active line rather than using a border on the whole element |
| Skill Set section | Asked Claude to extract the `.skills-row` from About Me into a standalone `<section id="skills">` with its own navbar link |
| Filter bar redesign | Asked Claude to replace the category pill buttons and separate level toggle with a unified `<select id="filterSelect">` handling both category and difficulty, co-located with the sort dropdown |
| Default sort A → Z | Asked Claude to remove the "Default" option from the sort dropdown and make A → Z the initial sort applied on page load |
| JS section 3 conflict fix | After the filter rewrite broke the site due to duplicate `const` declarations with section 3a, asked Claude to diagnose and provide a version of section 3 that respects the existing `activeLevel` variable declared above it |
| Filter dropdown styling | Asked Claude to apply the same `appearance: none` and border/focus styles from `#sortSelect` to `#filterSelect` so both dropdowns look identical |
| Documentation | Asked Claude to draft all three documentation files (README, AI report, technical documentation) based on the full conversation history of changes made |

---

## 2. Benefits & Challenges

### Benefits

- **Iterative debugging:** When something broke (e.g., the JS conflict in section 3), Claude correctly identified the root cause — duplicate `const` declarations — without me needing to know the exact error type. Explaining the symptom was enough.
- **Cross-property awareness:** When I asked to make the background animated, Claude proactively used a `::before` pseudo-element to avoid the gradient interfering with card backgrounds — a design consideration I had not specified.
- **Consistent styling:** Claude matched new elements (filter dropdown) to the existing design system (sort dropdown) automatically when I pointed out the mismatch visually.
- **Layout problem-solving:** The centred nav links problem — logo on left, controls on right, links truly centred — was solved by Claude suggesting CSS Grid instead of the Flexbox approach I was trying, which was the right call.
- **Targeted fixes:** Every fix was scoped to exactly the lines that needed changing. Claude did not rewrite unrelated code.

### Challenges

- **CSS specificity conflicts:** When the duplicate `.time-greeting` block existed in two places in the stylesheet, the older block's properties were overriding the new ones. Claude did not catch this proactively; I had to notice the visual inconsistency and ask about it.
- **Scope of changes:** A few times Claude included more changes than requested (e.g., updating variables in `:root` when I only asked about the navbar). I had to re-read every diff carefully.
- **Context across a long session:** In a conversation spanning many changes, Claude occasionally referenced old HTML structure that had already been modified. I always cross-checked against my actual current file before applying any suggestion.

---

## 3. Learning Outcomes

- **CSS pseudo-elements for layering:** Using `::before` with `position: fixed` to create a full-viewport background layer that does not affect child element backgrounds was a pattern I had not used before. I now understand how stacking context and `z-index` interact with pseudo-elements.
- **CSS Grid for navbar layout:** The `1fr auto 1fr` grid pattern for a three-zone header (logo | nav | controls) is cleaner and more robust than trying to achieve the same result with Flexbox and manual margins. I will use this pattern in future projects.
- **JS variable scope in multi-section scripts:** The conflict between section 3 and section 3a taught me that `const` is block-scoped but still conflicts at module level if declared twice in the same script. Structuring large scripts into separate files or using ES modules would prevent this entirely.
- **Typewriter effect without libraries:** Implementing the two-line typewriter in vanilla JS — with per-character `setTimeout` recursion, a pause between lines, and cursor removal on completion — showed me that effects I assumed required a library are straightforward to write from scratch.
- **Git branching for parallel assignments:** Managing A3 and A4 as separate branches on the same local repo, then pushing each to a different remote, was a practical Git workflow I had not done before.

---

## 4. Responsible Use & Modifications

Every AI-generated piece went through this process before being committed:

1. **Read before applying.** I read every code block line by line before pasting it into my files. I did not apply anything I did not understand.
2. **Test in browser immediately.** After every change I reloaded the page, tested the specific feature, and tested surrounding features to check for regressions.
3. **Reject and re-prompt when wrong.** When output was incorrect — such as the typewriter cursor spanning both lines — I described the exact visual problem and asked for a targeted fix rather than accepting the broken result.
4. **Scope control.** When Claude included unrequested changes, I applied only the relevant parts and discarded the rest.
5. **Style normalisation.** CSS variable names, spacing conventions, and comment formatting were normalised to match the existing stylesheet before committing.
6. **Commit discipline.** Each feature was committed separately with a descriptive message, creating a clear history that reflects my understanding of each change.

All code in this submission is code I have read, tested, understand, and can explain.
