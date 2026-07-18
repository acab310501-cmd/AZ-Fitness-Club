/* ==========================================================
   AZ FITNESS CLUB
   MAIN ENTRY
========================================================== */

// ==========================================================
// СТИЛИ (обязательный порядок: сначала переменные)
// ==========================================================
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/animations.css";

// Стили секций
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/stats.css";
import "./styles/trainers.css";
import "./styles/experience.css";
import "./styles/membership.css";

// Стили галерей (если используете)
import "./styles/carousel.css";        // простая карусель
import "./styles/cinema-gallery.css";  // кинематографическая галерея

// ==========================================================
// МОДУЛИ (инициализация)
// ==========================================================
import { initGallery } from "./scripts/gallery";
import { initHeader } from "./scripts/header";
import { initHero } from "./scripts/hero";
import { initStats } from "./scripts/stats";
import { initTrainers } from "./scripts/trainers";
import { initExperience } from "./scripts/experience";
import { initAnimations } from "./scripts/animations";
import { initCinemaGalleries } from "./components/CinemaGallery.js";
// Если нужна простая карусель, можно импортировать и её:
// import { initGallery } from "./scripts/gallery";

// ==========================================================
// ПРЕЛОАДЕР
// ==========================================================
const preloader = document.getElementById("preloader");
if (preloader) {
    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 1200);
}

// ==========================================================
// ЗОЛОТЫЕ ЧАСТИЦЫ (для Hero)
// ==========================================================
const particlesContainer = document.querySelector(".particles");
if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particle.style.animationDuration = 5 + Math.random() * 8 + "s";
        particlesContainer.appendChild(particle);
    }
}

// ==========================================================
// ГЛОУ-КУРСОР (лёгкое свечение)
// ==========================================================
const glow = document.querySelector(".cursor-glow");
if (glow) {
    document.addEventListener("mousemove", (event) => {
        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";
    });
    document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => glow.classList.add("active"));
        el.addEventListener("mouseleave", () => glow.classList.remove("active"));
    });
}

// ==========================================================
// ЗАПУСК ВСЕХ МОДУЛЕЙ
// ==========================================================
function initApp() {
    initHeader();
    initHero();
    initStats();
    initTrainers();
    initExperience();
    initAnimations();
    initCinemaGalleries();
    initGallery();

    // если нужна простая карусель:
    // initGallery();
}

// Запускаем после загрузки DOM
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

console.log("🚀 AZ Fitness Club запущен!");
