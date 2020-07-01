window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // burger_menu
    let isOpen = false;
    let isAnimate = true;
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul > li');

    const handleResize = () => {
        isAnimate = document.documentElement.clientWidth >= 768;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let currentAnimation = null;
    const handlerMenu = (ev) => {
        // menu.classList.toggle('active-menu');

        const animationKeyframes = [
            {transform: 'translate(-100%)'},
            {transform: 'translate(0)'},
        ];
        const options = {
            duration: 300,
            fill: 'both',
        };
        if (isOpen) { // need to close
            if (isAnimate) {
                currentAnimation = menu.animate(animationKeyframes.reverse(), options);
            } else {
                currentAnimation && currentAnimation.cancel();
                menu.style.transform = animationKeyframes[0].transform;
            }
        } else { // need to open
            if (isAnimate) {
                currentAnimation = menu.animate(animationKeyframes, options);
            } else {
                currentAnimation && currentAnimation.cancel();
                menu.style.transform = animationKeyframes[1].transform;
            }
        }

        isOpen = !isOpen;
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        handlerMenu();
    });
    menuItems.forEach(item => {
        item.addEventListener('click', handlerMenu);
    });

    // popup
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');

    const setIsOpen = (isOpen) => {
        popup.style.display = isOpen ? 'block' : 'none';
    };
    popupBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            setIsOpen(true);
        });
    });
    popupClose.addEventListener('click', () => {
        setIsOpen(false);
    });

});
// for (let i = 0; i < menuItems.length; i++){
//     menuItems[i].addEventListener('click', handlerMenu);
// }
// menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));





