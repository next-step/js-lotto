import { LOTTO_NUMBER_TYPE, RANK } from '../constant/index.js';

export default class LottoTicket {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  #getNumberOfWinning(winningNumberMap) {
    return this.#numbers.reduce(
      (acc, cur) => {
        const key = winningNumberMap.get(String(cur));
        if (key) {
          acc[key] += 1;
        }
        return acc;
      },
      { [LOTTO_NUMBER_TYPE.WINNING]: 0, [LOTTO_NUMBER_TYPE.BONUS]: 0 }
    );
  }

  getRank(winningNumberMap) {
    const { winning, bonus } = this.#getNumberOfWinning(winningNumberMap);
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH, OUT } = RANK;

    switch (winning) {
      case 6:
        return FIRST.KEY;
      case 5:
        return bonus ? SECOND.KEY : THIRD.KEY;
      case 4:
        return FOURTH.KEY;
      case 3:
        return FIFTH.KEY;
      default:
        return OUT.KEY;
    }
  }
}
