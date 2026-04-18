// ─────────────────────────────────────────
// 0. TIME-BASED GREETING
// ─────────────────────────────────────────
const timeGreeting = document.getElementById("timeGreeting");

function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5  && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
}

timeGreeting.textContent = `${getTimeGreeting()}, welcome to my portfolio.`;

// ─────────────────────────────────────────
// 1. THEME TOGGLE  (persisted via localStorage)
// ─────────────────────────────────────────
const themeToggle = document.getElementById("themeToggle");

function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "☀️" : "🌙";
}

// Load saved preference
const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ─────────────────────────────────────────
// 2. FADE-IN ON SCROLL (Intersection Observer)
// ─────────────────────────────────────────
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

fadeEls.forEach((el) => observer.observe(el));

// ─────────────────────────────────────────
// 2a. VISIT TIMER (counts seconds on page; resets each load)
// ─────────────────────────────────────────
const timerDisplay = document.getElementById("timerDisplay");
let secondsOnSite = 0;

function formatTime(secs) {
    if (secs < 60) return `${secs}s`;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
}

setInterval(() => {
    secondsOnSite++;
    timerDisplay.textContent = formatTime(secondsOnSite);
}, 1000);

// ─────────────────────────────────────────
// 3a. EXPERIENCE LEVEL TOGGLE (conditional content)
// ─────────────────────────────────────────
const levelBtns = document.querySelectorAll(".level-btn");
let activeLevel = "all";

levelBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        levelBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeLevel = btn.dataset.level;
        filterProjects();
    });
});

// ─────────────────────────────────────────
// 3. PROJECT FILTER, SEARCH & SORT
// ─────────────────────────────────────────
const searchInput   = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortSelect    = document.getElementById("sortSelect");
const projectGrid   = document.getElementById("projectGrid");
const emptyState    = document.getElementById("emptyState");

let activeFilter = "all";

function applySortOrder() {
    const cards = Array.from(document.querySelectorAll("#projectGrid .card"));
    const order = sortSelect.value;

    if (order === "default") return;

    cards.sort((a, b) => {
        if (order === "name-asc" || order === "name-desc") {
            const na = a.querySelector("h3").textContent.toLowerCase();
            const nb = b.querySelector("h3").textContent.toLowerCase();
            return order === "name-asc" ? na.localeCompare(nb) : nb.localeCompare(na);
        }
        if (order === "date-asc" || order === "date-desc") {
            const da = new Date(a.dataset.date || "2000-01");
            const db = new Date(b.dataset.date || "2000-01");
            return order === "date-asc" ? da - db : db - da;
        }
        return 0;
    });

    cards.forEach((card) => projectGrid.appendChild(card));
}

function filterProjects() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    document.querySelectorAll("#projectGrid .card").forEach((card) => {
        const category = card.dataset.category;
        const level    = card.dataset.level || "all";
        const tags     = card.dataset.tags || "";
        const title    = card.querySelector("h3").textContent.toLowerCase();
        const desc     = card.querySelector("p").textContent.toLowerCase();

        const matchesCategory = activeFilter === "all" || category === activeFilter;
        const matchesLevel    = activeLevel  === "all" || level === activeLevel;
        const matchesQuery    =
            !query ||
            title.includes(query) ||
            desc.includes(query) ||
            tags.includes(query);

        const visible = matchesCategory && matchesLevel && matchesQuery;
        card.classList.toggle("hidden", !visible);
        if (visible) visibleCount++;
    });

    applySortOrder();
    emptyState.classList.toggle("hidden", visibleCount > 0);
}

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        filterProjects();
    });
});

searchInput.addEventListener("input", filterProjects);
sortSelect.addEventListener("change", filterProjects);

// ─────────────────────────────────────────
// 4. GITHUB API  – fetch public repos
// ─────────────────────────────────────────
const GITHUB_USERNAME = "LamarAlshehri";
const repoLoading     = document.getElementById("repoLoading");
const repoError       = document.getElementById("repoError");
const repoGrid        = document.getElementById("repoGrid");
const retryBtn        = document.getElementById("retryBtn");

const LANG_COLORS = {
    JavaScript : "#f1e05a",
    TypeScript : "#3178c6",
    Python     : "#3572A5",
    Java       : "#b07219",
    HTML       : "#e34c26",
    CSS        : "#563d7c",
    Shell      : "#89e051",
    default    : "#8f8f8f",
};

