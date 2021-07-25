import { VALUE } from '../util/Constans.js';
import { getRandomNum } from '../util/helper.js';

class Lotto {
  constructor() {
    this.numbers = new Set();
    this.matchCount = 0;
    this.matchBonus = false;
    this.initNumbers();
  }

  initNumbers() {
    while (this.numbers.size < VALUE.LOTTO_COUNT) {
      this.numbers.add(getRandomNum());
    }
  }
  setMatchInfo({ matchCount, matchBonus }) {
    this.matchCount = matchCount;
    this.matchBonus = matchBonus;
  }

  getNumbers() {
    return [...this.numbers.values()];
  }
}

export default Lotto;
