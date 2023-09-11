class LottoTicket {
  static price = LOTTO_TICKET_PRICE;
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoTicket;
