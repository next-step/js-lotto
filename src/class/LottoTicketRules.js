import { isNaturalNumber } from "../utils/numberFunc.js";

export default class LottoTicketRules {
  static #DEFAULT_MIN = 1;
  static #DEFAULT_MAX = 43;
  static #DEFAULT_LENGTH = 6;

  #min = LottoTicketRules.#DEFAULT_MIN;
  #max = LottoTicketRules.#DEFAULT_MAX;
  #length = LottoTicketRules.#DEFAULT_LENGTH;

  constructor(min, max, length) {
    const isLengthValidFormat = isNaturalNumber(length);
    const isMinValidFormat = isNaturalNumber(min);
    const isMaxValidFormat = isNaturalNumber(max);

    const areMinMaxValuesValid =
      isMaxValidFormat && isMinValidFormat ? min < max : false;

    const isRangeValid =
      areMinMaxValuesValid && isLengthValidFormat
        ? max - min + 1 >= length
        : false;

    if (isRangeValid) {
      this.#min = min;
      this.#max = max;
      this.#length = length;
    }
  }

  get min() {
    return this.#min;
  }

  get max() {
    return this.#max;
  }

  get length() {
    return this.#length;
  }
}
