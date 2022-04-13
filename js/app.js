//logo scrolls to top
const logoBtn = document.querySelector(".header__logo");

logoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
})