import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initExperience() {

    const section = document.querySelector(".experience");

    if (!section) return;

    // ==========================================
    // Заголовок
    // ==========================================

    gsap.from(".experience-heading", {

        y: 80,

        opacity: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: section,

            start: "top 75%"

        }

    });

    // ==========================================
    // Текст
    // ==========================================

    gsap.from(".experience-text", {

        y: 60,

        opacity: 0,

        duration: .9,

        delay: .15,

        ease: "power3.out",

        scrollTrigger: {

            trigger: section,

            start: "top 75%"

        }

    });

    // ==========================================
    // Фото
    // ==========================================

    gsap.from(".experience-image", {

        y: 120,

        opacity: 0,

        duration: 1.2,

        ease: "power4.out",

        scrollTrigger: {

            trigger: ".experience-image",

            start: "top 82%"

        }

    });

    // ==========================================
    // Glass карточка
    // ==========================================

    gsap.from(".experience-card", {

        y: 50,

        opacity: 0,

        duration: .9,

        delay: .4,

        ease: "power3.out",

        scrollTrigger: {

            trigger: ".experience-image",

            start: "top 82%"

        }

    });

    // ==========================================
    // Параллакс фото
    // ==========================================

    gsap.to(".experience-image img", {

        yPercent: -10,

        ease: "none",

        scrollTrigger: {

            trigger: ".experience",

            start: "top bottom",

            end: "bottom top",

            scrub: true

        }

    });

    // ==========================================
    // Mouse Move
    // ==========================================

    const image = document.querySelector(".experience-image");

    const card = document.querySelector(".experience-card");

    if (image && card) {

        image.addEventListener("mousemove", (e) => {

            const rect = image.getBoundingClientRect();

            const x = (e.clientX - rect.left) / rect.width - 0.5;

            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {

                x: x * 18,

                y: y * 18,

                duration: .5,

                ease: "power2.out"

            });

        });

        image.addEventListener("mouseleave", () => {

            gsap.to(card, {

                x: 0,

                y: 0,

                duration: .6,

                ease: "power3.out"

            });

        });

    }

}
