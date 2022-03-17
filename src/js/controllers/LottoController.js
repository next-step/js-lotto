import LottoTicketList from "../models/LottoTicketList/index.js";

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
    const $inputMoney = document.querySelector("#input-money");
    const inputMoney = $inputMoney.value;
  }
}

export default LottoController;
