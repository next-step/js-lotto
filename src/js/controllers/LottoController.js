import LottoTicketList from "../models/LottoTicketList/index.js";
import LottoTicketView from "../views/LottoTicketView.js";
import LottoQuantityView from "../views/LottoQuantityView.js";
import { getQuantityByTotalAmount } from "../utils/calculator.js";

class LottoController {
  #quantity = null;
  constructor() {
    this.$toggleButton = document.querySelector(".lotto-numbers-toggle-button");
    this.$buyButton = document.querySelector("#buy-button");
    this.$summaryContainer = document.querySelector("#summary-container");
    this.$quantity = document.querySelector("#lotto-quantity");
    this.$lottoIconsContainer = document.querySelector("#lotto-icons");

    this.#init();
  }

  #init() {
    this.#addEvent();
  }

  #addEvent() {
    this.$buyButton.addEventListener(
      "click",
      this.#handleBuyButtonClick.bind(this)
    );

    this.$toggleButton.addEventListener(
      "click",
      this.#handleToggleButtonClick.bind(this)
    );
  }

  #setQuantity(quantity) {
    this.#quantity = quantity;
  }

  #handleBuyButtonClick() {
    const $totalAmount = document.querySelector("#total-amount");
    const quantity = getQuantityByTotalAmount(Number($totalAmount.value));

    this.#setQuantity(quantity);

    this.#renderLottoQuantity();
    this.#renderLottoTicket();
  }

  #handleToggleButtonClick() {}

  #renderLottoQuantity() {
    new LottoQuantityView({
      $target: this.$summaryContainer,
      quantity: this.#quantity,
    });
  }

  #renderLottoTicket() {
    const lottoTicketList = new LottoTicketList({
      quantity: this.#quantity,
    }).getLottoTicketList();

    new LottoTicketView({
      $target: this.$lottoIconsContainer,
      lottoTicketList,
    });
  }
}

export default LottoController;
