const LOTTO_PRICE = 1000;

export class Lotto {
  #lotteries = [];

  constructor(lotteryCount) {
    this.#lotteries = Array.from({length: lotteryCount}, this.#generateLottery);
  }

  get lotteries() {
    return this.#lotteries;
  }

  #generateLottery() {
    const lottery = [];

    while (lottery.length < 6) {
      const number = Math.floor(Math.random() * 45) + 1;

      if (!lottery.includes(number)) {
        lottery.push(number);
      }
    }

    return lottery.sort((a, b) => a - b);
  }
}
