import { PriceInput } from "./components/PriceInput.js";
import { PurchaseDetail } from "./components/PurchaseDetail.js";
import { TryForm } from "./components/TryForm.js";
import { Statistics } from "./components/Statistics.js";

class App {
  #modal = document.querySelector(".modal");

  #onClickPriceInputConfirmButton = (value) => {
    console.log(`price input confirm button clicked. value: ${value}`);
  };

  #onModalShow = () => {
    this.#modal.classList.add("open");
  };

  #onModalClose = () => {
    this.#modal.classList.remove("open");
  };

  #setComponents = () => {
    const priceInputElement = document.querySelector("#price-input");
    new PriceInput(priceInputElement, this.#onClickPriceInputConfirmButton);
    const purchaseDetailElement = document.querySelector("#purchase-detail");
    new PurchaseDetail(purchaseDetailElement);
    const tryFormElement = document.querySelector("#try-form");
    new TryForm(tryFormElement, this.#onModalShow);
    const statisticsElement = document.querySelector("#statistics");
    new Statistics(statisticsElement, this.#onModalClose);
  };

  constructor() {
    this.#setComponents();
  }
}

new App();
