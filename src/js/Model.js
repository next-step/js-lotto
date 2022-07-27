import { LOTTO_PRICE, LOTTO_NUMBER, LOTTO_LENGTH, PRIZE_RANK } from './constant.js';

export default class LottoModel {
  constructor() {
    this.lottoNumbers = [];
    this.reward = null;

    this.isShowingNumbers = false;
    this.isModalOpen = false;
  }

  static #winningCountInitialValue = {
    FIRST: 0,
    SECOND: 0,
    THIRD: 0,
    FOURTH: 0,
    FIFTH: 0,
  };

  #isDuplicated(numbers) {
    return new Set(numbers).size === LOTTO_LENGTH + 1;
  }

  #getQuantity(paidAmount) {
    const quantity = Math.floor(paidAmount / LOTTO_PRICE);
    return quantity;
  }

  #getLottoNumbers() {
    const baseNumbers = Array.from({ length: LOTTO_NUMBER.MAX }, (_, i) => i + 1);
    const numbers = new Set();
    do {
      numbers.add(Math.floor(Math.random() * baseNumbers.length) + 1);
    } while (numbers.size < LOTTO_LENGTH);
    return Array.from(numbers);
  }

  #checkMatchedNumbers(arr, { winningNumbers, bonusNumber }) {
    let matched = 12 - new Set(winningNumbers.concat(arr)).size;
    if (matched === 5 && arr.includes(bonusNumber)) return 'BONUS';
    return matched;
  }

  #getMatchedCount(numbers) {
    const winningNumbers = [...numbers].splice(0, 6);
    const bonusNumber = [...numbers].pop();
    return this.lottoNumbers
      .map((arr) => this.#checkMatchedNumbers(arr, { winningNumbers, bonusNumber }))
      .reduce((acc, count) => {
        const exceptionCount = [0, 1, 2];
        if (exceptionCount.includes(count)) return acc;
        return { ...acc, [PRIZE_RANK[count]]: (acc[count] || 0) + 1 };
      }, LottoModel.#winningCountInitialValue);
  }

  generateLotto(paidAmount) {
    const quantity = this.#getQuantity(paidAmount);
    this.lottoNumbers = Array.from({ length: quantity }, () => this.#getLottoNumbers());
  }

  checkWinningNumbers(winningNumbers) {
    if (!this.#isDuplicated(winningNumbers)) throw new Error('중복된 번호를 입력할 수 없습니다.');
    const matchedCount = this.#getMatchedCount(winningNumbers);
    this.reward = matchedCount;
  }

  resetWinningNumbers() {
    this.lottoNumbers = [];
    this.reward = null;
  }

  toggleShowNumber(isShowingNumbers) {
    this.isShowingNumbers = isShowingNumbers;
  }

  toggleShowModal(isModalOpen) {
    this.isModalOpen = isModalOpen;
  }
}
