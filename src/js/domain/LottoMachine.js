import LottoTicket from './LottoTicket';
import {
  generateLottoNumberArray,
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../utils/LottoUtil';
import { ERROR_MESSAGE, LOTTO } from '../constants';

class LottoMachine {
  #winningNumbers;
  #bonusWinningNumber;
  #winningAmount;

  static DEFAULT_WINNING_AMOUNT = [
    2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
  ];
  static NOT_ENOUGH_MONEY = '돈이 부족합니다.';
  static DUPLICATE_LOTTO_NUMBERS = '중복된 로또 번호 입니다.';

  constructor(winningAmount = LottoMachine.DEFAULT_WINNING_AMOUNT) {
    if (!Array.isArray(winningAmount)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (winningAmount.length !== LOTTO.WINNING_NUMBER_LENGTH) {
      throw new TypeError(ERROR_MESSAGE.INVALID_LOTTO_FORMAT);
    }
    this.#winningNumbers = Array.from({
      length: LOTTO.WINNING_NUMBER_LENGTH,
    }).fill(null);
    this.#bonusWinningNumber = null;
    this.#winningAmount = winningAmount;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  set winningNumbers(winningNumbers) {
    if (!isValidLottoNumberArray(winningNumbers)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    this.#winningNumbers = winningNumbers;
  }

  get bonusWinningNumber() {
    return this.#bonusWinningNumber;
  }

  set bonusWinningNumber(bonusWinningNumber) {
    if (!isValidLottoNumberArray(this.#winningNumbers)) {
      throw new TypeError(ERROR_MESSAGE.REQUIRE_LOTTO_NUMBERS);
    }
    if (!isValidLottoNumber(bonusWinningNumber)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (this.#winningNumbers.includes(bonusWinningNumber)) {
      throw new TypeError(LottoMachine.DUPLICATE_LOTTO_NUMBERS);
    }
    this.#bonusWinningNumber = bonusWinningNumber;
  }

  get winningAmount() {
    return this.#winningAmount;
  }

  #hasBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusWinningNumber);
  }

  #getMatchLottoNumberCount(lottoNumbers) {
    return this.#winningNumbers.reduce(
      (count, winningNumber) =>
        lottoNumbers.includes(winningNumber) ? count + 1 : count,
      0
    );
  }

  getWinningRank(lottoNumbers) {
    const matchCount = this.#getMatchLottoNumberCount(lottoNumbers);
    switch (matchCount) {
      case 6:
        return LOTTO.RANK_1;
      case 5:
        return this.#hasBonusNumber(lottoNumbers) ? LOTTO.RANK_2 : LOTTO.RANK_3;
      case 4:
        return LOTTO.RANK_4;
      case 3:
        return LOTTO.RANK_5;
      default:
        return LOTTO.UNRANKED;
    }
  }

  getAmount(lottoNumbers) {
    const matchCount = this.#getMatchLottoNumberCount(lottoNumbers);
    switch (matchCount) {
      case 6:
        return this.#winningAmount[0];
      case 5:
        return this.#hasBonusNumber(lottoNumbers)
          ? this.#winningAmount[1]
          : this.#winningAmount[2];
      case 4:
        return this.#winningAmount[3];
      case 3:
        return this.#winningAmount[4];
      default:
        return this.#winningAmount[5];
    }
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

  getLottoResult(lottoTickets) {
    if (!Array.isArray(lottoTickets) || lottoTickets.length < 1) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (!lottoTickets.every((lotto) => lotto instanceof LottoTicket)) {
      throw new TypeError(ERROR_MESSAGE.REQUIRE_LOTTO_INSTANCE);
    }

    const chart = new Map([
      [`${LOTTO.RANK_1}`, { count: 0, price: this.#winningAmount[0] }],
      [`${LOTTO.RANK_2}`, { count: 0, price: this.#winningAmount[1] }],
      [`${LOTTO.RANK_3}`, { count: 0, price: this.#winningAmount[2] }],
      [`${LOTTO.RANK_4}`, { count: 0, price: this.#winningAmount[3] }],
      [`${LOTTO.RANK_5}`, { count: 0, price: this.#winningAmount[4] }],
      [`${LOTTO.UNRANKED}`, { count: 0, price: this.#winningAmount[5] }],
    ]);
    let netReturn = 0;

    lottoTickets.forEach(({ lottoNumbers }) => {
      const rank = this.getWinningRank(lottoNumbers).toString();
      netReturn = netReturn + this.getAmount(lottoNumbers);
      const chartRow = chart.get(rank);
      if (chartRow) {
        chartRow.count = chartRow.count + 1;
      }
    });

    return {
      chart,
      netReturn,
    };
  }
}

export default LottoMachine;
