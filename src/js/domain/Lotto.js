import { LottoRank } from "./enum/LottoRank";

export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_DIGITS = 6;

export class Lotto {
  #numbers;

  constructor(numbers) {
    this.#checkNumbers(numbers);
    this.#numbers = numbers;
  }

  compare(winningNumbers, bonusNumber) {
    this.#checkNumbers(winningNumbers);
    this.#checkBonusNumber(bonusNumber);

    const hitCount = this.#numbers.filter((e) =>
      winningNumbers.includes(e)
    ).length;
    const isHitBonusNumber = this.#numbers.includes(bonusNumber);

    return this.#getLottoRank(hitCount, isHitBonusNumber);
  }

  #checkNumbers(numbers) {
    if (numbers.length !== LOTTO_DIGITS) {
      throw new Error();
    }

    if (numbers.length !== new Set(numbers).size) {
      throw new Error();
    }

    if (!numbers.every((e) => e >= LOTTO_MIN_NUMBER && e <= LOTTO_MAX_NUMBER)) {
      throw new Error();
    }
  }

  #checkBonusNumber(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error();
    }

    if (bonusNumber < LOTTO_MIN_NUMBER || bonusNumber > LOTTO_MAX_NUMBER) {
      throw new Error();
    }
  }

  #getLottoRank(hitCount, isHitBonusNumber) {
    return LottoRank.getRank(hitCount, isHitBonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}
