import { PriceInput } from "./components/PriceInput.js";
import { PurchaseDetail } from "./components/PurchaseDetail.js";
import { TryForm } from "./components/TryForm.js";
import { Statistics } from "./components/Statistics.js";
import { createLotto } from "./util.js";

class App {
  #priceInputElement = document.querySelector("#price-input");
  #purchaseDetailElement = document.querySelector("#purchase-detail");
  #tryFormElement = document.querySelector("#try-form");
  #statisticsElement = document.querySelector("#statistics");

  #priceInputComponent;
  #purchseDetailComponent;
  #tryFormComponent;
  #statisticsComponent;

  #onClickPriceInputConfirmButton = (value) => {
    console.log(`price input confirm button clicked. value: ${value}`);
    const count = value / 1000;
    let lottos = [];
    for (let i = 0; i < count; i++) {
      const lotto = createLotto();
      lottos.push(lotto);
    }
    this.#purchseDetailComponent.setState(lottos);
    this.#purchaseDetailElement.hidden = false;
    this.#tryFormElement.hidden = false;
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
    this.#tryFormComponent = new TryForm(
      this.#tryFormElement,
      this.#onModalShow
    );
    this.#statisticsComponent = new Statistics(
      this.#statisticsElement,
      this.#onModalClose
    );
  };

  constructor() {
    this.#setComponents();
    this.#purchaseDetailElement.hidden = true;
    this.#tryFormElement.hidden = true;
  }
}

new App();
