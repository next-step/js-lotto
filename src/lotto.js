import { getReward, getRank } from "../src/getRank.js";

export default class Lotto {
  constructor(budget) {
    //로또 객체에서 있어야만 하는값 > 구매 금액, 로또 번호
    this.budget = budget;
    this.numbers = [];
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

  //UI로직
  showLottos(index) {
    console.log(this.numbers[index]);
  }
}

export const calculateLottoProfitRatio = (totalWinnings, totalSpent) => {
  return ((totalWinnings - totalSpent) / totalSpent) * 100;
};

export const calculateLottoTicketLimit = (budget) => {
  return Math.floor(budget / 1000)
}

export const buyLottos = (count, lotto) => {
  for(let i = 0 ; i <count ; i++){
    lotto.makeLotto()
  }
}

export const checkResult = (winningNumbers, lotto) => {
  const count = calculateLottoTicketLimit(lotto.budget)
  const result = [0,0,0,0,0,0];
  for(let i = 0; i < count; i++){
    const winningRank = getRank(winningNumbers, lotto.numbers[i])
    result[winningRank - 1] += 1
  }

  return result
}

export const computeTotalPrize = (winningArr) => {
  return winningArr.reduce((prev, current, index, arr) => prev + getReward(index + 1) * arr[index], 0)
}