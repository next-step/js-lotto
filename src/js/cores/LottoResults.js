import {
  FIRST_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
  FOURTH_PLACE,
  FIFTH_PLACE,
  FIRST_PLACE_RETURN,
  SECOND_PLACE_RETURN,
  THIRD_PLACE_RETURN,
  FOURTH_PLACE_RETURN,
  FIFTH_PLACE_RETURN,
  INITIAL_WINNING_COUNT,
} from '../constants/index.js';

const returns = new Map([
  [FIFTH_PLACE, FIFTH_PLACE_RETURN],
  [FOURTH_PLACE, FOURTH_PLACE_RETURN],
  [THIRD_PLACE, THIRD_PLACE_RETURN],
  [SECOND_PLACE, SECOND_PLACE_RETURN],
  [FIRST_PLACE, FIRST_PLACE_RETURN],
]);

export class LottoResults {
  sameCounts = new Map([
    [FIFTH_PLACE, INITIAL_WINNING_COUNT],
    [FOURTH_PLACE, INITIAL_WINNING_COUNT],
    [THIRD_PLACE, INITIAL_WINNING_COUNT],
    [SECOND_PLACE, INITIAL_WINNING_COUNT],
    [FIRST_PLACE, INITIAL_WINNING_COUNT],
  ]);
  rateOfReturn;
  money;

  getSameCounts() {
    return new Map(this.sameCounts);
  }

  getRateOfReturn() {
    return this.rateOfReturn;
  }

  setMoney(money) {
    this.money = money;
  }

  updateSameCounts(sameNumbers) {
    this.sameCounts.set(sameNumbers, this.sameCounts.get(sameNumbers) + 1);
  }

  calculateRateOfReturn() {
    const { sameCounts, money } = this;

    const totalReturn =
      sameCounts.get(FIFTH_PLACE) * returns.get(FIFTH_PLACE) +
      sameCounts.get(FOURTH_PLACE) * returns.get(FOURTH_PLACE) +
      sameCounts.get(THIRD_PLACE) * returns.get(THIRD_PLACE) +
      sameCounts.get(SECOND_PLACE) * returns.get(SECOND_PLACE) +
      sameCounts.get(FIRST_PLACE) * returns.get(FIRST_PLACE) -
      money;

    this.rateOfReturn = (totalReturn / money) * 100;
  }
}
