'use strict';

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

export default sendForm;
