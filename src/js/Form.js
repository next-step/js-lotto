import { $ } from './utils/dom.js';

export class Form {
    constructor({ onSubmit }) {
        this.$input = $('#input-price-form input');
        this.$submitBtn = $('#input-price-form button');
        this.onSubmit = onSubmit;

        this.initEventListener();
    }

    initEventListener() {
        this.$submitBtn.addEventListener('click', this.handleSubmit.bind(this));
    }

    handleSubmit() {
        const price = Number(this.$input.value);
        this.onSubmit(price);
        this.$submitBtn.disabled = true;
    }
}