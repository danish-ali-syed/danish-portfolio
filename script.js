/* ============ Typing effect ============ */
const phrases = [
  "Web Developer.",
  "UI Enthusiast.",
  "Problem Solver.",
  "Lifelong Learner.",
];
const typedEl = document.getElementById("typed");
let phraseIdx = 0, charIdx = 0, deleting = false;

function tick() {
  const phrase = phrases[phraseIdx];
  charIdx += deleting ? -1 : 1;
  typedEl.textContent = phrase.slice(0, charIdx);

  let delay = deleting ? 45 : 90;
  if (!deleting && charIdx === phrase.length) {
    delay = 1600; // pause at end of phrase
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 350;
  }
  setTimeout(tick, delay);
}
tick();

/* ============ Reveal on scroll ============ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Animate skill bars once visible
        entry.target.querySelectorAll(".bar span").forEach((bar) => {
          bar.style.width = bar.style.getPropertyValue("--w");
        });
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ============ Animated counters ============ */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      function update(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".stat-num").forEach((el) => counterObserver.observe(el));

/* ============ Navbar scroll state ============ */
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", window.scrollY > 40),
  { passive: true }
);

/* ============ Mobile menu ============ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ============ Subtle hero parallax ============ */
const heroInner = document.querySelector(".hero-inner");
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroInner.style.transform = `translateY(${y * 0.18}px)`;
      heroInner.style.opacity = 1 - y / (window.innerHeight * 0.85);
    }
  },
  { passive: true }
);
