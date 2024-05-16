import LottoTicket from './LottoTicket';
import { generateLottoNumberArray } from '../utils/LottoUtil';
import { ERROR_MESSAGE, LOTTO } from '../constants';

class LottoMachine {
  #winningAmounts;

  static DEFAULT_WINNING_AMOUNT = [
    2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
  ];
  static NOT_ENOUGH_MONEY = '돈이 부족합니다.';
  static DUPLICATE_LOTTO_NUMBERS = '중복된 로또 번호 입니다.';

  constructor(winningAmounts = LottoMachine.DEFAULT_WINNING_AMOUNT) {
    if (!Array.isArray(winningAmounts)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (winningAmounts.length !== LOTTO.WINNING_NUMBER_LENGTH) {
      throw new TypeError(ERROR_MESSAGE.INVALID_LOTTO_FORMAT);
    }
    this.#winningAmounts = winningAmounts;
  }

  sellAutoLottoTicket(cost) {
    if (cost > Number.MAX_SAFE_INTEGER || !Number.isInteger(cost)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (cost < LOTTO.PRICE) {
      throw new Error(LottoMachine.NOT_ENOUGH_MONEY);
    }

    const sellCount = Math.floor(cost / LOTTO.PRICE);

    return Array.from({ length: sellCount }, () => {
      const lottoTicket = new LottoTicket();
      lottoTicket.lottoNumbers = generateLottoNumberArray();
      return lottoTicket;
    });
  }
}

export default LottoMachine;
