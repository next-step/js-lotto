import { LOTTO_TICKET_PRICE } from "../constants.js";

class LottoTicket {
  static price = LOTTO_TICKET_PRICE;
  #lottoNumbers;
  #placeIdx = null;
  #winningAmount = 0;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  getPlaceIdx() {
    return this.#placeIdx;
  }

  getWinningAmount() {
    return this.#winningAmount;
  }

  setPlaceIdx(placeIdx) {
    this.#placeIdx = placeIdx;
  }

  setWinningAmount(winningAmount) {
    this.#winningAmount = winningAmount;
  }
}

export default LottoTicket;
