/* ==========================================================
   AZ FITNESS CLUB
   MAIN ENTRY
========================================================== */

// ==========================================================
// СТИЛИ
// ==========================================================
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/animations.css";

// Секции
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/stats.css";
import "./styles/trainers.css";
import "./styles/experience.css";
import "./styles/membership.css";
import "./styles/spaces.css";

// Новая галерея
import "./styles/cinema-gallery.css";

// ==========================================================
// МОДУЛИ
// ==========================================================
import { initHeader } from "./scripts/header.js";
import { initHero } from "./scripts/hero.js";
import { initStats } from "./scripts/stats.js";
import { initTrainers } from "./scripts/trainers.js";
import { initExperience } from "./scripts/experience.js";
import { initAnimations } from "./scripts/animations.js";

// Новая галерея пространств
import { initCinemaGallery } from "./components/CinemaGallery.js";
import { renderSpaces } from "./scripts/renderSpaces.js";

// ==========================================================
// PRELOADER
// ==========================================================

const preloader = document.getElementById("preloader");

if (preloader) {

    setTimeout(() => {

        preloader.classList.add("hidden");

    }, 1200);

}

// ==========================================================
// GOLD PARTICLES
// ==========================================================

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

// ==========================================================
// CURSOR GLOW
// ==========================================================

const glow = document.querySelector(".cursor-glow");

if (glow) {

    document.addEventListener("mousemove", (event) => {

        glow.style.left = event.clientX + "px";

        glow.style.top = event.clientY + "px";

    });

    document.querySelectorAll("a, button").forEach((element) => {

        element.addEventListener("mouseenter", () => {

            glow.classList.add("active");

        });

        element.addEventListener("mouseleave", () => {

            glow.classList.remove("active");

        });

    });

}

// ==========================================================
// INIT APP
// ==========================================================

function initApp() {

    initHeader();

    initHero();

    initStats();

    initTrainers();

    initExperience();

    initAnimations();

    renderSpaces();

    initCinemaGalleries();

}

// ==========================================================
// START
// ==========================================================

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initApp);

} else {

    initApp();

}

console.log("🚀 AZ Fitness Club started");
