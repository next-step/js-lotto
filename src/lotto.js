import { getReward } from "../src/getRank.js";

export default class Lotto {
  constructor(paymentAmount) {
    this.paymentAmount = paymentAmount;
    this.count = Math.floor(paymentAmount / 1000);
    this.numbers = [];
    this.result = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    this.prizeAmount = 0;
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

  saveLottoResults(rank) {
    this.result[rank] += 1;
  }

  computeTotalPrize() {
    for (let i = 1; i < 6; i++) {
      this.prizeAmount += getReward(i) * this.result[i];
    }
  }

  //UI로직
  showLottos(index) {
    console.log(this.numbers[index]);
  }
}

export const calculateLottoProfitRatio = (totalWinnings, totalSpent) => {
  return ((totalWinnings - totalSpent) / totalSpent) * 100;
};
