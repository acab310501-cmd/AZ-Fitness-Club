export function createImageCarousel(options) {

    const {

        images = [],

        className = ""

    } = options;



    let current = 0;

    let autoplay = null;



    // ===============================
    // DOM
    // ===============================

    const root = document.createElement("div");
    root.className = `carousel ${className}`.trim();



    const image = document.createElement("img");
    image.className = "carousel__image";



    const overlay = document.createElement("div");
    overlay.className = "carousel__overlay";



    const progress = document.createElement("div");
    progress.className = "carousel__progress";



    const info = document.createElement("div");
    info.className = "carousel__info";



    const title = document.createElement("h3");
    title.className = "carousel__title";



    const description = document.createElement("p");
    description.className = "carousel__description";



    const dots = document.createElement("div");
    dots.className = "carousel__dots";



    info.append(title);

    info.append(description);



    root.append(image);

    root.append(overlay);

    root.append(progress);

    root.append(info);

    root.append(dots);

// ======================================
// RENDER DOTS
// ======================================

function renderDots() {

    dots.innerHTML = "";

    images.forEach((item, index) => {

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



// ======================================
// RENDER
// ======================================

function render() {

    const slide = images[current];

    image.src = slide.src;

    image.alt = slide.alt;

    title.textContent = slide.title;

    description.textContent = slide.description;

    renderDots();

}

render();

// ======================================
// NEXT
// ======================================

function nextSlide() {

    current++;

    if (current >= images.length) {

        current = 0;

    }

    render();

}



// ======================================
// PREVIOUS
// ======================================

function prevSlide() {

    current--;

    if (current < 0) {

        current = images.length - 1;

    }

    render();

}



// ======================================
// GO TO
// ======================================

function goToSlide(index) {

    current = index;

    render();

}

    return root;

}