# AI Usage Report – Assignment 3

**Student:** Lamar Alshehri (202282400)  
**Assignment:** 3 – Advanced Functionality

---

## 1. Tools Used

### Claude (Anthropic)

Claude was the primary AI tool used throughout Assignment 3.

| Task | How Claude was used |
|---|---|
| Sort feature | Asked Claude to add a sort dropdown that re-orders DOM nodes already filtered by `filterProjects()`, sorting by name or `data-date` |
| Level toggle | Asked Claude to add a conditional content toggle that integrates with the existing filter without duplicating logic |
| Visit timer | Asked Claude to implement a `setInterval`-based counter with a `formatTime` helper |
| Login modal | Asked Claude to implement the modal overlay pattern with keyboard accessibility (Escape, Enter) and `localStorage` persistence |
| Character counter | Asked Claude to add a live counter with colour-coded warnings at 85% of limit and over-limit |
| Contact form enhancements | Asked Claude to add a Subject field, raise message minimum to 20 chars, add a 500-char max, and auto-focus the first invalid field on submit |
| Lazy loading | Asked Claude to add `loading="lazy"` and explicit `width`/`height` to all project images |
| Documentation | Asked Claude to draft the README and technical documentation, which I then reviewed and edited for accuracy |

---

## 2. Benefits & Challenges

### Benefits

- **Speed on boilerplate:** Claude generated repetitive patterns (show/hide errors, event listeners) quickly, freeing time for design decisions.
- **Proactive error handling:** Claude suggested handling GitHub's HTTP 403 rate-limit case separately from generic errors.
- **Accessibility additions:** Claude consistently added `aria-label`, `aria-invalid`, and `role="dialog"` attributes.
- **Integration awareness:** When asked to add sort, Claude recognised the existing `filterProjects` function and merged into it rather than replacing it.

### Challenges

- **Over-engineering:** Claude sometimes proposed complex patterns when a simpler approach was sufficient. I had to ask for the simpler solution explicitly.
- **Context drift:** In longer sessions Claude occasionally forgot constraints (plain JS, no frameworks). I learned to include that constraint in every prompt.
- **Hallucinated details:** One response referenced a non-existent GitHub API parameter. I verified against the official docs and corrected it.

---

## 3. What I Learned from AI Interaction

- **Prompt specificity matters.** "Add a sort feature" gave generic code. "Add a sort dropdown that re-orders DOM nodes already filtered by `filterProjects`, using `data-date` for date sort" gave directly usable output.
- **CSS variables pattern.** Claude's explanation of how `body.dark` overrides `:root` variables deepened my understanding of custom properties.
- **Validation structure.** Seeing a multi-rule validation function (type check → length check → regex → char limit) showed me a readable pattern I can reuse.
- **Accessibility as default.** Watching Claude add `aria-*` attributes automatically made me more aware of what I was previously skipping.

---

## 4. Review & Modification Process

Every AI-generated piece went through this process before inclusion:

1. **Read line by line** — understood what each line does before using it.
2. **Tested in browser** — manually exercised each feature after every change.
3. **Fixed bugs found during testing** — e.g., the modal's overlay-click handler initially closed on any click; I fixed it by checking `e.target === loginModal`.
4. **Integrated with existing code** — sort had to merge into `filterProjects`, not replace it.
5. **Style normalised** — Claude's generated CSS sometimes used different variable names; I normalised everything to match the existing stylesheet.

All code in this submission is code I have read, tested, and understand well enough to explain.