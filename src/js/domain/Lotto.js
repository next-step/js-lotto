class Lotto {
  #price = 1000;
  #numbers = [];

  constructor() {
    this.generateRandomNumbers();
  }

  get price() {
    return this.#price;
  }

  get numbers() {
    return this.#numbers;
  }

  generateRandomNumbers() {
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      this.#numbers.push(randomNumber);
    }
  }
}

export default Lotto;
