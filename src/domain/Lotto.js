class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }

  countMatches(winningNumber) {
    return this.#lottoNumbers.filter((num) =>
      winningNumber.includes(Number(num))
    ).length;
  }

  contains(number) {
    return this.#lottoNumbers.includes(Number(number));
  }
}

export default Lotto;
