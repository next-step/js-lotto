import { getNumberList, shuffle } from '../utils.js';

export class LottoModel {
  static #MAX = 45;
  static #SIZE = 6;
  numbers = [];

  constructor() {}

  generateLottoNumbers(purchaseNumbers, manualLottoNumbers) {
    this.numbers = Array.from({ length: purchaseNumbers }).map(() =>
      shuffle(getNumberList(LottoModel.#MAX), LottoModel.#SIZE)
    );

    if (manualLottoNumbers.length !== 0) {
      this.numbers.push([manualLottoNumbers]);
    }
  }

  resetLottoNumber() {
    this.numbers = [];
  }

  isDuplicateNumbers(numbers) {
    const numberCollection = new Set(numbers);
    return numbers.length !== numberCollection.size;
  }
}
