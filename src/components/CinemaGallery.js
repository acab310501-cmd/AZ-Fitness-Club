/* ==========================================================
   AZ FITNESS CLUB
   CINEMA GALLERY
========================================================== */

export class CinemaGallery {

    constructor(element, options = {}) {

        this.element = element;

        this.options = {

            autoplayDelay: 6000,

            resumeDelay: 5000,

            swipeThreshold: 60,

            ...options

        };

        this.slides = [

            ...this.element.querySelectorAll("[data-slide]")

        ];

        this.progressBar =
            this.element.querySelector(
                ".cinema-gallery__progress-bar"
            );

        this.currentIndex = 0;

        this.timer = null;

        this.resumeTimer = null;

        this.isDragging = false;

        this.isAnimating = false;

        this.startX = 0;

        this.currentX = 0;

        this.dragOffset = 0;

        this.pointerId = null;

        this.isHovered = false;

        this.init();

    }


    /* ======================================================
       INIT
    ====================================================== */

    init() {

        if (!this.element || !this.slides.length) {

            return;

        }

        this.bindEvents();

        this.setInitialState();

        this.startAutoplay();

    }


    /* ======================================================
       INITIAL STATE
    ====================================================== */

    setInitialState() {

        this.slides.forEach((slide, index) => {

            slide.classList.toggle(

                "is-active",

                index === this.currentIndex

            );

            slide.style.transform =
                index === this.currentIndex
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(100%, 0, 0)";

        });

        this.resetProgress();

    }


    /* ======================================================
       EVENTS
    ====================================================== */

    bindEvents() {

        /* -------------------------
           POINTER DOWN
        ------------------------- */

        this.element.addEventListener(

            "pointerdown",

            this.handlePointerDown.bind(this)

        );


        /* -------------------------
           POINTER MOVE
        ------------------------- */

        this.element.addEventListener(

            "pointermove",

            this.handlePointerMove.bind(this)

        );


        /* -------------------------
           POINTER UP
        ------------------------- */

        this.element.addEventListener(

            "pointerup",

            this.handlePointerUp.bind(this)

        );


        /* -------------------------
           POINTER CANCEL
        ------------------------- */

        this.element.addEventListener(

            "pointercancel",

            this.handlePointerUp.bind(this)

        );


        /* -------------------------
           POINTER LEAVE
        ------------------------- */

        this.element.addEventListener(

            "pointerleave",

            this.handlePointerUp.bind(this)

        );


        /* -------------------------
           MOUSE HOVER
        ------------------------- */

        this.element.addEventListener(

            "mouseenter",

            () => {

                this.isHovered = true;

                this.pauseAutoplay();

            }

        );


        this.element.addEventListener(

            "mouseleave",

            () => {

                this.isHovered = false;

                this.scheduleResume();

            }

        );


        /* -------------------------
           KEYBOARD
        ------------------------- */

        this.element.addEventListener(

            "keydown",

            (event) => {

                if (event.key === "ArrowRight") {

                    this.goToNext();

                }

                if (event.key === "ArrowLeft") {

                    this.goToPrevious();

                }

            }

        );


        this.element.setAttribute(

            "tabindex",

            "0"

        );


        /* -------------------------
           VISIBILITY
        ------------------------- */

        document.addEventListener(

            "visibilitychange",

            () => {

                if (document.hidden) {

                    this.pauseAutoplay();

                } else {

                    this.scheduleResume();

                }

            }

        );

    }


    /* ======================================================
       POINTER DOWN
    ====================================================== */

    handlePointerDown(event) {

        if (this.isAnimating) {

            return;

        }

        this.isDragging = true;

        this.pointerId = event.pointerId;

        this.startX = event.clientX;

        this.currentX = event.clientX;

        this.dragOffset = 0;

        this.pauseAutoplay();

        this.clearResumeTimer();

        this.element.setPointerCapture(

            event.pointerId

        );

    }


    /* ======================================================
       POINTER MOVE
    ====================================================== */

