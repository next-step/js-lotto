import { LOTTO_UNIT_PRICE, RANK } from '../constant/index.js';

export default class LottoResult {
  #rankObj;

  constructor(result) {
    this.#rankObj = result;
  }

  get rankObj() {
    return this.#rankObj;
  }

  #getPayment() {
    const ticketCount = Object.values(this.#rankObj).reduce(
      (acc, cur) => acc + cur
    );
    return ticketCount * LOTTO_UNIT_PRICE;
  }

  #getPrizeMoneyOfTicket = (key, value) => {
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH, OUT } = RANK;
    switch (key) {
      case FIRST.KEY:
        return FIRST.PRIZE_MONEY * value;
      case SECOND.KEY:
        return SECOND.PRIZE_MONEY * value;
      case THIRD.KEY:
        return THIRD.PRIZE_MONEY * value;
      case FOURTH.KEY:
        return FOURTH.PRIZE_MONEY * value;
      case FIFTH.KEY:
        return FIFTH.PRIZE_MONEY * value;
      case OUT.KEY:
        return OUT.PRIZE_MONEY * value;
      default:
        return 0;
    }
  };

  #getPrizeMoney() {
    return Object.entries(this.#rankObj).reduce((acc, cur) => {
      const [key, value] = cur;
      return acc + this.#getPrizeMoneyOfTicket(key, value);
    }, 0);
  }

  calcRateOfReturn() {
    const payment = this.#getPayment();
    const prizeMoney = this.#getPrizeMoney();
    return Math.floor((prizeMoney / payment) * 100 - 100);
  }

  getResultTBodyData() {
    return Object.values(RANK)
      .filter((item) => item.KEY !== RANK.OUT.KEY)
      .map((item) => ({
        equalCount: item.EQUAL_COUNT_TEXT,
        prizeMoney: item.PRIZE_MONEY,
        winningTicketCount: `${this.#rankObj[item.KEY]}개`,
      }))
      .reverse();
  }
}
