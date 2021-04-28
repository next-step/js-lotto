import { LOTTO_PRICE } from "../domain/lottoStore.js";
import { $, BUY_SELECTOR } from "../utils/dom.js";
import { isKey } from "../utils/eventUtils.js";

export default function LottoBuyInput(app) {
  const $input = $(BUY_SELECTOR.FORM);

  const onKeyHandler = (event) => {
    if (!isKey(event, "Enter")) return;
    event.preventDefault();
    onClickHandler();
  };

  const onClickHandler = () => {
    const buyNum = $(BUY_SELECTOR.INPUT).value;
    if (buyNum < LOTTO_PRICE) {
      alert("못사용");
      return;
    }
    if (buyNum % LOTTO_PRICE !== 0) {
      alert("잘나누세용");
      return;
    }
    app.buy($(BUY_SELECTOR.INPUT).value);
  };

  $input.addEventListener("keydown", onKeyHandler);
  $(BUY_SELECTOR.BUTTON, $input).addEventListener("click", onClickHandler);
}
