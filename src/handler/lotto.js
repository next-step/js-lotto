import { Lotto } from "../domain/Lotto";
import { validateNumber } from "../validator/validateNumber";
import { output } from "../view/web/output";

const lottoHandler = {
  validatePurchasePrice(purchasePrice) {
    validateNumber.nan(purchasePrice);
    validateNumber.negative(purchasePrice);
  },

  outputLottosResult(lottos) {
    output.lottosCount(lottos.length);
    output.lottoResult(lottos);
  },

  generateLottos(purchasePrice) {
    const lotto = new Lotto(purchasePrice);
    return lotto.lottos;
  },
};

export default lottoHandler;
