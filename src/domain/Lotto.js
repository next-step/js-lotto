class Lotto {
  static LOTTO_NUMBER_SIZE = 6;
  static INVALID_LOTTO_NUMBER_SIZE = "로또 번호는 6개여야 합니다.";
  static INVALID_LOTTO_NUMBER_DUPLICATE = "로또 번호에 중복이 있습니다.";
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#validateLottoNumbers(lottoNumbers);
    this.#lottoNumbers = lottoNumbers.sort((a, b) => a.value - b.value);
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  #validateLottoNumbers(lottoNumbers) {
    if (
      !Array.isArray(lottoNumbers) ||
      lottoNumbers.length !== Lotto.LOTTO_NUMBER_SIZE
    ) {
      throw new Error(Lotto.INVALID_LOTTO_NUMBER_SIZE);
    }
    const uniqueNumbers = new Set(
      lottoNumbers.map((number) => number.getValue()),
    );
    if (uniqueNumbers.size !== Lotto.LOTTO_NUMBER_SIZE) {
      throw new Error(Lotto.INVALID_LOTTO_NUMBER_DUPLICATE);
    }
  }
}

export default Lotto;
