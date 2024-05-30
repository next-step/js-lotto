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
    const { lottos } = new Lotto(purchasePrice);

    return lottos;
  },
};

export default lottoHandler;
