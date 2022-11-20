import { ERROR_MESSAGE, PRICE_MAX, PRICE_MIN, PRICE_PER_UNIT } from "./const.js";

export class Validator {
    constructor() {}

    validate = (price) => {
        if (!price) return this.#afterValidate(ERROR_MESSAGE.InputRequired);
        if (price < PRICE_MIN) return this.#afterValidate(ERROR_MESSAGE.InputMinInsufficient);
        if (price > PRICE_MAX) return this.#afterValidate(ERROR_MESSAGE.InputMaxExceeded);
        if (!!(price % PRICE_PER_UNIT)) return this.#afterValidate(ERROR_MESSAGE.IncorrectUnit);
        return true;
    }

    #afterValidate(errorMessage) {
        alert(errorMessage);
        return false;
    }
}