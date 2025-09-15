import { LottoNumber } from "../LottoNumber/index.js";

export class Lotto {
  static SIZE = 6;
  static ErrorMessages = {
    INVALID_LOTTO_NUMBERS: `로또는 ${Lotto.SIZE}개의 중복없는 숫자를 가진다`,
  };

  #lottoNumbers;

  constructor(numbers) {
    if (new Set(numbers).size !== Lotto.SIZE) {
      throw new Error(Lotto.ErrorMessages.INVALID_LOTTO_NUMBERS);
    }

    this.#lottoNumbers = new Set(
      numbers.map((number) => new LottoNumber(number))
    );
  }

  get numbers() {
    return Array.from(this.#lottoNumbers)
      .map((lottoNumber) => lottoNumber.value)
      .sort((a, b) => a - b);
  }

  countMatchingLottoNumber(lotto) {
    return [...this.#lottoNumbers].filter((lottoNumber) =>
      lotto.hasLottoNumber(lottoNumber)
    ).length;
  }

  hasLottoNumber(lottoNumber) {
    return [...this.#lottoNumbers].some((lottoNumberInLotto) =>
      lottoNumberInLotto.isMatched(lottoNumber)
    );
  }
}
