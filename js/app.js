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

//trainers popup
const trainersImgs = document.querySelectorAll(".trainer__photo");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const popupImg = document.querySelector(".popup__img");
const trainerBIO = document.querySelector(".trainer__bio");
const arrowLeft = document.querySelector(".popup__arrow--left");
const arrowRight = document.querySelector(".popup__arrow--right");

let currentImgIndex;

// const showNextImg = () => {
//     if (currentImgIndex === trainersImgs.length - 1) {
//         currentImgIndex = 0;
//     } else {
//         currentImgIndex++;
//     }
//     console.log(trainersImgs);
//     // pop.src = trainersImgs[currentImgIndex].src;
// };

trainersImgs.forEach((img) => {
    img.addEventListener("click", (e) => {
        popup.classList.remove("hidden");
        popupImg.src = e.target.src;
        trainerBIO.textContent = "";
    });
})

popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
});