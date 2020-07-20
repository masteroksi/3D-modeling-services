'use strict';

const calculator = (price = 100) => {
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
export default calculator;
