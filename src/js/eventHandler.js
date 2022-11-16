import {Selector} from "./constants/selector.js";
import {issueLotto, countLotto} from "./view.js";

const buyLotto = (payment) => {
  const LOTTO_PRICE = 1000;
  const numberOfLotto = Math.floor(payment / LOTTO_PRICE);

  issueLotto(numberOfLotto);
  countLotto(numberOfLotto);
};

export const handlePaymentForm = (event) => {
  event.preventDefault();
  const payment = event.target[0].valueAsNumber;
  event.target[0].value = null;

  buyLotto(payment);
};

export const handleShowNumber = (event) => {
  if (event.target.checked) {
    Selector.lottoContainer.classList.remove("lotto-container-hidden");
  } else {
    Selector.lottoContainer.classList.add("lotto-container-hidden");
  }
};
