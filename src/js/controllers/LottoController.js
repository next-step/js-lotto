import LottoTicketList from "../models/LottoTicketList/index.js";
import { getQuantityByTotalAmount } from "../utils/calculator.js";
import LottoQuantityView from "../views/LottoQuantityView.js";
class LottoController {
  constructor() {
    this.$toggleButton = document.querySelector(".lotto-numbers-toggle-button");
    this.$buyButton = document.querySelector("#buy-button");
    this.$summaryContainer = document.querySelector("#summary-container");
    this.$quantity = document.querySelector("#lotto-quantity");
    this.init();
  }

  init() {
    this.addEvent();
  }

  addEvent() {
    this.$buyButton.addEventListener(
      "click",
      this.handleBuyButtonClick.bind(this)
    );
  }

  handleBuyButtonClick() {
    const $totalAmount = document.querySelector("#total-amount");
    const quantity = getQuantityByTotalAmount(Number($totalAmount.value));
    const lottoTicketList = new LottoTicketList({ quantity: quantity });
    this.renderLottoQuantity(quantity);
  }

  renderLottoQuantity(quantity) {
    new LottoQuantityView({ $target: this.$quantity, quantity });
  }
}

export default LottoController;
