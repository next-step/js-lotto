import {PRICE} from "../constants/constants.mjs";
import {calculateProfit} from "../module/lotto.js";

export default class StatisticsModal {
  #modal;
  #earnings;

  constructor() {
    this.#modal = document.querySelector('.modal');
    this.#earnings = this.#modal.querySelector('.earnings__number');
  }

  openModal = (winningNumbers, user) => {
    this.#modal.classList.add('open');
    // TODO: 당첨 통계를 보여준다.
    // TODO: 수익률을 보여준다.
    this.#earnings.innerText = this.#calculateProfitRate(winningNumbers, user.purchaseHistory)
  }

  #calculateProfitRate = (winningNumbers, histories) => {
    const totalProfit = histories.reduce((acc, history) => acc + this.#getProfit(winningNumbers, history), 0);
    return totalProfit / (histories.length * PRICE) * 100 - 100
  }

  #getProfit = (winningNumbers, history) => {
    let isIncludeBonus = false;
    const matchedNumbers = history.filter(number => {
      if (!isIncludeBonus && winningNumbers.bonusNumber === number) {
        isIncludeBonus = true;
      }
      return winningNumbers.numbers.includes(number);
    });
    const { length: matchedCount } = matchedNumbers;

    return calculateProfit({ matchedCount, isIncludeBonus })
  }

  closeModal = () => {
    this.#modal.classList.remove('open');
  }
}
