import { PriceInput } from "./components/PriceInput.js";
import { PurchaseDetail } from "./components/PurchaseDetail.js";
import { WinningNumberInput } from "./components/WinningNumberInput.js";
import { Statistics } from "./components/Statistics.js";
import { createLotto } from "./util.js";

class App {
  constructor() {
    this.#setComponents();
    this.#purchaseDetailElement.hidden = true;
    this.#winningNumberInputElement.hidden = true;
  }

  #priceInputElement = document.querySelector("#price-input");
  #purchaseDetailElement = document.querySelector("#purchase-detail");
  #winningNumberInputElement = document.querySelector("#winning-number-input");
  #statisticsElement = document.querySelector("#statistics");

  #priceInputComponent;
  #purchseDetailComponent;
  #winningNumberInputComponent;
  #statisticsComponent;

  #onClickPriceInputConfirmButton = (value) => {
    const count = value / 1000;
    let lottos = [];
    for (let i = 0; i < count; i++) {
      const lotto = createLotto();
      lottos.push(lotto);
    }
    this.#purchseDetailComponent.setState(lottos);
    this.#purchaseDetailElement.hidden = false;
    this.#winningNumberInputElement.hidden = false;
  };

  #onModalShow = () => {
    this.#statisticsElement.classList.add("open");
  };

  #onModalClose = () => {
    this.#statisticsElement.classList.remove("open");
  };

  #setComponents = () => {
    this.#priceInputComponent = new PriceInput(
      this.#priceInputElement,
      this.#onClickPriceInputConfirmButton
    );
    this.#purchseDetailComponent = new PurchaseDetail(
      this.#purchaseDetailElement
    );
    this.#winningNumberInputComponent = new WinningNumberInput(
      this.#winningNumberInputElement,
      this.#onModalShow
    );
    this.#statisticsComponent = new Statistics(
      this.#statisticsElement,
      this.#onModalClose
    );
  };
}

new App();
