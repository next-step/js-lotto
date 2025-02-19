import {
  validateBonusNumber,
  validateLottoNumbers,
} from "./validators/lottoValidator.js";

class LottoGame {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    validateLottoNumbers(winningNumbers);
    validateBonusNumber(winningNumbers, bonusNumber);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  compareNumbers(lottoNumbers) {
    validateLottoNumbers(lottoNumbers);

    const matchedNumbers = this.#getMatchedNumbers(lottoNumbers);
    const isBonusMatched = lottoNumbers.includes(this.#bonusNumber);

    return { matchedNumbers, isBonusMatched };
  }

  #getMatchedNumbers(lottoNumbers) {
    return lottoNumbers.filter((num) => this.#winningNumbers.includes(num));
  }
}

export default LottoGame;