function langDot(lang) {
    const color = LANG_COLORS[lang] || LANG_COLORS.default;
    return `<span class="lang-dot" style="background:${color}"></span>`;
}

function renderRepos(repos) {
    if (repos.length === 0) {
        repoGrid.innerHTML =
            `<p style="color:var(--text-muted)">No public repositories found.</p>`;
        repoGrid.classList.remove("hidden");
        return;
    }

    repoGrid.innerHTML = repos
        .slice(0, 6)
        .map(
            (r) => `
        <a class="repo-card fade-in visible"
           href="${r.html_url}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Repository: ${r.name}">
            <h3>${r.name}</h3>
            <p>${r.description || "No description provided."}</p>
            <div class="repo-meta">
                ${r.language
                    ? `<span class="repo-lang">${langDot(r.language)} ${r.language}</span>`
                    : ""}
                <span>⭐ ${r.stargazers_count}</span>
                <span>🍴 ${r.forks_count}</span>
            </div>
        </a>`
        )
        .join("");

    repoGrid.classList.remove("hidden");
}

async function fetchRepos() {
    repoLoading.classList.remove("hidden");
    repoError.classList.add("hidden");
    repoGrid.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`,
            { headers: { Accept: "application/vnd.github+json" } }
        );

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const repos = await response.json();
        renderRepos(repos);
    } catch (err) {
        console.error("GitHub fetch error:", err);
        repoError.classList.remove("hidden");
    } finally {
        repoLoading.classList.add("hidden");
    }
}

retryBtn.addEventListener("click", fetchRepos);
fetchRepos();

// ─────────────────────────────────────────
// 5. CONTACT FORM  – enhanced validation + char counter
// ─────────────────────────────────────────
const contactForm   = document.getElementById("contactForm");
const nameInput     = document.getElementById("nameInput");
const emailInput    = document.getElementById("emailInput");
const subjectInput  = document.getElementById("subjectInput");
const messageInput  = document.getElementById("messageInput");
const nameError     = document.getElementById("nameError");
const emailError    = document.getElementById("emailError");
const subjectError  = document.getElementById("subjectError");
const messageError  = document.getElementById("messageError");
const charCount     = document.getElementById("charCount");
const formMessage   = document.getElementById("formMessage");

const MSG_MIN = 20;
const MSG_MAX = 500;

function showError(input, errorEl, msg) {
    errorEl.textContent = msg;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
}

function clearError(input, errorEl) {
    errorEl.textContent = "";
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Character counter
messageInput.addEventListener("input", () => {
    const len = messageInput.value.length;
    charCount.textContent = len;
    const counter = charCount.parentElement;
    counter.classList.remove("warn", "over");
    if (len > MSG_MAX)             counter.classList.add("over");
    else if (len > MSG_MAX * 0.85) counter.classList.add("warn");
});

// Blur validation
nameInput.addEventListener("blur", () => {
    const val = nameInput.value.trim();
    if (!val)                showError(nameInput, nameError, "Name is required.");
    else if (val.length < 2) showError(nameInput, nameError, "Name must be at least 2 characters.");
    else if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(val))
                             showError(nameInput, nameError, "Name can only contain letters.");
    else                     clearError(nameInput, nameError);
});

emailInput.addEventListener("blur", () => {
    const val = emailInput.value.trim();
    if (!val)                     showError(emailInput, emailError, "Email is required.");
    else if (!validateEmail(val)) showError(emailInput, emailError, "Please enter a valid email address.");
    else                          clearError(emailInput, emailError);
});

subjectInput.addEventListener("blur", () => {
    const val = subjectInput.value.trim();
    if (!val)                showError(subjectInput, subjectError, "Subject is required.");
    else if (val.length < 3) showError(subjectInput, subjectError, "Subject must be at least 3 characters.");
    else                     clearError(subjectInput, subjectError);
});

messageInput.addEventListener("blur", () => {
    const val = messageInput.value.trim();
    if (!val)                    showError(messageInput, messageError, "Message cannot be empty.");
    else if (val.length < MSG_MIN) showError(messageInput, messageError, `Message must be at least ${MSG_MIN} characters.`);
    else if (val.length > MSG_MAX) showError(messageInput, messageError, `Message cannot exceed ${MSG_MAX} characters.`);
    else                         clearError(messageInput, messageError);
});

// Submit
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const nameVal = nameInput.value.trim();
    if (!nameVal)                { showError(nameInput, nameError, "Name is required."); valid = false; }
    else if (nameVal.length < 2) { showError(nameInput, nameError, "Name must be at least 2 characters."); valid = false; }
    else if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(nameVal))
                                 { showError(nameInput, nameError, "Name can only contain letters."); valid = false; }
    else                         clearError(nameInput, nameError);

    const emailVal = emailInput.value.trim();
    if (!emailVal)                     { showError(emailInput, emailError, "Email is required."); valid = false; }
    else if (!validateEmail(emailVal)) { showError(emailInput, emailError, "Please enter a valid email address."); valid = false; }
    else                               clearError(emailInput, emailError);

    const subjectVal = subjectInput.value.trim();
    if (!subjectVal)                { showError(subjectInput, subjectError, "Subject is required."); valid = false; }
    else if (subjectVal.length < 3) { showError(subjectInput, subjectError, "Subject must be at least 3 characters."); valid = false; }
    else                            clearError(subjectInput, subjectError);

    const msgVal = messageInput.value.trim();
    if (!msgVal)                    { showError(messageInput, messageError, "Message cannot be empty."); valid = false; }
    else if (msgVal.length < MSG_MIN) { showError(messageInput, messageError, `Message must be at least ${MSG_MIN} characters.`); valid = false; }
    else if (msgVal.length > MSG_MAX) { showError(messageInput, messageError, `Message cannot exceed ${MSG_MAX} characters.`); valid = false; }
    else                            clearError(messageInput, messageError);

    if (!valid) {
        contactForm.querySelector(".invalid")?.focus();
        return;
    }

    formMessage.classList.remove("hidden");
    contactForm.reset();
    charCount.textContent = "0";
    formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => formMessage.classList.add("hidden"), 5000);
});

// ─────────────────────────────────────────
// 6. LOGIN / LOGOUT SIMULATION
//    + VISITOR NAME STORAGE (localStorage)
// ─────────────────────────────────────────
const loginBtn         = document.getElementById("loginBtn");
const loginModal       = document.getElementById("loginModal");
const modalEnterBtn    = document.getElementById("modalEnterBtn");
const modalCancelBtn   = document.getElementById("modalCancelBtn");
const visitorNameInput = document.getElementById("visitorNameInput");
const visitorNameError = document.getElementById("visitorNameError");
const visitorBanner    = document.getElementById("visitorBanner");
const visitorGreeting  = document.getElementById("visitorGreeting");
const logoutBtn        = document.getElementById("logoutBtn");

let isLoggedIn = false;

function setLoggedIn(name) {
    isLoggedIn = true;
    localStorage.setItem("visitorName", name);

    loginBtn.textContent = "Logout";
    visitorBanner.classList.remove("hidden");
    visitorGreeting.textContent = `👋 Welcome back, ${name}!`;
    timeGreeting.textContent = `${getTimeGreeting()}, ${name}! Welcome to my portfolio.`;
}

function setLoggedOut() {
    isLoggedIn = false;
    localStorage.removeItem("visitorName");

    loginBtn.textContent = "Login";
    visitorBanner.classList.add("hidden");
    timeGreeting.textContent = `${getTimeGreeting()}, welcome to my portfolio.`;
}

// Restore session from previous visit
const savedName = localStorage.getItem("visitorName");
if (savedName) setLoggedIn(savedName);

// Login button: open modal or log out
loginBtn.addEventListener("click", () => {
    if (isLoggedIn) {
        setLoggedOut();
    } else {
        visitorNameInput.value = "";
        visitorNameError.textContent = "";
        loginModal.classList.remove("hidden");
        setTimeout(() => visitorNameInput.focus(), 60);
    }
});

function closeModal() {
    loginModal.classList.add("hidden");
}

modalCancelBtn.addEventListener("click", closeModal);

// Close on overlay click
loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) closeModal();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !loginModal.classList.contains("hidden")) closeModal();
});

function submitLogin() {
    const name = visitorNameInput.value.trim();
    if (!name) {
        visitorNameError.textContent = "Please enter your name.";
        visitorNameInput.focus();
        return;
    }
    if (name.length < 2) {
        visitorNameError.textContent = "Name must be at least 2 characters.";
        visitorNameInput.focus();
        return;
    }
    if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(name)) {
        visitorNameError.textContent = "Name can only contain letters.";
        visitorNameInput.focus();
        return;
    }
    closeModal();
    setLoggedIn(name);
}

modalEnterBtn.addEventListener("click", submitLogin);

visitorNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitLogin();
});

logoutBtn.addEventListener("click", setLoggedOut);