export function initHeader() {
    const header = document.querySelector(".header");
    const navWrapper = document.getElementById("navWrapper");
    const menuToggle = document.getElementById("menuToggle");

    if (!header) return;

    let lastScroll = 0;
    const scrollOffset = 80;

    const updateHeader = () => {
        const currentScroll = window.pageYOffset;

        // Стеклянный эффект — шапка, меню и кнопка синхронны
        if (currentScroll > scrollOffset) {
            header.classList.add("header-scrolled");
            navWrapper?.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
            navWrapper?.classList.remove("header-scrolled");
        }

        // Не скрываем шапку в самом верху
        if (currentScroll <= 120) {
            header.classList.remove("header-hidden");
            navWrapper?.classList.remove("header-hidden");
            menuToggle?.classList.remove("header-hidden");
            lastScroll = currentScroll;
            return;
        }

        const isMenuOpen = navWrapper?.classList.contains("is-open");

        // Скролл вниз (не прячем, если меню открыто)
        if (currentScroll > lastScroll && !isMenuOpen) {
            header.classList.add("header-hidden");
            navWrapper?.classList.add("header-hidden");
            menuToggle?.classList.add("header-hidden");
        }

        // Скролл вверх
        else if (currentScroll < lastScroll) {
            header.classList.remove("header-hidden");
            navWrapper?.classList.remove("header-hidden");
            menuToggle?.classList.remove("header-hidden");
        }

        lastScroll = currentScroll;
    };

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });

                ticking = true;
            }
        },
        { passive: true }
    );

    // ==========================================
    // Мобильное меню
    // ==========================================

    function openMobileMenu() {
        navWrapper?.classList.add("is-open");
        menuToggle?.classList.add("is-open");
        menuToggle?.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        navWrapper?.classList.remove("is-open");
        menuToggle?.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navWrapper.classList.contains("is-open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Закрываем меню при увеличении окна обратно до десктопа
        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                closeMobileMenu();
            }
        });
    }

    // Плавная прокрутка по якорям + закрытие мобильного меню при клике
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            closeMobileMenu();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    updateHeader();
}
