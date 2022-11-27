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
    const numbers = this.lottoNumber.concat(this.bonusNumber);
    if (numbers.length === 0) {
      return;
    }

    if (this.isInValidWinningNumbers(numbers)) {
      throw Error(ERROR_MESSAGE.EMPTY_RANGE);
    }

    if (this.isDuplicateNumbers(numbers)) {
      throw Error(ERROR_MESSAGE.DUPLICATED);
    }
  }

  isInValidWinningNumbers(winningNumbers) {
    return winningNumbers.some((number) => {
      const lottoNumber = new LottoNumber(number);
      return lottoNumber.validate(number);
    });
  }

  isDuplicateNumbers(numbers) {
    const numberCollection = new Set(numbers);
    return numbers.length !== numberCollection.size;
  }
}
