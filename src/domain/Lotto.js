class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    console.log(this.#lottoNumbers);
    return this.#lottoNumbers;
  }
}

export default Lotto;
