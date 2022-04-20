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

var contentWayPoint = function() {
    var i = 0;
    $('.animate-box').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('animated') ) {

            i++;

            $(this.element).addClass('item-animate');
            setTimeout(function(){

                $('body .animate-box.item-animate').each(function(k){
                    var el = $(this);
                    setTimeout( function () {
                        el.addClass('fadeInUp animated');
                        el.removeClass('item-animate');
                    },  k * 200, 'easeInOutExpo' );
                });

            }, 100);

        }

    } , { offset: '85%' } );
};
