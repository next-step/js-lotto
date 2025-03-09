import LottoNumbers from "./LottoNumbers.js";

export default class DrawNumbers {
  #winningNumbers;
  #bonusNumbers;

  constructor({ winningNumbers, bonusNumbers }) {
    LottoNumbers.validateDuplication([
      ...winningNumbers.values,
      ...bonusNumbers.values,
    ]);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumbers = bonusNumbers;
  }

  get values() {
    return {
      winningNumbers: this.#winningNumbers.values,
      bonusNumbers: this.#bonusNumbers.values,
    };
  }
}
