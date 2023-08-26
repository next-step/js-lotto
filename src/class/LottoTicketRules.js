import { isNaturalNumber } from "../utils/numberFunc.js";

const DEFAULT_VALUE = Object.freeze({
  MIN: 1,
  MAX: 43,
  LENGTH: 6,
});

export default class LottoTicketRules {
  #min;
  #max;
  #length;

  constructor(
    min = DEFAULT_VALUE.MIN,
    max = DEFAULT_VALUE.MAX,
    length = DEFAULT_VALUE.LENGTH,
  ) {
    const isLengthValidFormat = isNaturalNumber(length);
    const isMinValidFormat = isNaturalNumber(min);
    const isMaxValidFormat = isNaturalNumber(max);

    if (!(isLengthValidFormat && isMaxValidFormat && isMinValidFormat)) {
      throw new Error("최소값, 최대값, 개수는 양의 정수여야 합니다.");
    }

    if (min >= max) {
      throw new Error("최소값은 최대값보다 작아야 합니다.");
    }

    if (max - min + 1 < length) {
      throw new Error("설정할 수 있는 번호 개수를 초과하였습니다.");
    }

    this.#min = min;
    this.#max = max;
    this.#length = length;
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
