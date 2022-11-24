import { LOTTO_PRICE_PER_ONE, WRONG_INPUT } from "./constants.js";
export default function LottoInput({ $target, onSubmit }) {
  const $lottoInputForm = $target.querySelector("#lotto-input-form");
  const $purchaseAmountInput = $target.querySelector(".purchase-amount-input");

  this.state = 0;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const isValidInputAmount = () => {
    if (this.state < LOTTO_PRICE_PER_ONE) return false;
    return this.state % LOTTO_PRICE_PER_ONE ? false : true;
  };

  $purchaseAmountInput.addEventListener("change", (event) => {
    this.setState(event.target.value);
  });

  $lottoInputForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isValidInputAmount()) {
      alert(WRONG_INPUT);
      return;
    }
    onSubmit(this.state);
  });

  this.render = () => {
    $purchaseAmountInput.value = this.state;
  };
}
