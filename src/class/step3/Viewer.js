export default class Viewer {
  #purchaseButton;
  #paymentInput;
  #purchaseInfoBox;
  #showTicketsSwitch;
  #lottoBox;
  #lottoTickets;

  constructor() {
    this.#purchaseButton = document.querySelector("button.purchase");
    this.#paymentInput = document.querySelector("input.payment");
    this.#purchaseInfoBox = document.querySelector(".purchase-info");
    this.#showTicketsSwitch = document.querySelector("label.switch");
    this.#lottoBox = document.querySelector(".lotto-box");
    this.#lottoTickets = document.querySelectorAll(".lotto-ticket");
  }

  addPurchaseButtonClickListener(callback) {
    this.#purchaseButton.addEventListener("click", () => {
      callback(this.#paymentInput.value);
    });
  }
}
