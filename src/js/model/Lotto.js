import { VALUE } from '../util/Constans.js';
import { getRandomNum } from '../util/helper.js';

class Lotto {
  constructor() {
    this.numbers = new Set();
    this.initNumbers();
  }

  initNumbers() {
    while (this.numbers.size < VALUE.LOTTO_COUNT) {
      this.numbers.add(getRandomNum());
    }
  }

  getNumbers() {
    return [...this.numbers.values()];
  }
}

export default Lotto;
