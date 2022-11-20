export default class LottoStateModel {
  constructor() {
    this.purchasedAmount = 0;
    this.quantity = 0;
    this.lottos = [];
    this.isOpen = false;
  }

  setIsOpen(openState) {
    this.isOpen = openState;
  }

  setPurchasedAmount(amount) {
    this.purchasedAmount = amount;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getLottoNumbers() {
    return this.lottos.map((lotto) => lotto.winningNumbers);
  }

  initLottoState() {
    this.purchasedAmount = 0;
    this.quantity = 0;
    this.lottos = [];
  }
}
