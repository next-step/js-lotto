import { getRank } from "../src/getRank.js";

export default class Lotto {
  constructor(paymentAmount) {
    this.paymentAmount = paymentAmount;
    this.count = Math.floor(paymentAmount / 1000);
    this.numbers = [];
    this.amount = 0;
  }

  //도메인 로직
  makeNumbers() {
    const LOTTO_NUMBER_COUNT = 6;
    let numbers = [];
    for (let i = 0; i < LOTTO_NUMBER_COUNT; i++) {
      numbers.push(Math.floor(Math.random() * 99) + 1);
    }
    return numbers;
  }

  makeLotto() {
    this.numbers.push(this.makeNumbers());
  }

  makeLottoByPayment() {
    for (let i = 0; i < this.count; i++) {
      this.makeLotto();
    }
  }

  addAmountFromWinningPrize(prize, count) {
    this.amount += prize * count;
  }

  //UI로직
  showLottos(index) {
    console.log(this.numbers[index]);
  }
}

export const getProfitRate = (amount, paymentAmount) => {
  return Math.round((amount / paymentAmount) * 1000) / 1000;
};

export const getLottoCountByRank = (rank, lottos, userInput, bonusNumber) => {
  let count = 0;
  lottos.forEach((lotto) => {
    if (getRank(userInput, bonusNumber, lotto) === rank) count += 1;
  });

  return count;
};
