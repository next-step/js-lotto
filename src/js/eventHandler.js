import {selector} from "./constants/selector.js";
import {buyLotto} from "./service.js";

export const handlePaymentForm = (event) => {
  event.preventDefault();
  const payment = event.target[0].valueAsNumber;
  event.target[0].value = null;

  buyLotto(payment);
};

export const handleShowNumber = (event) => {
  if (event.target.checked) {
    selector.lottoContainer.classList.remove("lotto-container-hidden");
  } else {
    selector.lottoContainer.classList.add("lotto-container-hidden");
  }
};
