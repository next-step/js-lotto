import {
  LOTTO_DIGITS,
  LOTTO_LOWER_BOUND,
  LOTTO_UPPER_BOUND,
} from "./constants";
import Lotto from "./Lotto";

export default class LottoMachine {
  issueLotto() {
    const lottoNumbers = this.#generateLottoNumbers();
    return Lotto.of(lottoNumbers);
  }

  #generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO_DIGITS) {
      const randomNumber =
        Math.floor(Math.random() * LOTTO_UPPER_BOUND) + LOTTO_LOWER_BOUND;
      lottoNumbers.add(randomNumber);
    }
    return Array.from(lottoNumbers);
  }
}
