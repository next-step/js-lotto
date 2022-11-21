import { LOTTO_PRICE_PER_ONE, WRONG_INPUT } from "./constants.js";
export default function LottoInput({ $target, onSubmit }) {
  const $inputAmount = $target.querySelector(
    "[data-target=purchase-amount-input]"
  );

  const $confirmPurchaseBtn = $target.querySelector(
    "[data-target=confirm-purchase]"
  );

  this.state = 0;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const isValidInputAmount = () => {
    if (this.state < LOTTO_PRICE_PER_ONE) return false;
    return this.state % LOTTO_PRICE_PER_ONE ? false : true;
  };

  $inputAmount.addEventListener("change", (event) => {
    this.setState(event.target.value);
  });

  $confirmPurchaseBtn.addEventListener("click", () => {
    if (!isValidInputAmount()) {
      alert(WRONG_INPUT);
      return;
    }
    alert(this.state);
    onSubmit(this.state);
  });
}
