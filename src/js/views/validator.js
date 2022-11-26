import { ERROR_MESSAGE, priceMax, priceMin, pricePerUnit } from "../utils/const.js";

export class Validator {
    constructor() {}

    isValidated = (price) => {
        if (!price) return this.#afterValidate(ERROR_MESSAGE.InputRequired);
        if (price < priceMin) return this.#afterValidate(ERROR_MESSAGE.InputMinInsufficient);
        if (price > priceMax) return this.#afterValidate(ERROR_MESSAGE.InputMaxExceeded);
        if (!!(price % pricePerUnit)) return this.#afterValidate(ERROR_MESSAGE.IncorrectUnit);
        return 1;
    }

    #afterValidate(errorMessage) {
        alert(errorMessage);
        return 0;
    }
}