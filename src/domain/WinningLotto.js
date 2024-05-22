import { ErrorLotto } from "../constants/error";
import {
  LOTTO_NUMBER_LENGTH,
  MAX_NUMBER,
  MIN_NUMBER,
} from "../constants/number";
import LottoNumber from "./LottoNumber";

export const FIRST_PRIZE = 2000000000;
export const SECOND_PRIZE = 30000000;
export const THIRD_PRIZE = 1500000;
export const FOURTH_PRIZE = 50000;
export const FIFTH_PRIZE = 5000;

export const PRIZE = {
  FIRST: { rank: "FIRST", matchCount: 6, prize: FIRST_PRIZE, isBonus: false },
  SECOND: { rank: "SECOND", matchCount: 5, prize: SECOND_PRIZE, isBonus: true },
  THIRD: { rank: "THIRD", matchCount: 5, prize: THIRD_PRIZE, isBonus: false },
  FOURTH: {
    rank: "FOURTH",
    matchCount: 4,
    prize: FOURTH_PRIZE,
    isBonus: false,
  },
  FIFTH: { rank: "FIFTH", matchCount: 3, prize: FIFTH_PRIZE, isBonus: false },
  NONE: { rank: "NONE", matchCount: 0, prize: 0, isBonus: false },
};
class WinningLotto {
  number = [];
  bonusNumber = 0;

  #rank = [PRIZE.FIRST, PRIZE.SECOND, PRIZE.THIRD, PRIZE.FOURTH, PRIZE.FIFTH];

  constructor(arrayNumber, bonusNumber) {
    this.validationNumber(arrayNumber, bonusNumber);

    this.number = arrayNumber;
    this.bonusNumber = new LottoNumber(bonusNumber);
  }

  validationNumber(arrayNumber, bonusNumber) {
    const transNumberList = arrayNumber.toString().split(",").map(Number);

    if (transNumberList.includes(bonusNumber)) {
      throw new Error(ErrorLotto.BONUS_NUMBER_DUPLICATED);
    }
  }

  getResultPrize(lottoList) {
    const prizeList = lottoList.map((lotto) => {
      const matchCount = lotto.filter((x) => this.number.includes(x)).length;
      const bonus = lotto.includes(Number(this.bonusNumber));

      const result = this.#rank.find((rank) => {
        if (matchCount === PRIZE.SECOND.matchCount) {
          return rank.isBonus === bonus && matchCount === rank.matchCount;
        } else {
          return rank.matchCount === matchCount;
        }
      });

      if (result === undefined) return PRIZE.NONE;

      return result;
    });

    return prizeList;
  }
}

export default WinningLotto;
