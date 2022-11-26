import { getNumberList, shuffle } from '../utils.js';
import { AMOUNT_UNIT, ERROR_MESSAGE } from '../constants.js';

export class LottoModel {
  static #MAX = 45;
  static #SIZE = 6;
  numbers = [];
  constructor() {
  }

  generateLottoNumbers(purchaseNumbers) {
    this.numbers = Array.from({ length: purchaseNumbers }).map(() =>
      shuffle(getNumberList(LottoModel.#MAX), LottoModel.#SIZE)
    );
  }

  resetLottoNumber() {
    this.numbers = [];
  }

  isDuplicateNumbers(numbers) {
    const numberCollection = new Set(numbers);
    return numbers.length !== numberCollection.size;
  }
}
