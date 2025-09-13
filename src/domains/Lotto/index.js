import { LottoNumber } from "../LottoNumber/index.js";

export class Lotto {
  static SIZE = 6;
  static ErrorMessages = {
    INVALID_COUNT: `로또는 ${Lotto.SIZE}개의 숫자를 가진다`,
    DUPLICATE_NUMBERS: `로또는 ${Lotto.SIZE}개의 중복 없는 숫자를 가진다`,
  };

  #lottoNumbers;

  constructor(numbers) {
    if (numbers.length !== Lotto.SIZE) {
      throw new Error(Lotto.ErrorMessages.INVALID_COUNT);
    }

    if (new Set(numbers).size !== Lotto.SIZE) {
      throw new Error(Lotto.ErrorMessages.DUPLICATE_NUMBERS);
    }

    this.#lottoNumbers = numbers.map((number) => new LottoNumber(number));
  }

  get numbers() {
    return this.#lottoNumbers;
  }

  evaluateLotto(winningNumbers, bonusNumber) {
    return {
      matchingCount: this.#lottoNumbers.filter((lottoNumber) =>
        winningNumbers.some((winningLottoNumber) =>
          winningLottoNumber.isMatched(lottoNumber)
        )
      ).length,
      isBonusNumberMatched: this.#lottoNumbers.some((lottoNumber) =>
        lottoNumber.isMatched(bonusNumber)
      ),
    };
  }
}
