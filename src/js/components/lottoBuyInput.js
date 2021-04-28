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
    app.buy($(BUY_SELECTOR.INPUT).value);
  };

  $input.addEventListener("keydown", onKeyHandler);
  $(BUY_SELECTOR.BUTTON, $input).addEventListener("click", onClickHandler);
}
