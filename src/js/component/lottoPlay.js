import { $, setElementDisplay, getCardCount } from "../utils/utils.js";
import Card from "./card.js";

export default function LottoPlay(scope) {
  const cardArea = $(".card-area", scope.container);
  const toggleButton = $(".switch span", cardArea);
  const cardListArea = $(".card-list", cardArea);
  const cardCount = $(".card-count", cardArea);

  this.setCard = (price) => {
    let cardCnt = getCardCount(price);
    const cardList = [];

    while (cardCnt) {
      cardList.push(new Card());
      cardCnt--;
    }

    return cardList;
  };

  this.displayCard = (cardList) => {
    setElementDisplay(cardArea, true);
    cardCount.textContent = cardList.length;
    cardList.forEach((card) => cardListArea.appendChild(card.getCardDom()));
  };

  const showCardNumber = () => {
    cardArea.classList.toggle("show-number");
  };

  toggleButton.addEventListener("click", showCardNumber.bind(this));
}
