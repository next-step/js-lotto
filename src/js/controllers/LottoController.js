import LottoTicketList from "../models/LottoTicketList/index.js";
import LottoTicketView from "../views/LottoTicketView.js";
import WinningNumbersView from "../views/WinningNumberView.js";
import Validator from "../models/Validator/index.js";
import { getQuantityByTotalAmount } from "../utils/calculator.js";

class LottoController {
  #quantity = null;

  constructor() {
    this.validator = new Validator();
    this.isActive = false;
    this.$app = document.querySelector("#app");
    this.$totalAmountForm = document.querySelector("#total-amount-form");
    this.$lottoTicketSection = document.querySelector("#lotto-ticket-section");
    this.#addEvent();
  }
  #addEvent() {
    this.$app.addEventListener("click", ({ target }) => {
      if (target.id === "total-amount") {
        this.#buyLottoTicket();
      }

      if (target.className === "lotto-numbers-toggle-button") {
        this.#toggleTicketDetail();
      }
    });

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
    this.#renderBuyingResult();
  };

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

  #renderBuyingResult() {
    const lottoTicketList = new LottoTicketList({
      quantity: this.#quantity,
    }).getLottoTicketList();

    new LottoTicketView({
      $target: this.$lottoTicketSection,
      props: { lottoTicketList, quantity: this.#quantity },
    });

    const $winningNumbersContainer = document.querySelector(
      "#winning-container"
    );

    new WinningNumbersView({ $target: $winningNumbersContainer });
  }
}

export default LottoController;
