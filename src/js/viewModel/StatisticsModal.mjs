import {PRICE} from "../constants/constants.mjs";
import {calculateProfit, ENUM_PRIZE_MONEY} from "../module/lotto.js";

export default class StatisticsModal {
  #modal;
  #earnings;
  #table;
  #modalClose;

  constructor() {
    this.#modal = document.querySelector('.modal');
    this.#modalClose = this.#modal.querySelector(".modal-close");
    this.#earnings = this.#modal.querySelector('.earnings__number');
    this.resetButton = this.#modal.querySelector('button');
    this.#table = ['PRIZE_MONEY_3', 'PRIZE_MONEY_4', 'PRIZE_MONEY_5', 'PRIZE_MONEY_5_WITH_BONUS', 'PRIZE_MONEY_6'].reduce((acc, curr) => ({
      ...acc,
      [curr]: this.#modal.querySelector(`.${curr}`)
    }), {});

    this.#modalClose.addEventListener('click', () => {
      this.closeModal()
    });
  }

  reset = () => {
    this.#earnings.innerText = 0;
    this.closeModal();
  }

  openModal = (winningNumbers, user) => {
    this.#modal.classList.add('open');
    const statistics = this.#calculateStatistics(winningNumbers, user.purchaseHistory)

    this.#reRender(statistics)
  }

  closeModal = () => {
    this.#modal.classList.remove('open');
  }

  #reRender({ profitRate, statistics }) {
    this.#earnings.innerText = profitRate;
    Object.keys(statistics).forEach(key => {
      this.#table[key].innerText = statistics[key];
    })
  }

  #calculateStatistics = (winningNumbers, histories) => {
    const {totalProfit, statistics} = histories.reduce((acc, history) => {
      const profit =  this.#getProfit(winningNumbers, history)
      const rank = ENUM_PRIZE_MONEY[profit];
      if (rank) {
        acc.statistics[rank] = acc.statistics[rank] ? acc.statistics[rank] + 1 : 1
        acc.totalProfit += profit;
      }
      return acc;
    }, {
      totalProfit: 0,
      statistics: {}
    });
    return {
       profitRate: (totalProfit / (histories.length * PRICE) * 100 - 100).toFixed(),
       statistics
    }
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
    const profit = calculateProfit({ matchedCount, isIncludeBonus })
    return profit;
  }
}
