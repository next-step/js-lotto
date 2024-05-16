import Product from './Product';
import { isValidLottoNumberArray } from '../utils/LottoUtil';
import { ERROR_MESSAGE, LOTTO } from '../constants';

class LottoTicket extends Product {
  #lottoNumbers;
  constructor(lottoNumbers, price = LOTTO.PRICE) {
    super(LOTTO.NAME_KR, price);

    if (!isValidLottoNumberArray(lottoNumbers)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    this.#lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }

  #getLottoNumberMatchCount(winningNumbers, lottoNumbers) {
    return winningNumbers.reduce(
      (count, winningNumber) =>
        lottoNumbers.includes(winningNumber) ? count + 1 : count,
      0
    );
  }

  #hasBonusNumber(lottoNumbers, bonusNumber) {
    return lottoNumbers.includes(bonusNumber);
  }

  calcWinningAmount({ winningNumbers, winningAmounts, bonusWinningNumber }) {
    const matchCount = this.#getLottoNumberMatchCount(
      winningNumbers,
      this.#lottoNumbers
    );
    switch (matchCount) {
      case 6:
        return winningAmounts[0];
      case 5:
        return this.#hasBonusNumber(this.#lottoNumbers, bonusWinningNumber)
          ? winningAmounts[1]
          : winningAmounts[2];
      case 4:
        return winningAmounts[3];
      case 3:
        return winningAmounts[4];
      default:
        return winningAmounts[5];
    }
  }

  calcWinningRank(winningNumbers, bonusWinningNumber) {
    const matchCount = this.#getLottoNumberMatchCount(
      winningNumbers,
      this.#lottoNumbers
    );
    switch (matchCount) {
      case 6:
        return LOTTO.RANK_1;
      case 5:
        return this.#hasBonusNumber(this.#lottoNumbers, bonusWinningNumber)
          ? LOTTO.RANK_2
          : LOTTO.RANK_3;
      case 4:
        return LOTTO.RANK_4;
      case 3:
        return LOTTO.RANK_5;
      default:
        return LOTTO.UNRANKED;
    }
  }

  getResult({ winningNumbers, winningAmounts, bonusWinningNumber }) {
    return {
      matchCount: this.#getLottoNumberMatchCount(
        winningNumbers,
        this.#lottoNumbers
      ),
      winningRank: this.calcWinningRank(winningNumbers, bonusWinningNumber),
      winningAmount: this.calcWinningAmount({
        winningNumbers,
        winningAmounts,
        bonusWinningNumber,
      }),
    };
  }
}

export default LottoTicket;
