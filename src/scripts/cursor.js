import { gsap } from "gsap";

// ==========================================================
// AZ FITNESS CLUB — PREMIUM CURSOR
// Плавный глоу + точка с инерцией, магнитные кнопки.
// Полностью отключается на тач-устройствах.
// ==========================================================

const glow = document.querySelector(".cursor-glow");
const dot = document.querySelector(".cursor-dot");

const supportsCustomCursor =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (glow && dot && supportsCustomCursor) {

    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    let dotX = mouseX;
    let dotY = mouseY;

    let visible = false;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!visible) {
            visible = true;
            glow.style.opacity = "1";
            dot.style.opacity = "1";
        }
    });

    document.addEventListener("mouseleave", () => {
        visible = false;
        glow.style.opacity = "0";
        dot.style.opacity = "0";
    });

    // ======================================================
    // Плавный рендер-цикл (у глоу — более "дорогая" инерция)
    // ======================================================

    function render() {

        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;

        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;

        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    // ======================================================
    // Активное состояние над интерактивными элементами
    // ======================================================

    const interactiveSelector =
        'a, button, .join-btn, .hero-button, .trainer-btn, .plan-button, ' +
        '.space-button, .cinema-gallery, .about-card, .stat-card, ' +
        '.membership-card, [data-cursor]';

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest && e.target.closest(interactiveSelector)) {
            glow.classList.add("active");
            dot.classList.add("active");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest && e.target.closest(interactiveSelector)) {
            glow.classList.remove("active");
            dot.classList.remove("active");
        }
    });

    document.addEventListener("mousedown", () => dot.classList.add("is-pressed"));
    document.addEventListener("mouseup", () => dot.classList.remove("is-pressed"));

    // ======================================================
    // Магнитные кнопки — лёгкое притяжение к курсору
    // ======================================================

    const magneticEls = document.querySelectorAll(
        ".hero-button, .join-btn, .plan-button, .trainer-btn"
    );

    magneticEls.forEach((el) => {

        const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;

            moveX(relX * 0.25);
            moveY(relY * 0.35);
        });

        el.addEventListener("mouseleave", () => {
            moveX(0);
            moveY(0);
        });

    });

} else if (glow && dot) {

    // Тач-устройства — свой курсор не нужен
    glow.style.display = "none";
    dot.style.display = "none";

}
