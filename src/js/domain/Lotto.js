import { checkBonusNumber, checkNumbers } from "./LottoValidate";
import { LottoRank } from "./enum/LottoRank";

export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_DIGITS = 6;

export class Lotto {
  #numbers;

  constructor(numbers) {
    checkNumbers(numbers);

    this.#numbers = numbers.toSorted((a, b) => a - b);
  }

  compare(winningNumbers, bonusNumber) {
    checkNumbers(winningNumbers);
    checkBonusNumber(bonusNumber);

    const hitCount = this.#numbers.filter((e) =>
      winningNumbers.includes(e)
    ).length;
    const isHitBonusNumber = this.#numbers.includes(bonusNumber);

    return this.#getLottoRank(hitCount, isHitBonusNumber);
  }

  #getLottoRank(hitCount, isHitBonusNumber) {
    return LottoRank.getRank(hitCount, isHitBonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}
