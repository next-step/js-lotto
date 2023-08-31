import HTML_FORMAT from "./HtmlFormat";

export default class Viewer {
  #purchaseButton;
  #paymentInput;
  #lottoContainer;
  #purchaseSection;
  #openResultModalButton;
  #modal;

  constructor() {
    this.#purchaseButton = document.querySelector("button.purchase");
    this.#paymentInput = document.querySelector("input.payment");
    this.#lottoContainer = document.querySelector(".lotto-container");
    this.#openResultModalButton = document.querySelector(
      ".open-result-modal-button",
    );

    document
      .querySelector(".modal-close")
      .addEventListener("click", this.closeResultModal.bind(this));

    this.#modal = document.querySelector(".modal");
  }

  addPurchaseButtonClickListener(callback) {
    this.#purchaseButton.addEventListener("click", () => {
      callback(this.#paymentInput.value);
    });
  }

  addOpenResultModalButtonClickHandler(callback) {
    this.#openResultModalButton.addEventListener("click", () => {
      const winningNumbers = Array.from(
        document.querySelectorAll("input.winning-number"),
      )
        .map((input) => input.value)
        .filter((value) => value.trim().length > 0)
        .map(Number);

      const bonusNumber = Number(
        document.querySelector("input.bonus-number").value,
      );

      callback(winningNumbers, bonusNumber);
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

    const prizeInfoForm = document.querySelector("form.prize-info");

    this.#lottoContainer.insertBefore(this.#purchaseSection, prizeInfoForm);

    prizeInfoForm.classList.remove("d-none");
  }

  #removePurchaseInfo() {
    this.#purchaseSection.remove();

    this.#purchaseSection = undefined;

    this.#paymentInput.value = "";
  }

  #toggleLottoBox() {
    const lottoBox = document.querySelector(".lotto-box");

    if (lottoBox.classList.contains("d-flex")) {
      lottoBox.classList.replace("d-flex", "d-none");
    } else {
      lottoBox.classList.replace("d-none", "d-flex");
    }
  }

  setPrizeInfo(totalPrize, profitRatio) {
    const resultTableTbody = document.querySelector("table.result-table tbody");

    const profitRatioElement = document.querySelector("div.modal-inner p");

    resultTableTbody.innerHTML = HTML_FORMAT.PRIZE_FORMAT(totalPrize);

    profitRatioElement.textContent = HTML_FORMAT.PROFIT_RATIO(profitRatio);
  }

  #resetPrizeInfo() {
    const resultTableTbody = document.querySelector("table.result-table tbody");

    const profitRatioElement = document.querySelector("div.modal-inner p");

    const prizeInfoForm = document.querySelector("form.prize-info");

    resultTableTbody.innerHTML = "";

    profitRatioElement.textContent = "";

    prizeInfoForm.classList.add("d-none");

    Array.from(document.querySelectorAll("input.winning-number")).forEach(
      (el) => {
        el.value = "";
      },
    );

    document.querySelector("input.bonus-number").value = "";
  }

  openResultModal() {
    this.#modal.classList.add("open");
  }

  closeResultModal() {
    this.#modal.classList.remove("open");
  }

  reset() {
    this.closeResultModal();

    this.#resetPrizeInfo();

    this.#removePurchaseInfo();
  }

  addResetButtonClickHandler(callback) {
    document.querySelector("button.restart").addEventListener("click", () => {
      callback();
    });
  }
}
