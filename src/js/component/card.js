import { LOTTO } from "../utils/constant.js";
import { createElement, getRandomInt } from "../utils/utils.js";

export default function Card() {
  let numCnt = LOTTO.NUMBER_COUNT;
  this.numList = [];

  while (numCnt) {
    this.numList.push(getRandomInt(1, 45));
    numCnt--;
  }

  this.getCardDom = () => {
    const wrapper = createElement("li", "mx-1", "text-4xl", "d-flex");
    const cardIcon = createElement("span", "card-icon");
    const cardNumber = createElement("span", "card-number");
    cardIcon.textContent = LOTTO.CARD;
    cardNumber.textContent = this.numList.toString();
    wrapper.append(cardIcon, cardNumber);

    return wrapper;
  };
}
