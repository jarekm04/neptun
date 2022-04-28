import { db } from "../firebase.js";
import { doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

//--------------------------------------mobile hamburger menu-------------------------------------
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

//----------------------------swiper theory carousel--------------------------------------------
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

//--------------------------AOS fade in sections--------------------------------------------
AOS.init();

//--------------------------firebase get news-----------------------------------------------
const colRef = collection(db, "News");
// let newArr = arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const $newsSection = document.querySelector(".news__section");
const newArticle = document.createElement("article");
console.log($newsSection)
getDocs(colRef)
    .then((snapshot) => {
        let news = [];
        snapshot.docs.forEach((doc) => {
            news.push({ ...doc.data(), id: doc.id })
        })
        news.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        generateNews(news);
    })
    .catch(err => {
        console.log(err.message);
    });

function generateNews(news) {
    let newsHTML = '';
    for (let i = 0; i < 3; i++) {
        newsHTML = `
            <article class="section__article" data-aos="fade-up" data-aos-offset="-100" data-aos-delay="0">
                <div class="article__info">
                    <div class="info__date">${news[i].date}</div>
                    <i class="fa-solid fa-circle-info info__icon"></i>
                </div>
                <h3 class="article__title">relacja z zawodów</h3>
                <p class="article__author">przez Jerry Maguire</p>
                <p class="article__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos fugit incidunt ipsa
                    ipsam modi officiis pariatur quasi sint sit tempore? Vestibulum nec est vitae felis dapibus blandit ac
                    eget nunc. Donec mi justo, pharetra vel condimentum ac, facilisis non orci. Morbi non est vel purus
                    convallis bibendum rutrum in lectus. Vestibulum nec est vitae felis dapibus blandit ac eget nunc.</p>
                <a href="#" class="article__more">Czytaj więcej<span class="material-icons">east</span></a>
            </article>
        `
    }
}