'use strict';
// стандартная функция которая возвращает джейсон, применима к любому  API

const output = document.getElementById('output');
const getData = (url) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else {
                reject(request.responseText);
            }
        });
        request.send();
    });
};

const outputPhotos = (data) => {
    data.forEach((item) => {

// const random = Math.floor(Math.random() * data .length);
// const obj = data[random];
        output.insertAdjacentHTML('beforebegin',
            `<h4>${item.title}</h4>
                   <img src="${item.thumbnailUrl}" alt="${item.title}">`);
    });
};
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';
const oneImg = getData('https://jsonplaceholder.typicode.com/photos1');
const twoImg = getData('https://jsonplaceholder.typicode.com/photos2');

Promise.race([oneImg, twoImg])
    .then(outputPhotos)
    .catch(error => console.error(error));

// oneImg.promiseAll
// getData(urlPhotos)
//     .then(outputPhotos)
//     .catch(error => console.error(error));
