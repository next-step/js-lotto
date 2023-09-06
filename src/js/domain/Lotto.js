import {
  LOTTO_PRICE,
  LOTTO_PRIZE_MAP,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  NUMBER_OF_LOTTO_NUMBERS,
} from "../constants";
import { LottoNumberError } from "../errors";

import { chooseSome } from "../utils";

export const ALL_LOTTO_NUMBERS = Array.from(
  {
    length: MAX_LOTTO_NUMBER - MIN_LOTTO_NUMBER + 1,
  },
  (v, i) => i + MIN_LOTTO_NUMBER
);
Object.freeze(ALL_LOTTO_NUMBERS);

const LOTTO_PLACE_MAP = {
  6: () => 1,
  5: (hasBonusNumber) => (hasBonusNumber ? 2 : 3),
  4: () => 4,
  3: () => 5,
};

export class Lotto {
  #numbers = [];
  #isChecked = false;
  #matchCount;
  #hasBonusNumber;
  #place;
  #prize;

  constructor(numbers) {
    Lotto.validateNumbers(numbers);
    this.#numbers = [...numbers];
    this.#numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return [...this.#numbers];
  }

  get result() {
    if (this.#isChecked) {
      return {
        matchCount: this.#matchCount,
        hasBonusNumber: this.#hasBonusNumber,
        place: this.#place,
        prize: this.#prize,
      };
    }
  }

  check(winningNumber) {
    const matchingNumbers = this.#numbers.filter((number) =>
      winningNumber.winningNumbers.includes(number)
    );
    this.#matchCount = matchingNumbers.length;
    this.#hasBonusNumber = this.#numbers.includes(winningNumber.bonusNumber);
    this.#place = Lotto.getPlace(this.#matchCount, this.#hasBonusNumber);
    this.#prize = LOTTO_PRIZE_MAP[this.#place] || 0;
    this.#isChecked = true;
  }

  static validateNumbers(numbers) {
    if (numbers.length < NUMBER_OF_LOTTO_NUMBERS) {
      throw new LottoNumberError("Too few numbers");
    }
    if (numbers.length > NUMBER_OF_LOTTO_NUMBERS) {
      throw new LottoNumberError("Too many numbers");
    }
    if (
      numbers.some(
        (number) => number < MIN_LOTTO_NUMBER || number > MAX_LOTTO_NUMBER
      )
    ) {
      throw new LottoNumberError("Contains an invalid number");
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new LottoNumberError("Duplicate numbers");
    }
  }

  static getPlace(matchCount, hasBonusNumber) {
    return matchCount in LOTTO_PLACE_MAP
      ? LOTTO_PLACE_MAP[matchCount](hasBonusNumber)
      : 0;
  }

  static random() {
    const randomNumbers = chooseSome(
      ALL_LOTTO_NUMBERS,
      NUMBER_OF_LOTTO_NUMBERS
    );
    return new Lotto(randomNumbers);
  }
}

export const getStatistics = (lottoList) => {
  let amountOfPrize = 0;
  const placeMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  lottoList.forEach((lotto) => {
    const { place, prize } = lotto.result;
    placeMap[place] += 1;
    amountOfPrize += prize;
  });

  const rateOfReturn = (amountOfPrize / (lottoList.length * LOTTO_PRICE)) * 100;

  return { amountOfPrize, placeMap, rateOfReturn };
};
