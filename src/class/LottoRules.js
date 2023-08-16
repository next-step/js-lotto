export default class LottoRules {
  static #DEFAULT_MIN = 1;
  static #DEFAULT_MAX = 43;
  static #DEFAULT_LENGTH = 6;

  #min = LottoRules.#DEFAULT_MIN;
  #max = LottoRules.#DEFAULT_MAX;
  #length = LottoRules.#DEFAULT_LENGTH;

  constructor(min, max, length) {
    const isLengthValidFormat =
      typeof length === "number" && Number.isInteger(length) && length > 0;
    const isMinValidFormat =
      typeof min === "number" && Number.isInteger(min) && min > 0;
    const isMaxValidFormat =
      typeof max === "number" && Number.isInteger(max) && max > 0;

    const isMinSmallerThanMax =
      isMaxValidFormat && isMinValidFormat ? min < max : false;

    const isRangeValid =
      isMinSmallerThanMax && isLengthValidFormat
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
