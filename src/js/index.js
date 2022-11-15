import {$} from "./utils.js";
import {handlePaymentForm, handleShowNumber} from "./eventHandler.js";

const $paymentForm = $(".payment-form");
const $toggleBtn = $(".lotto-numbers-toggle-button");

const init = () => {
  $paymentForm.addEventListener("submit", handlePaymentForm);
  $toggleBtn.addEventListener("change", handleShowNumber);
};

init();
