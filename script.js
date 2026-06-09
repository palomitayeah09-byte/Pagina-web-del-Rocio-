// Scroll suave hacia sección principal
document.querySelectorAll("[data-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Intersection Observer para apariciones al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);document.querySelectorAll(".observe, .reveal, .closing").forEach((el) => observer.observe(el));

// Parallax optimizado con requestAnimationFrame
const parallaxEls = [...document.querySelectorAll(".parallax")];
let ticking = false;

function updateParallax() {
  const vh = window.innerHeight || 1;
  parallaxEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const distance = (rect.top + rect.height / 2 - vh / 2) / vh;
    const speed = Number(el.dataset.speed || 0.1);
    const y = -distance * speed * 160;

    if (el.classList.contains("hero__bg")) {
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.08)`;
    } else {
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    }
  });
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener("scroll", requestTick, { passive: true });
window.addEventListener("resize", requestTick);
requestTick();

// Efecto de luz sutil en hero según movimiento del ratón
const root = document.documentElement;
const hero = document.querySelector(".hero");

if (hero) {
  let mx = window.innerWidth * 0.5;
  let my = window.innerHeight * 0.4;
  let tx = mx;
  let ty = my;

  hero.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  hero.addEventListener("mouseleave", () => {
    tx = window.innerWidth * 0.5;
    ty = window.innerHeight * 0.4;
  });

  function animateGlow() {
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    root.style.setProperty("--hero-glow-x", `${(mx / window.innerWidth) * 100}%`);
    root.style.setProperty("--hero-glow-y", `${(my / window.innerHeight) * 100}%`);
    requestAnimationFrame(animateGlow);
  }

  requestAnimationFrame(animateGlow);
}