import {selector} from "./constants/selector.js";
import {
  handlePaymentForm,
  handleShowNumber,
  handleWinningForm,
  handleCloseModal,
} from "./eventHandler.js";

const addEvent = () => {
  selector.paymentForm.addEventListener("submit", handlePaymentForm);
  selector.toggleBtn.addEventListener("change", handleShowNumber);
  selector.winningForm.addEventListener("submit", handleWinningForm);

  selector.modalClose.addEventListener("click", handleCloseModal);
};

addEvent();
