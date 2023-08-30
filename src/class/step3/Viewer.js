import HTML_FORMAT from "./HtmlFormat";

export default class Viewer {
  #purchaseButton;
  #paymentInput;
  #lottoContainer;
  #purchaseSection;

  constructor() {
    this.#purchaseButton = document.querySelector("button.purchase");
    this.#paymentInput = document.querySelector("input.payment");
    this.#lottoContainer = document.querySelector(".lotto-container");
  }

  addPurchaseButtonClickListener(callback) {
    this.#purchaseButton.addEventListener("click", () => {
      callback(this.#paymentInput.value);
    });
  }

  addSwitchClickListener() {
    const switchElement = document.querySelector(".switch-box");

    switchElement.addEventListener("change", this.#toggleLottoBox);
  }

  createPurchaseInfo(amount, tickets) {
    this.#purchaseSection = document.createElement("section");
    this.#purchaseSection.classList.add("mt-9", "purchase");
    this.#purchaseSection.innerHTML = HTML_FORMAT.PURCHASE_INFO(amount);
    this.#purchaseSection.innerHTML += HTML_FORMAT.LOTTO_BOX(tickets);

    const prizeInfoForm = document.querySelector("form.prize_info");

    this.#lottoContainer.insertBefore(this.#purchaseSection, prizeInfoForm);

    prizeInfoForm.classList.remove("d-none");
  }

  #toggleLottoBox() {
    const lottoBox = document.querySelector(".lotto-box");

    if (lottoBox.classList.contains("d-flex")) {
      lottoBox.classList.replace("d-flex", "d-none");
    } else {
      lottoBox.classList.replace("d-none", "d-flex");
    }
  }
}
