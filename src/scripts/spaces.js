import { createImageCarousel } from "../components/carousel";
import { gymImages } from "./spaces";

export function initSpaces() {

    const container = document.querySelector("#gym-gallery");

    if (!container) return;

    const carousel = createImageCarousel({

        images: gymImages

    });

    container.appendChild(carousel);

}

export const gymImages = [

    {
        src: "/images/gym/1.webp",
        alt: "Главный тренировочный зал",

        title: "Главный тренировочный зал",

        description:
            "Просторное пространство площадью более 2500 м² с панорамным остеклением и премиальным оборудованием мирового уровня."
    },

    {
        src: "/images/gym/2.webp",
        alt: "Зона свободных весов",

        title: "Свободные веса",

        description:
            "Профессиональные стойки Eleiko, олимпийские платформы и полный набор гантелей для любого уровня подготовки."
    },

    {
        src: "/images/gym/3.webp",
        alt: "Technogym Artis",

        title: "Technogym Artis",

        description:
            "Новейшая линейка итальянских тренажёров, обеспечивающая максимальный комфорт и биомеханику движения."
    },

    {
        src: "/images/gym/4.webp",
        alt: "Функциональная зона",

        title: "Функциональный тренинг",

        description:
            "Пространство для кросс-тренинга, работы с собственным весом, канатами, санями и функциональным оборудованием."
    },

    {
        src: "/images/gym/5.webp",
        alt: "Интерьер зала",

        title: "Атмосфера клуба",

        description:
            "Каждая деталь интерьера создаёт ощущение приватного премиального пространства, в которое хочется возвращаться ежедневно."
    }

];