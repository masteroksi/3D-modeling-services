function getTimeUnit(num) {
    if (num < 10) {
        return `0${num}`;
    }
    return num.toString();
}

const DAYS = [
    'Воскресение',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
];

function init() {
    const currDate = new Date();
    let hours = currDate.getHours();
    const minutes = currDate.getMinutes();
    const seconds = currDate.getSeconds();
    const day = currDate.getDay();

    let greating = 'Добрый день';
    if (hours < 12 && hours > 3) {
        greating = 'Доброе утро';
    } else if (hours > 17 && hours < 24) {
        greating = 'Добрый вечер';
    } else if (hours > 23 || hours < 4) {
        greating = 'Доброй ночи';
    }

    const partOfTheDay = hours < 12 ? 'AM' : 'PM';
    if (hours === 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours -= 12;
    }

    const nextDate = new Date(`January 1, ${currDate.getFullYear() + 1}`);
    //Количество миллисекунд в одном дне
    const msPerDay = 24 * 60 * 60 * 1000;
    const newYearDaysLeft = Math.round((nextDate.getTime() - currDate.getTime()) / msPerDay);

    const currentDay = `Сегодня: ${DAYS[day]}`;
    const currentData = `Текущее время: ${getTimeUnit(hours)}:${getTimeUnit(minutes)}:${getTimeUnit(seconds)} ${partOfTheDay}`;
    const newYearLeft = `До нового года осталось ${newYearDaysLeft} дней`;

    document.getElementById('clock').innerText = greating + '\n';
    document.getElementById('clock').innerText += currentDay + '\n';
    document.getElementById('clock').innerText += currentData + '\n';
    document.getElementById('clock').innerText += newYearLeft + '\n';
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
