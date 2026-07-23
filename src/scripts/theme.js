// ==========================================================
// AZ FITNESS CLUB — THEME / VIEWPORT UTILITIES
// ==========================================================

// ----------------------------------------------------------
// Мобильный fix для 100vh (адресная строка Safari/Chrome
// съедает часть высоты экрана — пересчитываем реальную
// высоту через CSS-переменную --vh)
// ----------------------------------------------------------

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setViewportHeight();

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setViewportHeight, 150);
});

window.addEventListener("orientationchange", setViewportHeight);

// ----------------------------------------------------------
// Уважаем prefers-reduced-motion — отключаем тяжёлые
// анимации и параллакс для тех, кто просил их не показывать
// ----------------------------------------------------------

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

function applyMotionPreference(matches) {
    document.documentElement.classList.toggle("reduce-motion", matches);
}

applyMotionPreference(prefersReducedMotion.matches);

if (prefersReducedMotion.addEventListener) {
    prefersReducedMotion.addEventListener("change", (e) =>
        applyMotionPreference(e.matches)
    );
}
