import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {

    // ==========================================
    // Универсальное появление элементов
    // ==========================================

    gsap.utils.toArray(".reveal").forEach((element) => {

        gsap.from(element, {

            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: element,
                start: "top 82%",
                toggleActions: "play none none none"
            }

        });

    });

    // ==========================================
    // Fade Up
    // ==========================================

    gsap.utils.toArray(".fade-up").forEach((element) => {

        gsap.from(element, {

            y: 50,
            opacity: 0,
            duration: .8,
            ease: "power2.out",

            scrollTrigger: {
                trigger: element,
                start: "top 85%"
            }

        });

    });

    // ==========================================
    // Scale
    // ==========================================

    gsap.utils.toArray(".scale-in").forEach((element) => {

        gsap.from(element, {

            scale: .92,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: element,
                start: "top 85%"
            }

        });

    });

    // ==========================================
    // Parallax
    // ==========================================

    gsap.utils.toArray(".parallax").forEach((image) => {

        gsap.to(image, {

            yPercent: -10,

            ease: "none",

            scrollTrigger: {

                trigger: image,

                start: "top bottom",

                end: "bottom top",

                scrub: true

            }

        });

    });

    // ==========================================
    // Membership Cards
    // ==========================================

    const membershipCards = gsap.utils.toArray(".membership-card");

    if (membershipCards.length) {

        gsap.from(membershipCards, {

            y: 80,

            opacity: 0,

            scale: 0.94,

            duration: 1,

            stagger: 0.15,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".membership",

                start: "top 75%",

                once: true

            }

        });

    }

}
