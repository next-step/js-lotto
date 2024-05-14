import Lotto from "../lotto/lotto.model.js";

import LOTTO_SALES from "./lotto-sales.constant.js";
import { validateAmountPaid } from "./lotto-sales.contract.js";

class LottoSales {
  purchase(amount_paid) {
    validateAmountPaid(amount_paid);

    const availableLottoCount = Math.floor(amount_paid / LOTTO_SALES.PRICE);

    return Array.from({ length: availableLottoCount }, () => new Lotto());
  }
}

export default LottoSales;
