import Lotto from './Lotto.js';
import { $ } from '../utils/selector.js';
import { ERROR_INPUT_PRICE_UNIT } from '../constants/message.js';
import { PRICE_PER_PAPER } from '../constants/lotto.js';

export default class LottoManager {
  #lottos;
  #quantity;

  constructor(inputPrice) {
    if (inputPrice % PRICE_PER_PAPER !== 0) {
      alert(ERROR_INPUT_PRICE_UNIT);
      $('#input-price').value = '';
      return;
    }

    this.#quantity = inputPrice / PRICE_PER_PAPER;
    this.#lottos = new Array(this.#quantity).fill().map((e) => new Lotto());
  }

  get lottos() {
    return this.#lottos;
  }

  get quantity() {
    return this.#quantity;
  }
}
