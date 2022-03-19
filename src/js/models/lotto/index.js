import LOTTO_PRICE from './constants';
import NOT_ALLOWED_PAY_UNIT from './messageConstants';

class Lotto {
  #paidPrice = 0;

  static pay(paidPrice) {
    console.log(paidPrice);
    if (!Lotto.#isValidatePaidPrice(paidPrice)) {
      alert(NOT_ALLOWED_PAY_UNIT);
      return;
    }

    return paidPrice / LOTTO_PRICE;
  }

  static #isValidatePaidPrice(paidPrice) {
    return paidPrice % LOTTO_PRICE === 0 && paidPrice > 0;
  }

  static #purchaseLottoAmount(paidPrice) {
    return paidPrice / LOTTO_PRICE;
  }
}

export default Lotto;
