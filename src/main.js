// ============================================================
// STYLES (правильный порядок: сначала переменные)
// ============================================================
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/stats.css";
import "./styles/trainers.css";
import "./styles/experience.css";  // только один раз
import "./styles/membership.css";   // добавляем новую секцию
import "./styles/animations.css";

// ============================================================
// MODULES
// ============================================================
import { initHeader } from "./scripts/header";
import { initHero } from "./scripts/hero";
import { initStats } from "./scripts/stats";
import { initTrainers } from "./scripts/trainers";
import { initExperience } from "./scripts/experience";
import { initAnimations } from "./scripts/animations";

// ============================================================
// PRELOADER
// ============================================================
const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader?.classList.add("hidden");
    }, 1500);
});

// ============================================================
// PARTICLES
// ============================================================
const particles = document.querySelector(".particles");

if (particles) {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particle.style.animationDuration = 5 + Math.random() * 8 + "s";
        particles.appendChild(particle);
    }
}

// ============================================================
// CURSOR GLOW
// ============================================================
const glow = document.querySelector(".cursor-glow");

if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            glow.classList.add("active");
        });
        el.addEventListener("mouseleave", () => {
            glow.classList.remove("active");
        });
    });
}

// ============================================================
// APP
// ============================================================
function initApp() {
    initHeader();
    initHero();
    initStats();
    initTrainers();
    initExperience();
    if (typeof initMembership === "function") initMembership(); // безопасный вызов
    initAnimations();
}

initApp();

console.log("🚀 AZ Fitness Club loaded");
