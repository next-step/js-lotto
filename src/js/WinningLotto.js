import { ERROR_MESSAGE } from './constants.js';
import { LottoNumber } from './LottoNumber.js';

export class WinningLotto {
  lottoNumber;
  bonusNumber;
  constructor({ lottoNumber, bonusNumber }) {
    this.lottoNumber = lottoNumber;
    this.bonusNumber = bonusNumber;
    this.validate();
  }

  validate() {
    if (this.isInValidWinningNumbers([...this.lottoNumber, this.bonusNumber])) {
      throw Error(ERROR_MESSAGE.EMPTY_RANGE);
    }

    if (this.isDuplicateNumbers([...this.lottoNumber, this.bonusNumber])) {
      throw Error(ERROR_MESSAGE.DUPLICATED);
    }
  }

  isInValidWinningNumbers(winningNumbers) {
    return winningNumbers.some((number) => new LottoNumber(number).isInValid);
  }

  isDuplicateNumbers(numbers) {
    const numberCollection = new Set(numbers);
    return numbers.length !== numberCollection.size;
  }
}
