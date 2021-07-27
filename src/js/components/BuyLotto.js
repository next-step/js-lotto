import { SELECTORS } from "../utils/constants.js";
import { $ } from "../utils/dom.js";

function BuyLotto({ onClickBuy }) {
  this.$target = $(SELECTORS.LOTTO_FORM);
  this.onClickBuy = onClickBuy;

  this.bindEvent = () => {
    this.$target.addEventListener("submit", this.onSumbit);
  };

  this.onSumbit = (e) => {
    e.preventDefault();
    const money = parseInt($(SELECTORS.LOTTO_INPUT).value);
    if (isNaN(money)) return;
    this.onClickBuy(money);
    $(SELECTORS.LOTTO_INPUT).value = "";
  };

  this.bindEvent();
}

export default BuyLotto;