    handlePointerMove(event) {

        if (!this.isDragging) {

            return;

        }

        if (event.pointerId !== this.pointerId) {

            return;

        }

        this.currentX = event.clientX;

        this.dragOffset =

            this.currentX - this.startX;

        this.updateDragPosition();

    }


    /* ======================================================
       DRAG POSITION
    ====================================================== */

    updateDragPosition() {

        const currentSlide =

            this.slides[this.currentIndex];


        const nextIndex =

            this.getNextIndex();


        const previousIndex =

            this.getPreviousIndex();


        const offset =

            this.dragOffset;


        currentSlide.style.transition =

            "none";


        currentSlide.style.transform =

            `translate3d(${offset}px, 0, 0)`;


        if (offset < 0) {

            const nextSlide =

                this.slides[nextIndex];


            nextSlide.style.transition =

                "none";


            nextSlide.style.transform =

                `translate3d(calc(100% + ${offset}px), 0, 0)`;

        }


        if (offset > 0) {

            const previousSlide =

                this.slides[previousIndex];


            previousSlide.style.transition =

                "none";


            previousSlide.style.transform =

                `translate3d(calc(-100% + ${offset}px), 0, 0)`;

        }

    }


    /* ======================================================
       POINTER UP
    ====================================================== */

    handlePointerUp(event) {

        if (!this.isDragging) {

            return;

        }

        if (

            event.pointerId &&

            event.pointerId !== this.pointerId

        ) {

            return;

        }

        this.isDragging = false;

        const distance =

            this.currentX - this.startX;


        if (

            Math.abs(distance) >=

            this.options.swipeThreshold

        ) {

            if (distance < 0) {

                this.goToNext(

                    distance

                );

            } else {

                this.goToPrevious(

                    distance

                );

            }

        } else {

            this.cancelDrag();

        }

        this.scheduleResume();

    }


    /* ======================================================
       CANCEL DRAG
    ====================================================== */

    cancelDrag() {

        const currentSlide =

            this.slides[this.currentIndex];


        currentSlide.style.transition =

            "transform 0.45s cubic-bezier(.22,.61,.36,1)";


        currentSlide.style.transform =

            "translate3d(0, 0, 0)";


        const nextSlide =

            this.slides[this.getNextIndex()];


        const previousSlide =

            this.slides[this.getPreviousIndex()];


        nextSlide.style.transition =

            "transform 0.45s cubic-bezier(.22,.61,.36,1)";


        previousSlide.style.transition =

            "transform 0.45s cubic-bezier(.22,.61,.36,1)";


        nextSlide.style.transform =

            "translate3d(100%, 0, 0)";


        previousSlide.style.transform =

            "translate3d(-100%, 0, 0)";

    }


    /* ======================================================
       NEXT
    ====================================================== */

    goToNext(dragDistance = 0) {

        if (this.isAnimating) {

            return;

        }

        const nextIndex =

            this.getNextIndex();


        this.animateTo(

            nextIndex,

            "next",

            dragDistance

        );

    }


    /* ======================================================
       PREVIOUS
    ====================================================== */

    goToPrevious(dragDistance = 0) {

        if (this.isAnimating) {

            return;

        }

        const previousIndex =

            this.getPreviousIndex();


        this.animateTo(

            previousIndex,

            "previous",

            dragDistance

        );

    }


    /* ======================================================
       ANIMATE
    ====================================================== */

