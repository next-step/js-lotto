import { Error } from "../constants/error";
import {
  MIN_NUMBER,
  MAX_NUMBER,
  FIRST_PRIZE,
  SECOND_PRIZE,
  THIRD_PRIZE,
  FOURTH_PRIZE,
  FIFTH_PRIZE,
} from "../constants/number";

class WinningLotto {
  number = [];
  bonusNumber = 0;
  rank = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  constructor(arrayNumber, bonusNumber) {
    this.validationNumber(arrayNumber, bonusNumber);
  }

  validationNumber(arrayNumber, bonusNumber) {
    if (
      arrayNumber.some((number) => number > MAX_NUMBER || number < MIN_NUMBER)
    ) {
      throw new Error(Error.OVER_MIN_MAX_NUMBER);
    }

    if (arrayNumber.length !== 6) {
      throw new Error(Error.LOTTO_NUMBER_LENGTH);
    }

    if (arrayNumber.length !== new Set(arrayNumber).size) {
      throw new Error(Error.NUMBER_DUPLICATED);
    }

    if (arrayNumber.includes(bonusNumber)) {
      throw new Error(Error.BONUS_NUMBER_DUPLICATED);
    }

    this.number = arrayNumber;
    this.bonusNumber = bonusNumber;
  }

  countLotto(stats) {
    stats.forEach((winning) => {
      if (winning.length === 3) {
        this.this.rank = { ...this.rank, fifth: this.rank.fifth + 1 };
      }
      if (winning.length === 4) {
        this.rank = { ...this.rank, fourth: this.rank.fourth + 1 };
      }
      if (winning.length === 5 && winning.includes(Number(this.bonusNumber))) {
        this.rank = { ...this.rank, third: this.rank.third + 1 };
      }
      if (winning.length === 5) {
        this.rank = { ...this.rank, second: this.rank.second + 1 };
      }
      if (winning.length === 6) {
        this.rank = { ...this.rank, first: this.rank.first + 1 };
      }
    });

    return this.rank;
  }

  totalReturn(investment) {
    //이익 나누기 투자금 곱하기 100
    let total = 0;
    Object.entries(this.rank).forEach(([key, value]) => {
      if (key === "first") {
        total += FIRST_PRIZE * value;
      }
      if (key === "second") {
        total += SECOND_PRIZE * value;
      }
      if (key === "third") {
        total += THIRD_PRIZE * value;
      }
      if (key === "fourth") {
        total += FOURTH_PRIZE * value;
      }
      if (key === "fifth") {
        total += FIFTH_PRIZE * value;
      }
    });

    return (total / investment) * 100;
  }
}

export default WinningLotto;
