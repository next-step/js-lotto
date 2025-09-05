class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default Lotto;
