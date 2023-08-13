import { LottoValidator } from '../utils/validate/validator/index.js';

export default class LottoReward {
  #lottoMatchingInfo;

  static #WIN_TABLE = {
    '3_NUMBER': {
      description: '3개 일치 (5,000원)',
      amount: 5_000,
    },
    '4_NUMBER': {
      description: '4개 일치 (50,000원)',
      amount: 50_000,
    },
    '5_NUMBER': {
      description: '5개 일치 (1,500,000원)',
      amount: 1_500_000,
    },
    '5_NUMBER_WITH_BONUS': {
      description: '5개 일치, 보너스 볼 일치 (30,000,000원)',
      amount: 30_000_000,
    },
    '6_NUMBER': {
      description: '6개 일치 (2,000,000,000원)',
      amount: 2_000_000_000,
    },
  };

  constructor(lottoMatchingInfo) {
    this.#validate(lottoMatchingInfo);
    this.#lottoMatchingInfo = lottoMatchingInfo;
  }

  #validate(lottoMatchingInfo) {
    LottoValidator.validateWinningCountInRange(lottoMatchingInfo.map(({ winningCount }) => winningCount));
  }

  static from(lottoMatchingInfo) {
    return new LottoReward(lottoMatchingInfo);
  }

  #initLottoResult() {
    return Object.values(LottoReward.#WIN_TABLE).reduce((result, { description }) => {
      result[description] = 0;
      return result;
    }, {});
  }

  #createWinTableKey({ winningCount, hasBonusNumber }) {
    return `${winningCount}_NUMBER${hasBonusNumber && winningCount === 5 ? '_WITH_BONUS' : ''}`;
  }

  #updateLottoResult(lottoResult, winTableKey) {
    if (winTableKey in LottoReward.#WIN_TABLE) {
      const { description } = LottoReward.#WIN_TABLE[winTableKey];
      lottoResult[description] += 1;
    }
    return lottoResult;
  }

  #calculateWinningAmount(winningAmount, winTableKey) {
    if (winTableKey in LottoReward.#WIN_TABLE) {
      const { amount } = LottoReward.#WIN_TABLE[winTableKey];
      winningAmount += amount;
    }
    return winningAmount;
  }

  #updateWinningInfo({ winningCount, hasBonusNumber, lottoResult, winningAmount }) {
    const winTableKey = this.#createWinTableKey({ winningCount, hasBonusNumber });
    return {
      lottoResult: this.#updateLottoResult(lottoResult, winTableKey),
      winningAmount: this.#calculateWinningAmount(winningAmount, winTableKey),
    };
  }

  calculateWinningInfo() {
    return this.#lottoMatchingInfo.reduce(
      ({ lottoResult, winningAmount }, { winningCount, hasBonusNumber }) =>
        this.#updateWinningInfo({ winningCount, hasBonusNumber, lottoResult, winningAmount }),
      { lottoResult: this.#initLottoResult(), winningAmount: 0 },
    );
  }
}
