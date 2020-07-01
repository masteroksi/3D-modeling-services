window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // burger_menu
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul > li');

    const handlerMenu = (ev) => {
        // ev.preventDefault();
        menu.classList.toggle('active-menu');
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





