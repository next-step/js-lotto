import Lotto from './model/Lotto.js';
import { VALUE } from './util/Constans.js';

export default class Store {
  constructor(storage) {
    this.storage = storage;

    this.isDetail = false;
  }

  setLotto(price) {
    const numberOfLotto = Math.floor(price / VALUE.LOTTO.LOTTO_UNIT);
    this.storage.lottos = Array.from(
      { length: numberOfLotto },
      () => new Lotto()
    );
  }
  getLottos() {
    return this.storage.lottos;
  }

  toggleSwitch() {
    return (this.isDetail = !this.isDetail);
  }
}
