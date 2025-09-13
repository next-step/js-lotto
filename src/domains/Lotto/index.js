export class Lotto {
  static SIZE = 6;
  static Range = { MIN: 1, MAX: 45 };
  static ErrorMessages = {
    INVALID_COUNT: `로또는 ${Lotto.SIZE}개의 숫자를 가진다`,
    DUPLICATE_NUMBERS: `로또는 ${Lotto.SIZE}개의 중복 없는 숫자를 가진다`,
    OUT_OF_RANGE: `로또는 ${Lotto.Range.MIN}~${Lotto.Range.MAX} 사이의 숫자를 가진다`,
  };

  #numbers;

  constructor(numbers) {
    if (numbers.length !== Lotto.SIZE) {
      throw new Error(Lotto.ErrorMessages.INVALID_COUNT);
    }

    if (new Set(numbers).size !== Lotto.SIZE) {
      throw new Error(Lotto.ErrorMessages.DUPLICATE_NUMBERS);
    }

    if (
      numbers.some(
        (number) => number < Lotto.Range.MIN || number > Lotto.Range.MAX
      )
    ) {
      throw new Error(Lotto.ErrorMessages.OUT_OF_RANGE);
    }

    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  evaluateLotto(winningNumbers, bonusNumber) {
    return {
      matchingCount: this.#numbers.filter((number) =>
        winningNumbers.includes(number)
      ).length,
      isBonusNumberMatched: this.#numbers.includes(bonusNumber),
    };
  }
}
