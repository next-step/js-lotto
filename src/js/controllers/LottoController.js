import LottoTicketList from "../models/LottoTicketList/index.js";
import LottoTicketView from "../views/LottoTicketView.js";
import LottoQuantityView from "../views/LottoQuantityView.js";
import WinningNumbersView from "../views/WinningNumberView.js";
import Validator from "../models/Validator/index.js";
import { getQuantityByTotalAmount } from "../utils/calculator.js";

class LottoController {
  #quantity = null;
  constructor() {
    this.validator = new Validator();
    this.$buyButton = document.querySelector("#buy-button");
    this.$summaryContainer = document.querySelector("#summary-container");
    this.$quantity = document.querySelector("#lotto-quantity");
    this.$lottoIconsContainer = document.querySelector("#lotto-icons");
    this.$totalAmountForm = document.querySelector("#total-amount-form");
    this.isActive = false;

    this.#addEvent();
  }
  #addEvent() {
    this.$buyButton.addEventListener("click", this.#buyLottoTicket);
    this.$totalAmountForm.addEventListener("submit", e => {
      this.#buyLottoTicket();
      e.preventDefault();
    });
  }

  #setQuantity(quantity) {
    this.#quantity = quantity;
  }

  #buyLottoTicket = () => {
    const $totalAmount = document.querySelector("#total-amount");
    const totalAmount = Number($totalAmount.value);

    if (!this.validator.validateTotalAmount(totalAmount)) {
      return;
    }

    const quantity = getQuantityByTotalAmount(totalAmount);

    this.#setQuantity(quantity);

    this.#renderLottoQuantity();
    this.#renderLottoTicket();
    this.#renderWinningNumbers();

    this.#addToggleButtonEvent();
  };

  #addToggleButtonEvent() {
    const $toggleButton = document.querySelector(
      ".lotto-numbers-toggle-button"
    );

    $toggleButton.addEventListener("input", this.#toggleTicketDetail);
  }

  #toggleTicketDetail = () => {
    const $iconContainer = document.querySelectorAll(".ticket-list");
    const $iconDetail = document.querySelectorAll(".lotto-detail");

    $iconContainer.forEach(icon => {
      icon.classList.toggle("icon-wide");
    });
    $iconDetail.forEach(icon => {
      icon.classList.toggle("hidden");
    });
  };

  #renderLottoQuantity() {
    new LottoQuantityView({
      $target: this.$summaryContainer,
      props: { quantity: this.#quantity },
    });
  }

  #renderLottoTicket() {
    const lottoTicketList = new LottoTicketList({
      quantity: this.#quantity,
    }).getLottoTicketList();

    new LottoTicketView({
      $target: this.$lottoIconsContainer,
      props: { lottoTicketList },
    });
  }
  #renderWinningNumbers() {
    const $winningNumbersContainer = document.querySelector(
      "#winning-container"
    );

    new WinningNumbersView({ $target: $winningNumbersContainer });
  }
}

export default LottoController;
