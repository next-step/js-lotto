import {selector} from "./constants/selector.js";
import {handlePaymentForm, handleShowNumber} from "./eventHandler.js";

const addEvent = () => {
  selector.paymentForm.addEventListener("submit", handlePaymentForm);
  selector.toggleBtn.addEventListener("change", handleShowNumber);
};

addEvent();
