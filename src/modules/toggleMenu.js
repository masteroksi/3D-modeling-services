'use strict';

const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = (needToClose) => {
        if (needToClose) {
            menu.classList.remove('active-menu');
        } else {
            menu.classList.toggle('active-menu');
        }
    };

    document.body.addEventListener('click', (ev) => {
        const target = ev.target;
        const btnMenu = target.classList.contains('menu') ? target : target.closest('.menu');

        if (target.classList.contains('close-btn')) {
            handlerMenu();
            return;
        }
        if (btnMenu) {
            handlerMenu();
            return;
        }
        if (
            (
                target.closest('li') &&
                target.closest('li').closest('menu')
            ) || (
                target.tagName === 'LI' &&
                target.closest('menu')
            )
        ) {
            handlerMenu();
            return;
        }
        if (target.closest('menu')) {
            return;
        }
        handlerMenu(true);
    });
};

export default toggleMenu;
