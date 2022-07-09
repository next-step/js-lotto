export class PurchasedLottos {
  #element;

  constructor(element) {
    this.#element = element;
    this.hide();
  }

  hide() {
    this.#element.style.display = "none";
  }

  display() {
    this.#element.style.display = "block";
  }

  setNumber(number) {
    this.#element.querySelector("#total-purchased").innerHTML = number;
  }

  handleToggleButton(checked) {
    this.#element.querySelector(".lotto-numbers-toggle-button").checked =
      checked;
  }
}
