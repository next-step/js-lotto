import { ERROR_MESSAGE } from '../../constants/errorMessage.js';
import { validate } from '../utils/validate.js';
import Lotto from '../domain/Lotto.js';
import { LOTTO_MIN_PRICE } from '../../constants/conditions.js';

class LottoVendingMachine {
  #purchaseAmount;
  #issuedCount;
  #lottos;

  purchase(amount) {
    this.#validateAmount(amount);

    this.#purchaseAmount = amount;
    this.#issuedCount = Math.floor(amount / LOTTO_MIN_PRICE);

    this.#setLottos();
  }

  #setLottos() {
    this.#lottos = Array.from({ length: this.#issuedCount }).map(
      (_) => new Lotto()
    );
  }
  #validateAmount(amount) {
    if (!(validate.isPositiveNumber(amount) && amount >= LOTTO_MIN_PRICE))
      throw new Error(ERROR_MESSAGE.INVALID_AMOUNT);
  }

  get purchaseAmount() {
    return this.#purchaseAmount;
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoVendingMachine;
