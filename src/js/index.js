import {selector} from "./constants/selector.js";
import {handlePaymentForm, handleShowNumber} from "./eventHandler.js";

const init = () => {
  selector.paymentForm.addEventListener("submit", handlePaymentForm);
  selector.toggleBtn.addEventListener("change", handleShowNumber);
};

init();
