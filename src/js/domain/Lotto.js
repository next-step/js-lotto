import { LottoRank } from "./enum/LottoRank";

export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_DIGITS = 6;

export class Lotto {
  #numbers;

  constructor(numbers) {
    this.#checkNumbers(numbers);
    this.#numbers = numbers.toSorted((a, b) => a - b);
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
      throw new Error(`로또(당첨) 번호의 자리수는 ${LOTTO_DIGITS}자리입니다.`);
    }

    if (numbers.length !== new Set(numbers).size) {
      throw new Error("중복된 번호가 있습니다.");
    }

    if (!numbers.every((e) => e >= LOTTO_MIN_NUMBER && e <= LOTTO_MAX_NUMBER)) {
      throw new Error(
        `로또(당첨) 번호는 ${LOTTO_MIN_NUMBER}~${LOTTO_MAX_NUMBER} 사이의 수입니다.`
      );
    }
  }

  #checkBonusNumber(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error(
        `보너스 번호는 ${LOTTO_MIN_NUMBER}~${LOTTO_MAX_NUMBER} 사이의 수입니다.`
      );
    }

    if (bonusNumber < LOTTO_MIN_NUMBER || bonusNumber > LOTTO_MAX_NUMBER) {
      throw new Error(
        `보너스 번호는 ${LOTTO_MIN_NUMBER}~${LOTTO_MAX_NUMBER} 사이의 수입니다.`
      );
    }
  }

  #getLottoRank(hitCount, isHitBonusNumber) {
    return LottoRank.getRank(hitCount, isHitBonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}
