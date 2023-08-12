import Lotto from './Lotto.js';
import { ERROR_MESSAGES, RULES } from './constants.js';

function validatePurchaseMoney(money) {
  if (Number.isNaN(money)) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_MONEY_TYPE);
  }
  if (!money || money % RULES.LOTTO_PRICE !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_MONEY_UNIT);
  }
}
class LottoMachine {
  lottos = [];

  purchaseLottos(money) {
    validatePurchaseMoney(money);

    this.lottos = Array(money / RULES.LOTTO_PRICE).fill(Lotto.of);
  }
}

export default LottoMachine;
