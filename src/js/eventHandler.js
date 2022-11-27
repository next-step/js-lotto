import {selector} from "./constants/selector.js";
import {buyLotto} from "./service.js";

export const handlePaymentForm = (event) => {
  event.preventDefault();

  const payment = selector.paymentInput.valueAsNumber;
  selector.paymentInput.valueAsNumber = null;

  buyLotto(payment);
};

export const handleShowNumber = ({target}) => {
  selector.lottoContainer.classList.toggle(
    "lotto-container-hidden",
    !target.checked
  );
};
