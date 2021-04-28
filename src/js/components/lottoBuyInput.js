import { LOTTO_PRICE } from "../domain/lottoStore.js";
import { $, BUY_SELECTOR } from "../utils/dom.js";
import { isKey } from "../utils/eventUtils.js";
import { VALID } from "../utils/message.js";

export default function LottoBuyInput(app) {
  const $input = $(BUY_SELECTOR.FORM);

  const onKeyHandler = (event) => {
    if (!isKey(event, "Enter")) return;
    event.preventDefault();
    onClickHandler();
  };

  const onClickHandler = () => {
    const price = $(BUY_SELECTOR.INPUT).value;
    if (validPrice(price)) return;
    app.buy(price);
  };

  $input.addEventListener("keydown", onKeyHandler);
  $(BUY_SELECTOR.BUTTON, $input).addEventListener("click", onClickHandler);
}

const validPrice = (price) => {
  if (price < LOTTO_PRICE) alert(VALID.LOWER_PRICE);
  else if (price % LOTTO_PRICE !== 0) alert(VALID.NOT_DIVIDE);
  else return false;
  return true;
};
