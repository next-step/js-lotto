import LottoInput from "./component/lottoInput.js";
import LottoPlay from "./component/lottoPlay.js";

export default function App(container) {
  this.container = container;
  this.price = 0;
  this.cardList = [];

  new LottoInput(this);
  const play = new LottoPlay(this);

  this.setCard = (price) => {
    this.price = price;
    this.cardList = play.setCard(this.price);
    play.displayCard(this.cardList);
  };
}
