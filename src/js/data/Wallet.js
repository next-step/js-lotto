import { LOTTO_PRICE } from '../constants/lotto.js';

export default class Wallet {
  static #lottos;

  static get lottos() {
    return Wallet.#lottos.map((purchasedLotto) => purchasedLotto.value);
  }

  static setLottos(lottoList) {
    Wallet.#lottos = lottoList;
  }

  static get purchasedPrice() {
    return Wallet.lottos.length * LOTTO_PRICE;
  }
}
