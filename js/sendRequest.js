'use strict';

/**
 *
 * @param {string} url
 * @param {{method: string, headers: object, body: object | string}} options
 * @returns {Promise<Response>}
 */
const sendRequest = (url, options) => {
    return new Promise((res, rej) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                res(); // TODO: add res(request.responseText) when it needed
            } else {
                rej();
            }
        });

        request.open(options.method || 'GET', url);

        if (options.headers) {
            Object
                .entries(options.headers)
                .forEach(([key, value]) => {
                    request.setRequestHeader(key, value);
                });
        }
        request.send(options.body);
    });
};
