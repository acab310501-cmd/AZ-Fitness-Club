export function createImageCarousel(options) {

    const { images, className = "" } = options;

    let current = 0;

    const root = document.createElement("div");
    root.className = `carousel ${className}`.trim();

    const image = document.createElement("img");
    image.className = "carousel__image";

    const prevButton = document.createElement("button");
    prevButton.className = "carousel__button carousel__button--prev";
    prevButton.textContent = "‹";

    const nextButton = document.createElement("button");
    nextButton.className = "carousel__button carousel__button--next";
    nextButton.textContent = "›";

    const dots = document.createElement("div");
    dots.className = "carousel__dots";

    const counter = document.createElement("div");
    counter.className = "carousel__counter";

    const info = document.createElement("div");

info.className = "carousel__info";

const title = document.createElement("h3");

title.className = "carousel__title";

const description = document.createElement("p");

description.className = "carousel__description";

info.appendChild(title);

info.appendChild(description);



    function renderDots() {

        dots.innerHTML = "";

        images.forEach((_, index) => {

            const dot = document.createElement("button");

            dot.className = "carousel__dot";

            if (index === current) {
                dot.classList.add("is-active");
            }

            dot.addEventListener("click", () => {

                current = index;

                render();

            });

            dots.appendChild(dot);

        });

    }


function render() {

    image.src = images[current].src;

    image.alt = images[current].alt;

    title.textContent = images[current].title;

    description.textContent = images[current].description;
    counter.textContent = `${current + 1} / ${images.length}`;

    renderDots();

}



    nextButton.addEventListener("click", () => {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        render();

    });



    prevButton.addEventListener("click", () => {

        current--;

        if (current < 0) {
            current = images.length - 1;
        }

        render();

    });



    root.appendChild(image);

    root.appendChild(prevButton);

    root.appendChild(nextButton);

    root.appendChild(counter);

    root.appendChild(info);

    root.appendChild(dots);

    render();

    return root;

}
