import { LOTTO_PRICE, LOTTO_NUMBERS_LIMIT, LOTTO_COUNTS } from './constants';
import NOT_ALLOWED_PAY_UNIT from './messageConstants';

class Lotto {
  static pay(paidPrice) {
    console.log(paidPrice);
    if (!Lotto.#isValidatePaidPrice(paidPrice)) {
      alert(NOT_ALLOWED_PAY_UNIT);
      return;
    }

    const counts = paidPrice / LOTTO_PRICE;

    return this.#makeLottoCards(counts);
  }

  static #isValidatePaidPrice(paidPrice) {
    return paidPrice % LOTTO_PRICE === 0 && paidPrice > 0;
  }

  static #makeLottoCards(counts) {
    const result = [];

    while (result.length < counts) {
      result.push(Lotto.#makeRandomLottoNumbers());
    }

    return result;
  }

  static #makeRandomLottoNumbers() {
    const result = [];

    while (result.length < LOTTO_COUNTS) {
      const randomNumber = Math.floor(Math.random() * LOTTO_NUMBERS_LIMIT + 1);

      if (result.includes(randomNumber)) continue;
      result.push(randomNumber);
    }

    return result.sort((a, b) => a - b);
  }
}

export default Lotto;
