'use strict';

function getTimeUnit(num) {
    if (num < 10) {
        return `0${num}`;
    }
    return num.toString();
}

function countTimer() {
    window.addEventListener('DOMContentLoaded', function () {
        let intervalID = null;

        function timer(deadline) {
            const timerHours = document.querySelector('#timer-hours');
            const timerMinutes = document.querySelector('#timer-minutes');
            const timerSeconds = document.querySelector('#timer-seconds');


            function getTimerRemaining() {
                let dateStop = new Date(deadline).getTime();
                let dateNow = new Date().getTime();
                let timeRemaining = (dateStop - dateNow) / 1000;
                let seconds = Math.floor(timeRemaining % 60);
                let minutes = Math.floor((timeRemaining / 60) % 60);
                let hours = Math.floor(timeRemaining / 60 / 60);
                return {timeRemaining, hours, minutes, seconds};
            }

            function upDateCklok() {
                let {hours, minutes, seconds, timeRemaining} = getTimerRemaining();
                // let day = Math.floor(timeRemaining / 60 / 60 /24);
                timerHours.textContent = hours < 0 ? '00' : getTimeUnit(hours);
                timerMinutes.textContent = minutes < 0 ? '00' : getTimeUnit(minutes);
                timerSeconds.textContent = seconds < 0 ? '00' : getTimeUnit(seconds);

                if (timeRemaining <= 0) {
                    clearInterval(intervalID);
                }
            }

            upDateCklok();
        }

        intervalID = setInterval(timer, 1000, '29 juli 2020');
    });
}



export default countTimer;