    animateTo(

        targetIndex,

        direction,

        dragDistance = 0

    ) {

        this.isAnimating = true;


        const currentSlide =

            this.slides[this.currentIndex];


        const targetSlide =

            this.slides[targetIndex];


        const directionMultiplier =

            direction === "next"

                ? -1

                : 1;


        const width =

            this.element.offsetWidth;


        const currentPosition =

            dragDistance || 0;


        const targetStartPosition =

            direction === "next"

                ? width + currentPosition

                : -width + currentPosition;


        targetSlide.style.transition =

            "none";


        targetSlide.style.transform =

            `translate3d(${targetStartPosition}px, 0, 0)`;


        requestAnimationFrame(() => {

            currentSlide.style.transition =

                "transform 0.7s cubic-bezier(.22,.61,.36,1)";


            targetSlide.style.transition =

                "transform 0.7s cubic-bezier(.22,.61,.36,1)";


            currentSlide.style.transform =

                `translate3d(${directionMultiplier * width}px, 0, 0)`;


            targetSlide.style.transform =

                "translate3d(0, 0, 0)";

        });


        setTimeout(() => {

            currentSlide.classList.remove(

                "is-active"

            );


            targetSlide.classList.add(

                "is-active"

            );


            currentSlide.style.transition =

                "none";


            currentSlide.style.transform =

                direction === "next"

                    ? "translate3d(100%, 0, 0)"

                    : "translate3d(-100%, 0, 0)";


            this.currentIndex =

                targetIndex;


            this.isAnimating = false;


            this.resetProgress();

        }, 720);

    }


    /* ======================================================
       AUTOPLAY
    ====================================================== */

    startAutoplay() {

        this.clearAutoplay();

        this.resetProgress();


        this.timer = setTimeout(() => {

            if (

                !this.isHovered &&

                !this.isDragging &&

                !document.hidden

            ) {

                this.goToNext();

            }

            this.startAutoplay();

        }, this.options.autoplayDelay);

    }


    /* ======================================================
       PAUSE
    ====================================================== */

    pauseAutoplay() {

        this.clearAutoplay();

        this.pauseProgress();

    }


    /* ======================================================
       RESUME
    ====================================================== */

    scheduleResume() {

        this.clearResumeTimer();

        this.clearAutoplay();

        this.pauseProgress();


        this.resumeTimer = setTimeout(() => {

            if (

                !this.isHovered &&

                !this.isDragging &&

                !document.hidden

            ) {

                this.startAutoplay();

            }

        }, this.options.resumeDelay);

    }


    /* ======================================================
       PROGRESS
    ====================================================== */

    resetProgress() {

        if (!this.progressBar) {

            return;

        }

        this.progressBar.style.transition =

            "none";


        this.progressBar.style.width =

            "0%";


        requestAnimationFrame(() => {

            this.progressBar.style.transition =

                `width ${this.options.autoplayDelay}ms linear`;


            this.progressBar.style.width =

                "100%";

        });

    }


    pauseProgress() {

        if (!this.progressBar) {

            return;

        }

        const computedStyle =

            window.getComputedStyle(

                this.progressBar

            );


        const currentWidth =

            computedStyle.width;


        this.progressBar.style.transition =

            "none";


        this.progressBar.style.width =

            currentWidth;

    }


    /* ======================================================
       INDEX HELPERS
    ====================================================== */

    getNextIndex() {

        return (

            this.currentIndex + 1

        ) % this.slides.length;

    }


    getPreviousIndex() {

        return (

            this.currentIndex -

            1 +

            this.slides.length

        ) % this.slides.length;

    }


    /* ======================================================
       TIMER HELPERS
    ====================================================== */

    clearAutoplay() {

        if (this.timer) {

            clearTimeout(

                this.timer

            );

            this.timer = null;

        }

    }


    clearResumeTimer() {

        if (this.resumeTimer) {

            clearTimeout(

                this.resumeTimer

            );

            this.resumeTimer = null;

        }

    }


    /* ======================================================
       DESTROY
    ====================================================== */

    destroy() {

        this.clearAutoplay();

        this.clearResumeTimer();

        this.slides.forEach((slide) => {

            slide.style.transform = "";

            slide.style.transition = "";

        });

    }

}


/* ==========================================================
   AUTO INITIALIZATION
========================================================== */

export function initCinemaGalleries() {

    const galleries =

        document.querySelectorAll(

            "[data-gallery]"

        );


    galleries.forEach((gallery) => {

        new CinemaGallery(

            gallery

        );

    });

}