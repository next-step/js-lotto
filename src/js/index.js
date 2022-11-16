import {Selector} from "./constants/selector.js";
import {handlePaymentForm, handleShowNumber} from "./eventHandler.js";

const init = () => {
  Selector.paymentForm.addEventListener("submit", handlePaymentForm);
  Selector.toggleBtn.addEventListener("change", handleShowNumber);
};

init();
