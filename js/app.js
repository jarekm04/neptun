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

trainersImgs.forEach((img) => {
    img.addEventListener("click", (e) => {
        popup.classList.remove("hidden");
        popupImg.src = e.target.src;
    });
})

popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
});