import Lotto from './model/Lotto.js';
import { VALUE } from './util/Constans.js';

export default class Store {
  constructor(storage) {
    this.storage = storage;

    this.isDetail = false;
    this.purchasePrice = 0;
  }

  setLotto(price) {
    const numberOfLotto = Math.floor(price / VALUE.LOTTO_UNIT);
    this.storage.lottos = Array.from(
      { length: numberOfLotto },
      () => new Lotto()
    );
  }

  setPurchasePrice(price) {
    this.purchasePrice = price;
  }

  setMatchInfo(lotto, matchInfo) {
    lotto.setMatchInfo(matchInfo);
  }

  getLottos() {
    return this.storage.lottos;
  }

  getPurchasePrice() {
    return this.purchasePrice;
  }

  toggleSwitch() {
    return (this.isDetail = !this.isDetail);
  }

  reset() {
    this.storage.lottos = [];
    this.isDetail = false;
    this.purchasePrice = 0;
  }
}
