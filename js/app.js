//--------------------------AOS fade in sections--------------------------------------------
AOS.init();

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

const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 3,
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

//--------------------------firebase get news-----------------------------------------------
const colRef = collection(db, "News");

getDocs(colRef)
    .then((snapshot) => {
        let news = [];
        let importantNews = [];
        snapshot.docs.forEach((doc) => {
            news.push({ ...doc.data(), id: doc.id });
        })
        importantNews = news.filter((item) => item.isPopover === "yes");
        news = news.filter((item) => item.isPopover === "no");
        news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        generateNews(news);
        getFullSizeNews(news);
        generateImportantNews(importantNews);
    })
    .catch(err => {
        console.log(err.message);
    });

function generateNews(news) {
    let newsHTML = '';

    if (news.length > 3) {
        for (let i = 0; i < 3; i++) {
            newsHTML += `
            <article class="section__article" data-id="${news[i].id}" data-aos="fade-up" data-aos-offset="-100" data-aos-delay="0">
                <div class="article__info">
                    <div class="info__date">${news[i].date.slice(5, 11).split('.').reverse().join('.')}</div>
                    <i class="fa-solid info__icon ${news[i].icon === "triangle" ? "fa-triangle-exclamation" : "fa-circle-info"}"></i>
                </div>
                <h3 class="article__title">${news[i].title}</h3>
                <p class="article__author">przez ${news[i].name}</p>
                <p class="article__text">${news[i].newsContent.length > 400 ? news[i].newsContent.substring(0, 400) + "..." : news[i].newsContent}</p>
                <button class="article__more" style="${news[i].newsContent.length < 400 ? "display: none" : null}">Czytaj więcej<span class="material-icons">east</span></button>
            </article>
        `
        }
    } else {
        news.forEach((item) => {
            newsHTML += `
            <article class="section__article" data-aos="fade-up" data-aos-offset="-100" data-aos-delay="0">
                <div class="article__info">
                    <div class="info__date">${item.date.slice(5, 11).split('.').reverse().join('.')}</div>
                    <i class="fa-solid info__icon ${item.icon === "triangle" ? "fa-triangle-exclamation" : "fa-circle-info"}"></i>
                </div>
                <h3 class="article__title">${item.title}</h3>
                <p class="article__author">przez ${item.name}</p>
                <p class="article__text">${item.newsContent.length > 400 ? item.newsContent.substring(0, 400) + "..." : item.newsContent}</p>
                <a href="/" class="article__more">Czytaj więcej<span class="material-icons">east</span></a>
            </article>
        `
        })
    }
    document.querySelector(".news__section").innerHTML = newsHTML;
}

//-----------------   close read-more popup, show full size clicked news  ---------------------------------------
const $newsModal = document.querySelector(".news__modal");
const $modalArticle = document.querySelector(".modal__article");
const $modalDate = $modalArticle.children[0].children[0];
const $modalTitle = $modalArticle.children[1];
const $modalName = $modalArticle.children[2];
const $modalText = $modalArticle.children[3];

document.querySelector(".exit-icon").addEventListener("click", () => {
    $newsModal.classList.remove("isActive");
    $newsModal.classList.add("isHidden");
});

function getFullSizeNews(news) {
    const $readMoreBtns = document.querySelectorAll(".article__more");

    $readMoreBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const currentArticleID = e.target.parentElement.dataset.id;

            news.forEach((item) => {
                if (item.id === currentArticleID) {
                    $modalDate.textContent = item.date.slice(5, 11).split('.').reverse().join('.');
                    $modalTitle.textContent = item.title;
                    $modalName.textContent = item.name;
                    $modalText.textContent = item.newsContent;
                    $newsModal.classList.remove("isHidden");
                    $newsModal.classList.add("isActive");
                }
            })
        })
    })
}

//-----------------------  if user is on mobile don't show google maps by default    ------------------------------------------------------------
const $googleMap = document.querySelector(".contact__map");
const $contactDetailsBox = document.querySelector(".contact__details");
const $divToClone = document.querySelector(".details__item");
if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $googleMap.style.display = "none";

    const clone = $divToClone.cloneNode(true);
    clone.dataset.aosDelay = "400";
    clone.innerHTML = `
            <p class="item__data">
                    <i class="fa-solid fa-map-location-dot item__icon"></i>
                    Pokaż miejsce na Google Maps
                </p>
    `;
    $contactDetailsBox.appendChild(clone);

    clone.addEventListener("click", () => {
        $googleMap.style.display = "block";
    });

} else {
    $googleMap.style.display = "block";
}

// --------- important news Popup ------------------------------------
const $importantNewsContainer = document.querySelector(".importantNews-container");

function generateImportantNews(importantNews) {
    const currentTime = new Date().getTime();

    importantNews.forEach((item) => {
        const itemTime = new Date(item.popoverTime.split('.').reverse().join('.')).getTime();

        if (currentTime >= itemTime) {
            console.log("za późno na news")
        } else {
            const newImportantNewsSection = document.createElement("section");
            newImportantNewsSection.classList.add("importantNews");
            newImportantNewsSection.innerHTML = `
                <article class="importantNews__popup">
                    <i class="fa-solid fa-circle-xmark exit-icon"></i>
                    <div class="popup__headline">
                        <h3 class="headline__title">${item.title}</h3>
                        <p class="headline__author">przez ${item.name}</p>
                        <div class="headline__inputBox">
                            <label for="dontShow" class="inputBox__label">Nie pokazuj więcej tego newsa</label>
                            <input type="checkbox" id="dontShow" class="inputBox__input">
                        </div>
                    </div>
                    <p class="popup__text">${item.newsContent}</p>
                </article>
            `;
            $importantNewsContainer.appendChild(newImportantNewsSection);
        }
    })

    const $importantNewsSection = document.querySelector(".importantNews");
    const $importantNewsCloseBtn = document.querySelector(".importantNews .exit-icon");
    const $importantNewsCheckbox = document.querySelector(".inputBox__input");

    $importantNewsCloseBtn.addEventListener("click", () => {
        $importantNewsSection.style.display = "none";
    })
}



// $importantNewsCheckbox.addEventListener("change", (e) => {
//     if (e.target.checked) {
//
//     }
// })