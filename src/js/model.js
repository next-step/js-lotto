import {
  ERROR_MESSAGE,
  LOTTO_LENGTH,
  LOTTO_MAX_NUMBER,
  LOTTO_PRICE,
  PRIZE,
  PRIZE_TITLE
} from './constants.js';
import {countSameNumbers} from "./utils.js";

export default class Model {
  constructor() {
    this.init();
  }

  init() {
    this.data = {
      amount: 0,
      totalPrize: 0,
      profit: 0,
      lottos: [],
    };
    this.initResult();
  }

  initResult() {
    this.data.result = {
      [PRIZE_TITLE.FIRST]: 0,
      [PRIZE_TITLE.SECOND]: 0,
      [PRIZE_TITLE.THIRD]: 0,
      [PRIZE_TITLE.FOURTH]: 0,
      [PRIZE_TITLE.FIFTH]: 0,
    };
    this.data.totalPrize = 0;
  }

  setAmount(money) {
    if (money % LOTTO_PRICE !== 0) throw Error(ERROR_MESSAGE.UNIT_PRICE);
    if (money < LOTTO_PRICE) throw Error(ERROR_MESSAGE.MIN_PRICE);
    this.data.amount = Math.floor(money / LOTTO_PRICE);
    return this.data.amount;
  }

  setLottos() {
    this.data.lottos = [...Array(this.data.amount)].map(x => this.createOneLotto());
  }

  createOneLotto() {
    return Array.from(Array(LOTTO_LENGTH)).map(x => Math.floor(Math.random() * LOTTO_MAX_NUMBER));
  }

  setResult(winningNumbers, bonusNumber) {
    this.data.lottos.forEach(lotto => {
      switch (countSameNumbers(lotto, winningNumbers)) {
        case 6:
          this.data.result[PRIZE_TITLE.FIRST]++;
          this.data.totalPrize += PRIZE.FIRST;
          break;
        case 5:
          if (lotto.includes(bonusNumber)) {
            this.data.result[PRIZE_TITLE.SECOND]++;
            this.data.totalPrize += PRIZE.SECOND;
            return;
          }
          this.data.result[PRIZE_TITLE.THIRD]++;
          this.data.totalPrize += PRIZE.THIRD;
          break;
        case 4:
          this.data.result[PRIZE_TITLE.FOURTH]++;
          this.data.totalPrize += PRIZE.FOURTH;
          break;
        case 3:
          this.data.result[PRIZE_TITLE.FIFTH]++;
          this.data.totalPrize += PRIZE.FIFTH;
          break;
      }
    });
  }

  setProfit() {
    this.data.profit =((this.data.totalPrize - (this.data.amount * LOTTO_PRICE)) / (this.data.amount * LOTTO_PRICE)) * 100;
  }

  setProfitMessage($profitMessage) {
    $profitMessage.innerText = `당신의 총 수익률은 ${this.data.profit}% 입니다.`;
  }
};