import {
    CustomError,
    IncorrectUnitError,
    InputMaxExceededError,
    InputMinInsufficientError,
    InputRequiredError,
    NotAllowedDuplicatedValueError,
    NotAllowedToAddInputError,
    NotAllowedToDeleteInputError,
    OutOfNumberRangeError,
} from "../utils/error.js";
import {
    ACTIONTYPE,
    ERROR_MESSAGE, LOTTO_LIMIT_DIGITS,
    LOTTO_LIMIT_DIGITS_BONUS_NUMBER,
    LOTTO_RANGE_MAX, LOTTO_RANGE_MIN,
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

    #setStatsNumbersErrors = (numbers, includeBonus) => {
        const limitDigit = includeBonus ? LOTTO_LIMIT_DIGITS_BONUS_NUMBER : LOTTO_LIMIT_DIGITS;
        if (numbers.length < limitDigit) throw new InputRequiredError(ERROR_MESSAGE.StatsNumbersRequired);
        if (new Set(numbers).size < limitDigit) throw new NotAllowedDuplicatedValueError(ERROR_MESSAGE.NotAllowedDuplicatedValue);
        if (numbers.some(row => row > LOTTO_RANGE_MAX || row < LOTTO_RANGE_MIN)) throw new OutOfNumberRangeError(ERROR_MESSAGE.OutOfNumberRange);
        return true;
    }

    #setManuelInputErrors = (actionType, length, unit) => {
        if (actionType === ACTIONTYPE.ADD && length === unit) throw new NotAllowedToAddInputError(ERROR_MESSAGE.NotAllowedToAddInput);
        if (actionType === ACTIONTYPE.DELETE && length === unit) throw new NotAllowedToDeleteInputError(ERROR_MESSAGE.NotAllowedToDeleteInput);
        return true;
    }

    validate = (params) => {
        try {
            if (params.sectionType === SECTIONTYPE.PURCHASE) return this.#setPriceErrors(params.value);
            if (params.sectionType === SECTIONTYPE.NUMBERS) return this.#setStatsNumbersErrors(params.value, params.includeBonus);
            if (params.sectionType === SECTIONTYPE.MANUEL_INPUT) return this.#setManuelInputErrors(params.actionType, params.length, params.unit);
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