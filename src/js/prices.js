import { validInputNumber, validSelectorNotFind } from '../utils/validator';

class Prices {
    #price = 0;

    constructor() {
        this.vali;
    }

    getPrice() {
        const inputPrice = document.getElementById('price');
        if (inputPrice) {
            const { value } = inputPrice;
            validInputNumber(value);
            this.#price = value;
        } else {
            validSelectorNotFind('id', 'price');
        }
        return this.#price;
    }

    resetPrice() {
        this.#price = 0;
    }
}

export default Prices;
