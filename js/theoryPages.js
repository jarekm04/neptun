const hamburgerIcon = document.querySelector(".hamburger");
const menuList = document.querySelector(".header__menu");

hamburgerIcon.addEventListener("click", () => {
    menuList.classList.toggle("active");
    menuList.classList.contains("active") ? hamburgerIcon.textContent = "cancel" : hamburgerIcon.textContent = "menu";
});
document.querySelectorAll(".menu__item").forEach(item => item.addEventListener("click", () => {
    menuList.classList.remove("active");
    menuList.classList.contains("active") ? hamburgerIcon.textContent = "cancel" : hamburgerIcon.textContent = "menu";
}))