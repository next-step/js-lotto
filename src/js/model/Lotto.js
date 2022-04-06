import { LOTTO_LENGTH } from '../constants/lotto.js';
import { createRandomNumber } from '../utils/random.js';

export default class Lotto {
  #lottoNumbers;

  constructor() {
    this.#lottoNumbers = new Set();

    while (this.#lottoNumbers.size !== LOTTO_LENGTH) {
      let num = createRandomNumber();
      this.#lottoNumbers.add(num);
    }
  }
  get lottoNumbers() {
    return new Set(this.#lottoNumbers);
  }

  checkWinningNumber(winningNumbers) {
    let answer = 0;

    winningNumbers.forEach((w, idx) => {
      if (this.lottoNumbers[idx] === w) {
        answer++;
      }
    });

    return answer;
  }
}
