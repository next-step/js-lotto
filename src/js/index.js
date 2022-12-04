import {selector} from "./constants/selector.js";
import {
  handlePaymentForm,
  handleShowNumber,
  handleWinningForm,
  handleCloseModal,
  handleAllReset,
} from "./eventHandler.js";

const addEvent = () => {
  selector.paymentForm.addEventListener("submit", handlePaymentForm);
  selector.toggleBtn.addEventListener("change", handleShowNumber);
  selector.winningForm.addEventListener("submit", handleWinningForm);
  selector.modalCloseBtn.addEventListener("click", handleCloseModal);
  selector.allReset.addEventListener("click", handleAllReset);
};

addEvent();
