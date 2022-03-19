import { PriceInput } from "./components/PriceInput.js";

class App {
  #showResultButton = document.querySelector(".open-result-modal-button");
  #modalClose = document.querySelector(".modal-close");
  #modal = document.querySelector(".modal");
  #lottoNumbersToggleButton = document.querySelector(
    ".lotto-numbers-toggle-button"
  );

  #onModalShow = () => {
    this.#modal.classList.add("open");
  };

  #onModalClose = () => {
    this.#modal.classList.remove("open");
  };

  #setEvents = () => {
    this.#showResultButton.addEventListener("click", this.#onModalShow);
    this.#modalClose.addEventListener("click", this.#onModalClose);
  };

  constructor() {
    this.#setEvents();
    const priceInputElement = document.querySelector("#price-input");
    new PriceInput(priceInputElement);
  }
}

new App();
