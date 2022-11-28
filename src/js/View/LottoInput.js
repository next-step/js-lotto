import { LOTTO, ERROR_MESSAGES } from "../constants.js";
export default function LottoInput({ $target, onSubmit }) {
  const $lottoInputForm = $target.querySelector("#lotto-input-form");
  const $purchaseAmountInput = $target.querySelector(".purchase-amount-input");

  this.state = 0;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const isValidInputAmount = () => {
    if (this.state < LOTTO.LOTTO_PRICE_PER_ONE_TICKET) return false;
    return this.state % LOTTO.LOTTO_PRICE_PER_ONE_TICKET ? false : true;
  };

  $purchaseAmountInput.addEventListener("change", (event) => {
    this.setState(event.target.value);
  });

  const handleSubmitInputAmount = (event) => {
    event.preventDefault();

    if (!isValidInputAmount()) {
      alert(ERROR_MESSAGES.WRONG_INPUT);
      return;
    }
    onSubmit(this.state);
  };

  $lottoInputForm.addEventListener("submit", handleSubmitInputAmount);

  this.render = () => {
    $purchaseAmountInput.value = this.state;
  };
}
