'use strict';

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

export default popupLogic;
