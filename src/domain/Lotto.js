import { ErrorLotto } from "../constants/error";
import { LOTTO_NUMBER_LENGTH } from "../constants/number";
import { sortingNumber } from "../util/random";

class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#validateLottoNumbers(lottoNumbers);

    this.#numbers = sortingNumber(lottoNumbers);
  }

  #validateLottoNumbers(lottoNumbers) {
    if (lottoNumbers.length !== LOTTO_NUMBER_LENGTH) {
      throw new Error(ErrorLotto.NUMBER_LENGTH_SIX);
    }

    if (lottoNumbers.length !== new Set(lottoNumbers).size) {
      throw new Error(ErrorLotto.NUMBER_DUPLICATED);
    }
  }

  getMatchCount(anotherLotto) {
    const matchCount = this.#numbers.filter((lottoNumber) =>
      anotherLotto.isIncludeLottoNumber(lottoNumber)
    ).length;

    return matchCount;
  }

  isIncludeLottoNumber(lottoNumber) {
    const bonus = this.numbers.some(
      (number) => number.number === lottoNumber.number
    );
    return bonus;
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
