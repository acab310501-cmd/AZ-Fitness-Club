export function initStats() {

    const numbers = document.querySelectorAll(".stat-number");

    if (!numbers.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;

            const target = +el.dataset.target;

            let current = 0;

            const increment = Math.ceil(target / 60);

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                el.textContent = current + (target > 100 ? "+" : "%");

            },20);

            observer.unobserve(el);

        });

    },{

        threshold:.5

    });

    numbers.forEach(number=>observer.observe(number));

}