import LottoNumber from "./LottoNumber.js";

class Lotto {
  static LOTTO_NUMBER_SIZE = 6;
  static LOTTO_PRICE = 1000;
  static INVALID_LOTTO_NUMBER_SIZE = "로또 번호는 6개여야 합니다.";
  static INVALID_LOTTO_NUMBER_DUPLICATE = "로또 번호에 중복이 있습니다.";
  static INVALID_LOTTO_NUMBER_TYPE =
    "로또 번호는 LottoNumber 클래스여야 합니다.";
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#validateLottoNumbers(lottoNumbers);
    this.#lottoNumbers = [...lottoNumbers].sort(
      (a, b) => a.getValue() - b.getValue(),
    );
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  countMatches(winningNumbers) {
    return this.#lottoNumbers.filter((lottoNumber) =>
      winningNumbers.some((winningNumber) => lottoNumber.equals(winningNumber)),
    ).length;
  }

  contains(bonusNumber) {
    return this.#lottoNumbers.some((number) => number.equals(bonusNumber));
  }

  #validateLottoNumbers(lottoNumbers) {
    if (
      !Array.isArray(lottoNumbers) ||
      lottoNumbers.length !== Lotto.LOTTO_NUMBER_SIZE
    ) {
      throw new Error(Lotto.INVALID_LOTTO_NUMBER_SIZE);
    }
    if (
      lottoNumbers.some((lottoNumber) => !(lottoNumber instanceof LottoNumber))
    ) {
      throw new Error(Lotto.INVALID_LOTTO_NUMBER_TYPE);
    }
    const numbers = lottoNumbers.map((number) => number.getValue());
    if (new Set(numbers).size !== Lotto.LOTTO_NUMBER_SIZE) {
      throw new Error(Lotto.INVALID_LOTTO_NUMBER_DUPLICATE);
    }
  }
}

export default Lotto;
