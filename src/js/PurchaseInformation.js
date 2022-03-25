export default class PurchaseInformation {

  constructor(purchasedLottoCount, purchasedLottos) {
    this.purchasedLottoCount = purchasedLottoCount;
    this.purchasedLottos = purchasedLottos;
  }

  get purchasedLottoCount() {
    return this._purchasedLottoCount;
  }


  set purchasedLottoCount(newPurchasedLottoCount) {
    this._purchasedLottoCount = newPurchasedLottoCount;
  }

  get purchasedLottos() {
    return this._purchasedLottos;
  }

  set purchasedLottos(newPurchasedLottos) {
    this._purchasedLottos = newPurchasedLottos;
  }
}