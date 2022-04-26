//mobile hamburger menu
const hamburgerIcon = document.querySelector(".hamburger");
const menuList = document.querySelector(".header__menu");

hamburgerIcon.addEventListener("click", () => {
    menuList.classList.toggle("active");
    menuList.classList.contains("active") ? hamburgerIcon.textContent = "cancel" : hamburgerIcon.textContent = "menu";
});
document.querySelectorAll(".menu__item").forEach( item => item.addEventListener("click", () => {
    menuList.classList.remove("active");
    menuList.classList.contains("active") ? hamburgerIcon.textContent = "cancel" : hamburgerIcon.textContent = "menu";
}))

//swiper theory carousel
const $theory = document.querySelector(".theory");
let $theoryContentClassList;

if ($theory.classList.contains("theoryPages")) {
    $theoryContentClassList = [...document.querySelector(".theory-content").classList];
}

const handleInitialSlide = (sectionClasses) => {
    if (sectionClasses.includes("history")) {
        return 0;
    } else if (sectionClasses.includes("secrets")) {
        return 1;
    } else if (sectionClasses.includes("techniques")) {
        return 2;
    } else if (sectionClasses.includes("fight")) {
        return 3;
    } else if (sectionClasses.includes("selfDefense")) {
        return 4;
    } else if (sectionClasses.includes("arrangements")) {
        return 5;
    } else if (sectionClasses.includes("hardening")) {
        return 6;
    }
}

const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: $theory.classList.contains("theoryPages") ? handleInitialSlide($theoryContentClassList) : 3,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

//AOS fade in sections
AOS.init();
