import { spaces } from "../data/spaces.js";

export function initCinemaGalleries() {

    const container = document.getElementById("spaces-gallery");

    if (!container) return;

    container.innerHTML = "";

spaces.forEach(space=>{

    const gallery=createGallery(space);

    container.appendChild(gallery);

    setupGallery(gallery);

});
}

function createGallery(space) {

    const section = document.createElement("section");

    section.className = "club-space";

    section.innerHTML = `

        <div class="space-info">

            <span class="space-number">${space.number}</span>

            <h2>${space.title}</h2>

            <p>${space.subtitle}</p>

            <ul class="space-features">

                ${space.features
                    .map(item => `<li>${item}</li>`)
                    .join("")}

            </ul>

        </div>

        <div class="cinema-gallery">

            <div class="cinema-gallery__viewport">

                <div class="cinema-gallery__track">

                    ${space.images
                        .map((image, index) => {

                            return `

                            <div class="cinema-gallery__slide">

                                <img
                                    src="${image}"
                                    alt="${space.captions[index]}"
                                >

                                <div class="cinema-gallery__overlay"></div>

                                <div class="cinema-gallery__content">

                                    <span>

                                        ${String(index + 1).padStart(2, "0")}

                                    </span>

                                    <h3>${space.captions[index]}</h3>

                                    <p>${space.descriptions[index]}</p>

                                </div>

                            </div>

                            `;

                        })
                        .join("")}

                </div>

            </div>

            <div class="cinema-gallery__dots"></div>

        </div>

    `;

    return section;

}

function setupGallery(gallery){

    const track = gallery.querySelector(".cinema-gallery__track");

    const slides = gallery.querySelectorAll(".cinema-gallery__slide");

    const dotsContainer = gallery.querySelector(".cinema-gallery__dots");

    let current = 0;

    slides.forEach((slide,index)=>{

        const dot = document.createElement("button");

        dot.className = "cinema-gallery__dot";

        if(index===0){

            dot.classList.add("active");

        }

        dot.addEventListener("click",()=>{

            current=index;

            update();

            restart();

        });

        dotsContainer.appendChild(dot);

    });

    const dots = dotsContainer.querySelectorAll(".cinema-gallery__dot");

    function update(){

        track.style.transform =
            `translateX(-${current*100}%)`;

        dots.forEach(dot=>dot.classList.remove("active"));

        dots[current].classList.add("active");

    }

    function next(){

        current++;

        if(current>=slides.length){

            current=0;

        }

        update();

    }

    let timer=setInterval(next,6000);

    function restart(){

        clearInterval(timer);

        timer=setInterval(next,6000);

    }

    update();

}