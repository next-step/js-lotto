import LottoTicketList from "../models/LottoTicketList/index.js";
import { getLottoQuantityByTotalAmount } from "../utils/calculator.js";
class LottoController {
  constructor() {
    this.init();
  }

  init() {
    this.addEvent();
  }

  addEvent() {
    const $buyButton = document.querySelector("#buy-button");
    $buyButton.addEventListener("click", this.handleBuyButtonClick);
  }

  handleBuyButtonClick() {
    const $totalAmount = document.querySelector("#total-amount");
    const quantity = getLottoQuantityByTotalAmount(Number($totalAmount.value));
    const lottoTicketList = new LottoTicketList({ quantity: quantity });
  }
}

export default LottoController;
