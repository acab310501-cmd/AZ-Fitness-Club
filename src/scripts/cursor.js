// ==========================================================
// AZ FITNESS CLUB
// CURSOR GLOW + MAGNETIC BUTTONS
// ==========================================================
//
// Работает только на устройствах с реальной мышью —
// на тач-устройствах эффект не нужен и не подключается.

export function initCursor() {

    const isDesktop = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!isDesktop) return;

    const glow = document.querySelector(".cursor-glow");

    if (!glow) return;

    // ==========================================
    // Плавное следование свечения за курсором
    // ==========================================

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderGlow() {

        // Инерция — свечение "догоняет" курсор, а не прыгает мгновенно
        glowX += (mouseX - glowX) * 0.14;
        glowY += (mouseY - glowY) * 0.14;

        glow.style.transform =
            `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

        requestAnimationFrame(renderGlow);

    }

    requestAnimationFrame(renderGlow);

    // ==========================================
    // Увеличение свечения над интерактивными элементами
    // ==========================================

    const interactiveSelector =
        "a, button, .trainer-card, .membership-card, .about-card, [data-gallery]";

    document.querySelectorAll(interactiveSelector).forEach((el) => {

        el.addEventListener("mouseenter", () => {
            glow.classList.add("active");
        });

        el.addEventListener("mouseleave", () => {
            glow.classList.remove("active");
        });

    });

    // ==========================================
    // Magnetic buttons — кнопки чуть "тянутся" к курсору
    // ==========================================

    const magneticSelector = ".hero-button, .join-btn, .plan-button";

    document.querySelectorAll(magneticSelector).forEach((button) => {

        button.addEventListener("mousemove", (e) => {

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.25}px, ${y * 0.35}px)`;

        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "translate(0, 0)";
        });

    });

}
