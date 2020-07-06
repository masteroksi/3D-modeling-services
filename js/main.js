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

    // slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        let dot = document.querySelectorAll('.dot');
        const slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const portfolioDots = document.querySelector('.portfolio-dots');

        function renderDots() {
            portfolioDots.innerHTML = '';
            const fragment = document.createDocumentFragment();
            slide.forEach(() => {
                const li = document.createElement('li');
                li.className = 'dot';
                fragment.append(li);
            });
            portfolioDots.append(fragment);
            dot = document.querySelectorAll('.dot');
        }
        renderDots();

        const prevSlide = (elem, index, strClass) => {
            console.log(elem, index, strClass);
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');


        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }

                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }


        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }

        });

        startSlide(1500);
    };
    slider();
});
