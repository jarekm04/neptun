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

//pages transitions
window.onload = () => {
    const transitionEl = document.querySelector('.transition');
    const anchors = document.querySelectorAll('.header__menu li a');

    setTimeout(() => {
        transitionEl.classList.remove('active');
    }, 500);

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            let target = e.target.href;

            transitionEl.classList.add('active');

            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });
}