import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initTrainers() {

    const cards = gsap.utils.toArray(".trainer-card");

    if (!cards.length) return;

    // =====================================
    // Появление карточек
    // =====================================

    gsap.set(cards, {
        opacity: 0,
        y: 90,
        rotateX: 12,
        transformPerspective: 1200
    });

    gsap.to(cards, {

        opacity: 1,

        y: 0,

        rotateX: 0,

        duration: 1.1,

        ease: "power4.out",

        stagger: 0.14,

        scrollTrigger:{

            trigger:".trainers",

            start:"top 70%",

            once:true

        }

    });

    cards.forEach((card,index)=>{

        gsap.to(card,{

            delay:index*0.03

        });

    });

    // =====================================
    // Apple 3D Tilt
    // =====================================

    if (window.innerWidth > 992) {

        cards.forEach((card) => {

            const image = card.querySelector("img");
            const info = card.querySelector(".trainer-info");

            card.addEventListener("mousemove", (e) => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateY = (x / rect.width - 0.5) * 8;
                const rotateX = -(y / rect.height - 0.5) * 8;

                gsap.to(card, {

                    rotateX,
                    rotateY,

                    duration: 0.45,

                    ease: "power3.out"

                });

                gsap.to(image, {

                    x: rotateY * 4,
                    y: rotateX * -4,

                    scale: 1.12,

                    duration: 0.55,

                    ease: "power3.out"

                });

                gsap.to(info, {

                    x: rotateY * 1.5,
                    y: rotateX * -1.5,

                    duration: 0.55,

                    ease: "power3.out"

                });

            });

            card.addEventListener("mouseleave", () => {

                gsap.to(card, {

                    rotateX:0,
                    rotateY:0,

                    duration:.7,

                    ease:"power3.out"

                });

                gsap.to(image, {

                    x:0,
                    y:0,
                    scale:1,

                    duration:.7,

                    ease:"power3.out"

                });

                gsap.to(info, {

                    x:0,
                    y:0,

                    duration:.7,

                    ease:"power3.out"

                });

            });

        });

    }

    // =====================================
    // Background Glow
    // =====================================

    gsap.to(".trainers-glow-left",{

        y:-120,

        ease:"none",

        scrollTrigger:{

            trigger:".trainers",

            start:"top bottom",

            end:"bottom top",

            scrub:true

        }

    });

    gsap.to(".trainers-glow-right",{

        y:120,

        ease:"none",

        scrollTrigger:{

            trigger:".trainers",

            start:"top bottom",

            end:"bottom top",

            scrub:true

        }

    });

}
