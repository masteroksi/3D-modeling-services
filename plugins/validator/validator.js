class Validator {
    constructor({selector, pattern = {}, method}) {
        this.form = document.querySelector(selector);
        this.selector = selector;
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.error = new Set();
    }

    init() {
        this.applyStule();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
        this.form.addEventListener('submit', (e) => {
            this.elementsForm.forEach((elem) => this.chekIt({target: elem}));
            if (this.error.size) {
                e.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            },
        };
        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every((item) =>
                    validatorMethod[item[0]](elem, this.pattern[item[1]]),
                );
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
        }

        return true;
    }

    chekIt(ev) {
        const target = ev.target;

        console.log("Check", target, this.isValid(target));
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'mistake error';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');

        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('.validator-error')) {
            elem.nextElementSibling.remove();
        }
    }


    applyStule() {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 2px solid green !important;
        }
        input.error {
            border: 2px solid red !important;
        }
        .validator-error {
            font-size: 13px !important;
            color: red !important;
        }`;
        document.head.appendChild(style);
    }

    setPattern() {
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()*\d]){10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
    }
}


