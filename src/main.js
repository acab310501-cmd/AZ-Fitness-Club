/* ==========================================================
   AZ FITNESS CLUB
   MAIN ENTRY
========================================================== */

import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/animations.css";
import "./styles/cinema-gallery.css";

import { initCinemaGalleries } from "./components/CinemaGallery.js";


// ==========================================================
// PRELOADER
// Не ждём загрузки всех изображений и видео.
// Сайт показывается максимум через 1.2 секунды.
// ==========================================================

const preloader = document.getElementById("preloader");

if (preloader) {

    setTimeout(() => {

        preloader.classList.add("hidden");

    }, 1200);

}


// ==========================================================
// CINEMA GALLERY
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    initCinemaGalleries();

});


// ==========================================================
// GOLDEN PARTICLES
// ==========================================================

const particlesContainer =
    document.querySelector(".particles");

if (particlesContainer) {

    for (let i = 0; i < 40; i++) {

        const particle =
            document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particle.style.animationDuration =
            5 + Math.random() * 8 + "s";

        particlesContainer.appendChild(particle);

    }

}


// ==========================================================
// CURSOR GLOW
// ==========================================================

const glow =
    document.querySelector(".cursor-glow");

if (glow) {

    document.addEventListener("mousemove", (event) => {

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    });

}


// ==========================================================
// LOG
// ==========================================================

console.log("🚀 AZ Fitness Club запущен!");
