class LottoTicket {
  static price = 1000;
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoTicket;
