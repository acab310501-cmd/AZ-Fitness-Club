export function initHeader() {
    const header = document.querySelector(".header");

    if (!header) return;

    let lastScroll = 0;
    const scrollOffset = 80;

    const updateHeader = () => {
        const currentScroll = window.pageYOffset;

        // Стеклянный эффект
        if (currentScroll > scrollOffset) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }

        // Не скрываем шапку в самом верху
        if (currentScroll <= 120) {
            header.classList.remove("header-hidden");
            lastScroll = currentScroll;
            return;
        }

        // Скролл вниз
        if (currentScroll > lastScroll) {
            header.classList.add("header-hidden");
        }

        // Скролл вверх
        else {
            header.classList.remove("header-hidden");
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

    // Плавная прокрутка по якорям
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    updateHeader();
}

