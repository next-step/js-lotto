import {
    CustomError,
    IncorrectUnitError,
    InputMaxExceededError,
    InputMinInsufficientError,
    InputRequiredError,
    NotAllowedDuplicatedValueError,
    OutOfNumberRangeError,
} from "../utils/error.js";
import {
    ERROR_MESSAGE,
    LOTTO_LIMIT_DIGITS_BONUS_NUMBER,
    PRICE_MAX,
    PRICE_MIN,
    PRICE_PER_UNIT,
    SECTIONTYPE
} from "../utils/const.js";

export class Validator {
    constructor() {
    }

    #setPriceErrors = (price) => {
        if (!price) throw new InputRequiredError(ERROR_MESSAGE.PriceRequired);
        if (price < PRICE_MIN) throw new InputMinInsufficientError(ERROR_MESSAGE.PriceMinInsufficient);
        if (price > PRICE_MAX) throw new InputMaxExceededError(ERROR_MESSAGE.PriceMaxExceeded);
        if (price % PRICE_PER_UNIT !== 0) throw new IncorrectUnitError(ERROR_MESSAGE.IncorrectUnit);
        return true;
    }

    #setStatsErrors = (numbers) => {
        if (!numbers.length || (numbers.length < LOTTO_LIMIT_DIGITS_BONUS_NUMBER)) throw new InputRequiredError(ERROR_MESSAGE.StatsNumbersRequired);
        if (new Set(numbers).size < LOTTO_LIMIT_DIGITS_BONUS_NUMBER) throw new NotAllowedDuplicatedValueError(ERROR_MESSAGE.NotAllowedDuplicatedValue);
        if (numbers.some(row => row.length > 2 || row < 0)) throw new OutOfNumberRangeError(ERROR_MESSAGE.OutOfNumberRange);
        return true;
    }

    validate = (sectionType, value) => {
        try {
            if (sectionType === SECTIONTYPE.PURCHASE) return this.#setPriceErrors(value);
            if (sectionType === SECTIONTYPE.STATS) return this.#setStatsErrors(value);
        } catch (e) {
            this.#catchErrors(e);
        }
    }

    #catchErrors(e) {
        if (e instanceof CustomError) {
            alert(e.message);
        } else {
            throw e;
        }
    }
}