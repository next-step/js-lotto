import Lotto from "../lotto/lotto.model.js";

import LOTTO_SALES from "./lotto-sales.constant.js";
import { validateAmountPaid } from "./lotto-sales.contract.js";

class LottoSales {
  purchase(amountPaid) {
    validateAmountPaid(amountPaid);

    const availableLottoCount = Math.floor(amountPaid / LOTTO_SALES.PRICE);

    return Array.from({ length: availableLottoCount }, () => new Lotto());
  }
}

export default LottoSales;
