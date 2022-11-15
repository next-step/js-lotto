import {$} from "./utils.js";
import {handlePaymentForm} from "./eventHandler.js";

const $paymentForm = $(".payment-form");

const init = () => {
  $paymentForm.addEventListener("submit", handlePaymentForm);
};

init();
