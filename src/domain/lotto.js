import { LottoNumber } from "./lotto-number.js";

export class Lotto {
  static PRICE = 1_000;
  static NUMBER_COUNT = 6;

  /** @type {LottoNumber[]} */
  #value;
  get lotto() {
    return this.#value;
  }

  constructor(numbers) {
    if (
      !Array.isArray(numbers) ||
      numbers.every((value) => typeof value !== "number")
    ) {
      throw new Error("numbers는 숫자 형식의 배열이어야 합니다.");
    }
    if (numbers.length !== Lotto.NUMBER_COUNT) {
      throw new Error("Lotto는 6개의 숫자로 구성되어야 합니다");
    }
    this.#value = numbers.map((number) => new LottoNumber(number));
  }
}
