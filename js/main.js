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


    // our team
    function ourTeam() {
        const teamContainer = document.getElementById('command');

        function swapImage(img) {
            const src = img.src;
            const newSrc = img.dataset.img;
            img.dataset.img = src;
            img.src = newSrc;
        }

        function hover(ev) {
            if (ev.target && ev.target.tagName === 'IMG') {
                swapImage(ev.target);
            }
        }

        teamContainer.addEventListener('mouseover', hover);
        teamContainer.addEventListener('mouseout', hover);
    }

    ourTeam();

    // calculator
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block');
        const calcType = document.querySelector('.calc-type');
        const calcSquare = document.querySelector('.calc-square');
        const calcDay = document.querySelector('.calc-day');
        const calcCount = document.querySelector('.calc-count');
        const totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = total;
        };


        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });


        const inputs = document.querySelectorAll('.calc-item[type=text]');
        inputs.forEach((input) => {
            input.addEventListener('input', (ev) => {
                const text = ev.target.value;
                ev.target.value = text.replace(/\D/, '');
            });
        });
    };
    calc();

    // send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что то пошло не так....';
        const loadMessage = 'Загрузка....';
        const successMessage = 'Спасибо мы свяжемся с вами!';

        const addSubmitForm = (formId) => {
            const form = document.getElementById(formId);
            const statusMessage = document.createElement('div');
            statusMessage.textContent = 'Спасибо мы свяжемся с вами';
            statusMessage.style.cssText = 'font-size: 10px';

            form.addEventListener('submit', (event) => {
                event.preventDefault();

                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                fetch('/send-request', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(() => {
                        statusMessage.textContent = successMessage;
                        form.querySelectorAll('input[type=text], input[type=email], input[type=tel]')
                            .forEach(input => input.value = '');
                    })
                    .catch((ex) => {
                        statusMessage.textContent = errorMessage;
                    });
            });
        };

        const only = pattern => inputId => {
            const input = document.getElementById(inputId);
            input.addEventListener('input', (ev) => {
                const text = ev.target.value;
                ev.target.value = text.replace(pattern, '');
            });
        };

        ['form1', 'form2', 'form3'].forEach(addSubmitForm);
        ['form1-name', 'form2-name', 'form3-name'].forEach(only(/[^А-ЯЁа-яё ]/i));
        ['form1-phone', 'form2-phone', 'form3-phone'].forEach(only(/[^+0-9]/));
    };
    sendForm();
});
