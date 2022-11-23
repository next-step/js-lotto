import { $lottoPapers, $purchaseInput } from "./view/elements.js";
import { ERROR_MESSAGE } from "./constants/errorMessage.js";
import { LOTTO } from "./constants/lotto.js";
import { clearLottos, issueLottos } from "./service/lotto.js";
import { isInvalidPurchasePrice } from "./utils/validator.js";
import { render, showTotalLottoCount, turnOffToggleButton } from "./view/ui.js";
import { lottosTemplate } from "./view/templates.js";

export const initialize = () => {
  clearLottos();
  turnOffToggleButton();
};

export const handleSumbit = (e) => {
  e.preventDefault();
  if (isInvalidPurchasePrice($purchaseInput.value, LOTTO.LOTTO_UNIT))
    return alert(ERROR_MESSAGE.INVALID_LOTTO_PRICE);

  const totalLottoCount = $purchaseInput.value / LOTTO.LOTTO_UNIT;

  initialize();

  issueLottos(totalLottoCount);
  showTotalLottoCount(totalLottoCount);
  render($lottoPapers, lottosTemplate());
};
