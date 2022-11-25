import {selector} from "./constants/selector.js";
import {buyLotto} from "./service.js";

export const handlePaymentForm = ({target}) => {
  event.preventDefault();

  const payment = target[0].valueAsNumber;
  target[0].value = null;

  buyLotto(payment);
};

export const handleShowNumber = ({target}) => {
  selector.lottoContainer.classList.toggle(
    "lotto-container-hidden",
    !target.checked
  );
};
