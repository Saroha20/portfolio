// ---------- Theme toggle (remembers choice, respects system preference) ----------
(function () {
    const root = document.documentElement;
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { }
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    root.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));

    document.getElementById("themeToggle").addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) { }
    });
})();

// ---------- Smooth scroll for navigation ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        navMenu.classList.remove("show");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
    });
});

// ---------- Projects carousel ----------
function scrollProjects(direction) {
    const track = document.getElementById("projectsTrack");
    const card = track.children[0];
    const step = card.offsetWidth + 22; // card width + gap
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    if (direction > 0 && atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction < 0 && track.scrollLeft <= 5) {
        track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
        track.scrollBy({ left: direction * step, behavior: "smooth" });
    }
}

// ---------- Mobile navbar toggle ----------
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    const open = navMenu.classList.toggle("show");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
});

// ---------- Typing effect ----------
(function () {
    const el = document.getElementById("typed");
    const roles = ["Full Stack Developer", "Data Analyst", "AI & ML Enthusiast", "Problem Solver"];
    let r = 0, c = 0, deleting = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = roles[0];
        return;
    }
    function tick() {
        const word = roles[r];
        el.textContent = word.substring(0, c);
        let delay = deleting ? 45 : 95;
        if (!deleting && c === word.length) { deleting = true; delay = 1600; }
        else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
        c += deleting ? -1 : 1;
        setTimeout(tick, delay);
    }
    tick();
})();

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ---------- Animated counters ----------
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const duration = 1400;
        (function step(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (end * eased).toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(step);
        })(start);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

// ---------- Scroll progress, header shadow, back-to-top, active link ----------
const header = document.getElementById("header");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
const navLinks = document.querySelectorAll("#nav-links a");
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute("href")));

function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    header.classList.toggle("scrolled", y > 20);
    toTop.classList.toggle("show", y > 600);

    let current = null;
    sections.forEach(sec => { if (sec && sec.offsetTop - 140 <= y) current = sec.id; });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();
