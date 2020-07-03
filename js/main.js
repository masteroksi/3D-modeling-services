window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // burger_menu
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

    toggleMenu();

    // popup
    const popupLogic = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');

        const setIsOpen = (isOpen) => {
            popup.style.display = isOpen ? 'block' : 'none';
        };
        popupBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                setIsOpen(true);
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                setIsOpen(false);
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    setIsOpen(false);
                }
            }
        });
    };

    popupLogic();

    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');


        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (ev) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        });
    };

    tabs();
});
