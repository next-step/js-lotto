class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  compare(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }
}

export default Lotto;
