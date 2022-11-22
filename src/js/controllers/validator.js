import { IncorrectUnitError, InputMaxExceededError, InputMinInsufficientError, InputRequiredError } from "../utils/error.js";
import { ERROR_MESSAGE, PRICE_MAX, PRICE_MIN, PRICE_PER_UNIT } from "../utils/const.js";

export class Validator {
    constructor() {
    }

    #setErrors = (price) => {
        if (!price) throw new InputRequiredError(ERROR_MESSAGE.InputRequired);
        if (price < PRICE_MIN) throw new InputMinInsufficientError(ERROR_MESSAGE.InputMinInsufficient);
        if (price > PRICE_MAX) throw new InputMaxExceededError(ERROR_MESSAGE.InputMaxExceeded);
        if (price % PRICE_PER_UNIT !== 0) throw new IncorrectUnitError(ERROR_MESSAGE.IncorrectUnit);
        return true;
    }

    validate = (price) => {
        try {
            return this.#setErrors(price);
        } catch (e) {
            if (e instanceof InputRequiredError) {
                alert(e.message);
            } else if (e instanceof InputMinInsufficientError) {
                alert(e.message);
            } else if (e instanceof InputMaxExceededError) {
                alert(e.message);
            } else if (e instanceof IncorrectUnitError) {
                alert(e.message);
            } else {
                throw e;
            }
        }
    }
}