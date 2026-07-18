export function initGallery() {

    const galleries = document.querySelectorAll(".space-gallery");

    if (!galleries.length) return;

    galleries.forEach((gallery) => {

        const slides = gallery.querySelectorAll(".gallery-slide");

        const prev = gallery.querySelector(".gallery-prev");

        const next = gallery.querySelector(".gallery-next");

        const dots = gallery.querySelectorAll(".gallery-dot");

        let current = 0;

        function show(index){

            slides.forEach((slide)=>{

                slide.classList.remove("active");

            });

            dots.forEach((dot)=>{

                dot.classList.remove("active");

            });

            slides[index].classList.add("active");

            dots[index].classList.add("active");

            current = index;

        }

        next?.addEventListener("click",()=>{

            let index = current + 1;

            if(index >= slides.length){

                index = 0;

            }

            show(index);

        });

        prev?.addEventListener("click",()=>{

            let index = current - 1;

            if(index < 0){

                index = slides.length - 1;

            }

            show(index);

        });

        dots.forEach((dot,index)=>{

            dot.addEventListener("click",()=>{

                show(index);

            });

        });

        show(0);

    });

}