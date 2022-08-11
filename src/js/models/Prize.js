import { LOTTO_LENGTH, PRIZE_RANK } from '../constant.js';

export class Prize {
  reward;

  constructor() {
    this.reward = null;
  }

  static #winningCountInitialValue = {
    FIRST: 0,
    SECOND: 0,
    THIRD: 0,
    FOURTH: 0,
    FIFTH: 0,
  };

  #checkMatchedNumbers(lottoNumbers, { winningNumbers, bonusNumber }) {
    const matched = lottoNumbers.length + winningNumbers.length - new Set(winningNumbers.concat(lottoNumbers)).size;
    const isBonus = matched === 5 && lottoNumbers.includes(bonusNumber);
    if (isBonus) return 'BONUS';

    return matched;
  }

  #calculatePrizeOnEachPlace(acc, count) {
    const exceptionCount = [0, 1, 2];
    if (exceptionCount.includes(count)) return acc;

    return { ...acc, [PRIZE_RANK[count]]: (acc[count] || 0) + 1 };
  }

  #getMatchedCount(lottoNumbers, numbers) {
    const winningNumbers = [...numbers].splice(0, 6);
    const bonusNumber = [...numbers].pop();

    return lottoNumbers
      .map((arr) => this.#checkMatchedNumbers(arr, { winningNumbers, bonusNumber }))
      .reduce(this.#calculatePrizeOnEachPlace, Prize.#winningCountInitialValue);
  }

  checkWinningNumbers(lottoNumbers, winningNumbers) {
    const isDuplicated = new Set(winningNumbers).size !== LOTTO_LENGTH + 1;
    if (isDuplicated) throw new Error('중복된 번호를 입력할 수 없습니다.');
    const matchedCount = this.#getMatchedCount(lottoNumbers, winningNumbers);
    this.reward = matchedCount;
  }
}
