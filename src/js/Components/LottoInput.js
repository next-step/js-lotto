import { LOTTO, ERROR_MESSAGES } from "../constants.js";

export default class LottoInput {
  constructor({ $target, onSubmit, prop }) {
    this.$target = $target;
    this.onSubmit = onSubmit;
    this.$lottoInputForm = $target.querySelector("#lotto-input-form");
    this.$purchaseAmountInput = $target.querySelector(".purchase-amount-input");
    this.state = prop;

    this.$purchaseAmountInput.addEventListener("change", (event) => {
      this.setState(event.target.value);
    });

    this.$lottoInputForm.addEventListener(
      "submit",
      this.handleSubmitInputAmount
    );
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  isValidInputAmount() {
    if (this.state < LOTTO.LOTTO_PRICE_PER_ONE_TICKET) return false;
    return this.state % LOTTO.LOTTO_PRICE_PER_ONE_TICKET ? false : true;
  }

  handleSubmitInputAmount = (event) => {
    event.preventDefault();

    if (!this.isValidInputAmount()) {
      alert(ERROR_MESSAGES.WRONG_INPUT);
      return;
    }
    this.onSubmit(this.state);
  };

  render() {
    this.$purchaseAmountInput.value = this.state || "";
  }
}
