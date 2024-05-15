class Lotto {
  #numbers;

  /**
   * @param {string[]} numbers
   */
  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
