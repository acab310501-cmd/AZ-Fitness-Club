import { spaces } from "../data/spaces.js";

export function renderSpaces() {

    const container = document.getElementById("spaces-gallery");

    if (!container) return;

    container.innerHTML = "";

    spaces.forEach(space => {

        container.insertAdjacentHTML(
            "beforeend",
            createSpace(space)
        );

    });

}

function createSpace(space){

    return `

<section class="club-space reveal">

    <div class="space-info">

        <span class="space-number">
            ${space.number}
        </span>

        <h2>
            ${space.title}
        </h2>

        <p>
            ${space.subtitle}
        </p>

        <ul class="space-features">

            ${space.features
                .map(feature => `<li>${feature}</li>`)
                .join("")}

        </ul>

    </div>

    ${createGallery(space)}

</section>

`;

}

function createGallery(space){

    const hasMultiple = space.images.length > 1;

    return `

<div class="cinema-gallery" data-gallery>

    ${hasMultiple ? `
    <div class="cinema-gallery__progress" data-progress-track>
        <span class="cinema-gallery__progress-bar" data-progress></span>
    </div>
    ` : ""}

    <div class="cinema-gallery__viewport">

        ${createSlides(space)}

    </div>

    ${hasMultiple ? createDots(space) : ""}

</div>

`;

}

function createDots(space){

    return `
<div class="cinema-gallery__dots">
    ${space.images
        .map((_, index) => `<button class="cinema-gallery__dot" data-dot aria-label="Слайд ${index + 1}"></button>`)
        .join("")}
</div>
`;

}

function createSlides(space){

    return space.images.map((image,index)=>{

        return `

<div class="cinema-gallery__slide" data-slide>

    <div class="cinema-gallery__media">

        <img
            src="${import.meta.env.BASE_URL}${image}"
            alt="${space.captions[index]}"
            loading="lazy"
        >

    </div>

    <div class="cinema-gallery__overlay"></div>

    <div class="cinema-gallery__content">

        <span class="cinema-gallery__number">

            ${String(index+1).padStart(2,"0")}

        </span>

        <h3>

            ${space.captions[index]}

        </h3>

        <p>

            ${space.descriptions[index]}

        </p>

    </div>

</div>

`;

    }).join("");

}