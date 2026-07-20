/**
 * AZ FITNESS CLUB
 * Cinema Gallery
 *
 * Отвечает только за поведение галерей:
 * - autoplay
 * - ручное переключение
 * - swipe на телефоне
 * - drag мышью на компьютере
 * - точки навигации
 * - progress bar
 * - пауза при взаимодействии
 */

class CinemaGallery {

    constructor(element) {

        this.gallery = element;

        this.slides = Array.from(

            this.gallery.querySelectorAll(

                "[data-slide]"

            )

        );

        this.dots = Array.from(

            this.gallery.querySelectorAll(

                "[data-dot]"

            )

        );

        this.progressBar =

            this.gallery.querySelector(

                "[data-progress]"

            );

        this.currentIndex = 0;

        this.autoplayDelay = 6000;

        this.autoplayTimer = null;

        this.resumeTimer = null;

        this.isDragging = false;

        this.startX = 0;

        this.currentX = 0;

        this.dragDistance = 0;

        this.init();

    }


    init() {

        if (!this.slides.length) {

            return;

        }

        this.bindEvents();

        this.showSlide(

            this.currentIndex,

            false

        );

        this.startAutoplay();

    }


    bindEvents() {

        /*
         * Клик по точкам
         */

        this.dots.forEach(

            (dot, index) => {

                dot.addEventListener(

                    "click",

                    () => {

                        this.goTo(index);

                    }

                );

            }

        );


        /*
         * Touch events
         */

        this.gallery.addEventListener(

            "touchstart",

            (event) => {

                const touch =

                    event.touches[0];

                this.startDrag(

                    touch.clientX

                );

            },

            {

                passive: true

            }

        );


        this.gallery.addEventListener(

            "touchmove",

            (event) => {

                const touch =

                    event.touches[0];

                this.moveDrag(

                    touch.clientX

                );

            },

            {

                passive: true

            }

        );


        this.gallery.addEventListener(

            "touchend",

            () => {

                this.endDrag();

            }

        );


        /*
         * Mouse events
         */

        this.gallery.addEventListener(

            "mousedown",

            (event) => {

                event.preventDefault();

                this.startDrag(

                    event.clientX

                );

            }

        );


        window.addEventListener(

            "mousemove",

            (event) => {

                if (!this.isDragging) {

                    return;

                }

                this.moveDrag(

                    event.clientX

                );

            }

        );


        window.addEventListener(

            "mouseup",

            () => {

                if (!this.isDragging) {

                    return;

                }

                this.endDrag();

            }

        );


        /*
         * Наведение мыши
         */

        this.gallery.addEventListener(

            "mouseenter",

            () => {

                this.pauseAutoplay();

            }

        );


        this.gallery.addEventListener(

            "mouseleave",

            () => {

                this.resumeAutoplay();

            }

        );


        /*
         * Клавиатура
         */

        this.gallery.addEventListener(

            "keydown",

            (event) => {

                if (

                    event.key ===

                    "ArrowRight"

                ) {

                    this.goTo(

                        this.currentIndex + 1

                    );

                }


                if (

                    event.key ===

                    "ArrowLeft"

                ) {

                    this.goTo(

                        this.currentIndex - 1

                    );

                }

            }

        );

    }


    startDrag(x) {

        this.isDragging = true;

        this.startX = x;

        this.currentX = x;

        this.dragDistance = 0;

        this.pauseAutoplay();

    }


    moveDrag(x) {

        if (!this.isDragging) {

            return;

        }

        this.currentX = x;

        this.dragDistance =

            this.currentX -

            this.startX;

    }


    endDrag() {

        if (!this.isDragging) {

            return;

        }

        const threshold = 60;

        const distance =

            this.dragDistance;

        this.isDragging = false;

        if (

            Math.abs(distance) >=

            threshold

        ) {

            if (distance < 0) {

                this.goTo(

                    this.currentIndex + 1

                );

            }

            else {

                this.goTo(

                    this.currentIndex - 1

                );

            }

        }

        else {

            this.resumeAutoplay();

        }

    }


    goTo(index) {

        const total =

            this.slides.length;

        if (!total) {

            return;

        }

        const nextIndex =

            (

                index + total

            ) % total;

        if (

            nextIndex ===

            this.currentIndex

        ) {

            this.restartAutoplay();

            return;

        }

        this.showSlide(

            nextIndex,

            true

        );

        this.restartAutoplay();

    }


    showSlide(index, animate = true) {

        this.slides.forEach(

            (slide, slideIndex) => {

                slide.classList.toggle(

                    "is-active",

                    slideIndex === index

                );

                slide.classList.toggle(

                    "is-visible",

                    slideIndex === index

                );

            }

        );


        this.dots.forEach(

            (dot, dotIndex) => {

                dot.classList.toggle(

                    "is-active",

                    dotIndex === index

                );

            }

        );


        this.currentIndex = index;


        this.resetProgress();


        if (!animate) {

            this.gallery.classList.add(

                "is-ready"

            );

        }

    }


    resetProgress() {

        if (!this.progressBar) {

            return;

        }

        this.progressBar.style.transition =

            "none";

        this.progressBar.style.width =

            "0%";


        requestAnimationFrame(

            () => {

                requestAnimationFrame(

                    () => {

                        this.progressBar.style.transition =

                            `width ${this.autoplayDelay}ms linear`;

                        this.progressBar.style.width =

                            "100%";

                    }

                );

            }

        );

    }


    startAutoplay() {

        this.clearAutoplay();

        this.autoplayTimer =

            setInterval(

                () => {

                    this.goTo(

                        this.currentIndex + 1

                    );

                },

                this.autoplayDelay

            );

    }


    pauseAutoplay() {

        this.clearAutoplay();

        clearTimeout(

            this.resumeTimer

        );

    }


    resumeAutoplay() {

        clearTimeout(

            this.resumeTimer

        );

        this.resumeTimer =

            setTimeout(

                () => {

                    this.startAutoplay();

                },

                5000

            );

    }


    restartAutoplay() {

        this.pauseAutoplay();

        this.resumeAutoplay();

    }


    clearAutoplay() {

        clearInterval(

            this.autoplayTimer

        );

        this.autoplayTimer =

            null;

    }

}


/**
 * Инициализация всех галерей
 */

export function initCinemaGalleries() {

    const galleries =

        document.querySelectorAll(

            "[data-gallery]"

        );

    galleries.forEach(

        (gallery) => {

            new CinemaGallery(

                gallery

            );

        }

    );

}