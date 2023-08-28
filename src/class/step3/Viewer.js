export default class Viewer {
  #purchaseButton;
  #paymentInput;

  constructor() {
    this.#purchaseButton = document.querySelector("button.purchase");
    this.#paymentInput = document.querySelector("input.payment");
  }

  addPurchaseButtonClickListener(callback) {
    this.#purchaseButton.addEventListener("click", () => {
      callback(this.#paymentInput.value);
    });
  }
}
