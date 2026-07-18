/* ==========================================================
   AZ FITNESS CLUB
   MAIN ENTRY
========================================================== */

// ===============================
// GLOBAL STYLES
// ===============================

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/animations.css";
import "./styles/cinema-gallery.css";


// ===============================
// COMPONENTS
// ===============================

import { initCinemaGalleries } from "./components/CinemaGallery.js";


// ==========================================================
// PRELOADER
// ==========================================================

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) {

        return;

    }

    setTimeout(() => {

        preloader.classList.add("is-hidden");

    }, 900);

});


// ==========================================================
// CINEMA GALLERY
// ==========================================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initCinemaGalleries();

    }

);


// ==========================================================
// CURSOR GLOW
// ==========================================================

const cursorGlow =
    document.querySelector(".cursor-glow");

if (cursorGlow) {

    window.addEventListener(

        "mousemove",

        (event) => {

            cursorGlow.style.transform =

                `translate3d(

                    ${event.clientX}px,

                    ${event.clientY}px,

                    0

                )`;

        }

    );

}


// ==========================================================
// PARTICLES
// ==========================================================

const particles =
    document.querySelector(".particles");

if (particles) {

    const particleCount = 25;

    for (

        let i = 0;

        i < particleCount;

        i++

    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animationDelay =
            `${Math.random() * 5}s`;

        particles.appendChild(

            particle

        );

    }

}


// ==========================================================
// AZ FITNESS CLUB LOADED
// ==========================================================

console.log(

    "AZ Fitness Club loaded 🚀"

);
