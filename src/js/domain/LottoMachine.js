import { LOTTO } from '../constants';
import {
  generateLottoNumberArray,
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../utils/LottoUtil';
import LottoTicket from './LottoTicket';

class LottoMachine {
  #winningNumbers;
  #bonusWinningNumber;
  #winningAmount;

  static DEFAULT_WINNING_AMOUNT = [
    2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
  ];

  constructor(winningAmount = LottoMachine.DEFAULT_WINNING_AMOUNT) {
    if (!Array.isArray(winningAmount)) {
      throw new TypeError('유효하지 않은 값 입니다.');
    }
    if (winningAmount.length !== LOTTO.WINNING_NUMBER_LENGTH) {
      throw new TypeError('당첨 금액 형식에 맞지않습니다.');
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
      throw new TypeError('유효하지 않은 값 입니다.');
    }
    this.#winningNumbers = winningNumbers;
  }

  get bonusWinningNumber() {
    return this.#bonusWinningNumber;
  }

  set bonusWinningNumber(bonusWinningNumber) {
    if (!isValidLottoNumberArray(this.#winningNumbers)) {
      throw new TypeError('로또 번호가 먼저 생성되어야 합니다.');
    }
    if (!isValidLottoNumber(bonusWinningNumber)) {
      throw new TypeError('유효하지 않은 값 입니다.');
    }
    if (this.#winningNumbers.includes(bonusWinningNumber)) {
      throw new TypeError(
        '로또 번호와 같은 번호는 보너스번호가 될 수 없습니다.'
      );
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
    const matchLottoNumber = this.#getMatchLottoNumberCount(lottoNumbers);
    switch (matchLottoNumber) {
      case 6:
        return 1;
      case 5:
        return this.#hasBonusNumber(lottoNumbers) ? 2 : 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return -1;
    }
  }

  getAmount(lottoNumbers) {
    const matchLottoNumber = this.#getMatchLottoNumberCount(lottoNumbers);
    switch (matchLottoNumber) {
      case 6:
        return 2_000_000_000;
      case 5:
        return this.#hasBonusNumber(lottoNumbers) ? 30_000_000 : 1_500_000;
      case 4:
        return 50_000;
      case 3:
        return 5_000;
      default:
        return 0;
    }
  }

  sellAutoLottoTicket(cost) {
    if (cost > Number.MAX_SAFE_INTEGER || !Number.isInteger(cost)) {
      throw new TypeError(
        'buy로 전달된 매개변수는 표현가능한 숫자형이어야 합니다.'
      );
    }
    if (cost < LOTTO.PRICE) {
      throw new Error('금액이 부족합니다.');
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
      throw new TypeError('잘못된 형식 입니다.');
    }
    if (!lottoTickets.every((lotto) => lotto instanceof LottoTicket)) {
      throw new TypeError('LottoTicket 이 아닙니다.');
    }
    const chart = new Map([
      ['1', { count: 0, price: this.#winningAmount[0] }],
      ['2', { count: 0, price: this.#winningAmount[1] }],
      ['3', { count: 0, price: this.#winningAmount[2] }],
      ['4', { count: 0, price: this.#winningAmount[3] }],
      ['5', { count: 0, price: this.#winningAmount[4] }],
      ['-1', { count: 0, price: this.#winningAmount[5] }],
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
