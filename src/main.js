// ==========================================================
// AZ FITNESS CLUB
// MAIN ENTRY
// ==========================================================


// ==========================================================
// STYLES
// ==========================================================

import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/stats.css";
import "./styles/trainers.css";
import "./styles/experience.css";
import "./styles/spaces.css";
import "./styles/membership.css";
import "./styles/animations.css";
import "./styles/themes.css";


// ==========================================================
// SCRIPTS
// ==========================================================

import "./scripts/header.js";
import "./scripts/hero.js";
import "./scripts/animations.js";
import "./scripts/stats.js";
import "./scripts/trainers.js";
import "./scripts/experience.js";
import "./scripts/theme.js";
import "./scripts/cursor.js";


// ==========================================================
// SPACES
// ==========================================================

import { renderSpaces } from "./scripts/renderSpaces.js";

import {

    initCinemaGalleries

} from "./components/CinemaGallery.js";


// ==========================================================
// PRELOADER
// ==========================================================

const preloader =

    document.getElementById(

        "preloader"

    );


if (preloader) {

    setTimeout(

        () => {

            preloader.classList.add(

                "is-hidden"

            );

        },

        1200

    );

}


// ==========================================================
// INITIALIZE SPACES
// ==========================================================

document.addEventListener(

    "DOMContentLoaded",

    () => {


        // Создаём пространства клуба

        renderSpaces();


        // Запускаем Cinema Gallery

        initCinemaGalleries();


    }

);


// ==========================================================
// GLOBAL DEBUG
// ==========================================================

console.log(

    "AZ Fitness Club loaded successfully 🚀"

);
