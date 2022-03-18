import { $ } from "../shared/consts.js";
import lottoDomain from "./lottoDomain.js";

const lotto = () => {
  const $lottoPurchaseForm = $('.lotto-purchase-form');  

  $lottoPurchaseForm.addEventListener('submit', event => {
    event.preventDefault()
  })

  const $lottoPurchaseInput = $('.lotto-purchase-input');
  const $lottoPurchaseBtn = $('.lotto-purchase-btn');

  $lottoPurchaseInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.value !== "") {
      lottoDomain(event.target.value)
    }
  })

  $lottoPurchaseBtn.addEventListener('click', () => {
    lottoDomain($lottoPurchaseInput.value)
  })
}

export default lotto;
