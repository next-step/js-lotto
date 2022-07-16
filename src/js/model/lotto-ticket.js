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
    switch (winning) {
      case 6:
        return RANK.FIRST;
      case 5:
        return bonus ? RANK.SECOND : RANK.THIRD;
      case 4:
        return RANK.FOURTH;
      case 3:
        return RANK.FIFTH;
      default:
        return null;
    }
  }
}
