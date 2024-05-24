import { validInputNumber, validSelectorNotFind } from '../utils/validator';

class Prices {
    #node = document.getElementById('price');

    getPrice() {
        const inputPrice = document.getElementById('price');
        if (inputPrice) {
            const { value } = inputPrice;
            validInputNumber(value);
            return value;
        } else {
            validSelectorNotFind('id', 'price');
        }
    }

    resetPrice() {
        this.#node.value = '';
    }
}

export default Prices;
