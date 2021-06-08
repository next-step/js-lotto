import { $, warnMsg, setDisabled } from "../utils/utils.js";
import { LOTTO, MSG } from "../utils/constant.js";

export default function LottoInput(scope) {
  const priceArea = $(".price-area", scope.container);
  const button = $("button", priceArea);
  const input = $("input", priceArea);

  const getInputInfo = () => {
    const price = +input.value;

    if (!price) {
      warnMsg(MSG.INPUT_PRICE);
      return;
    }

    if (price % LOTTO.CARD_PRICE) {
      warnMsg(MSG.UNIT_PRICE);
      return;
    }

    setDisabled(button, input);
    scope.setCard(price);
  };

  button.addEventListener("click", getInputInfo.bind(this));
}
