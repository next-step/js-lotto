import { LOTTO_PRIZE_INFO } from '../constants/constants.js';

const INITIAL_STATE = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
};

export default class WinningPrizeModel {
  #winningPrizeInfo;
  #totalPrizeMoney;

  constructor() {
    this.#winningPrizeInfo = [];
    this.#totalPrizeMoney = 0;
  }

  get winningPrizeInfo() {
    return this.#winningPrizeInfo;
  }

  get totalPrizeMoney() {
    return this.#totalPrizeMoney;
  }

  setLottoInfo(lottos, { winningLottoNumbers, bonusNumber }) {
    this.lottos = lottos;
    this.winningLottoNumbers = winningLottoNumbers;
    this.bonusNumber = bonusNumber;
    this.#winningPrizeInfo = this.setWinningPrizeInfo();
    this.#totalPrizeMoney = this.setTotalPrizeMoney();
  }

  setTotalPrizeMoney() {
    return Object.entries(this.#winningPrizeInfo).reduce(
      (total, [key, value]) => {
        return LOTTO_PRIZE_INFO[Number(key)].prize * value + total;
      },
      0
    );
  }

  intersectionLotto(pivot, comparison) {
    return new Set([...pivot].filter((x) => comparison.has(x)));
  }

  findLottoNumber(lotto) {
    return [...lotto].find((number) => number === this.bonusNumber);
  }

  setWinningLottoCount(lottos) {
    return [...lottos].map((lotto) => {
      return {
        count: this.intersectionLotto(
          this.winningLottoNumbers,
          new Set([...lotto])
        ).size,
        bonus: !!this.findLottoNumber(lotto)
      };
    });
  }

  setWinningPrizeInfo() {
    const winningLottoCount = this.setWinningLottoCount(this.lottos);

    return winningLottoCount.reduce(
      (prizeInfo, { count, bonus }) => {
        if (count === 6) {
          prizeInfo[1] += 1;
        }

        if (count === 5 && bonus) {
          prizeInfo[2] += 1;
        }

        if (count === 5 && !bonus) {
          prizeInfo[3] += 1;
        }

        if (count === 4) {
          prizeInfo[4] += 1;
        }

        if (count === 3) {
          prizeInfo[5] += 1;
        }
        return prizeInfo;
      },
      { ...INITIAL_STATE }
    );
  }
}
