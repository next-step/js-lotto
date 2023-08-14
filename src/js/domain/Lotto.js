class Lotto {
  #numbers;

  #hasBonus;

  #matchCount;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  get hasBonus() {
    return this.#hasBonus;
  }

  get matchCount() {
    return this.#matchCount;
  }

  #compare(winningNumbers) {
    this.#matchCount = this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  #checkBonus(bonus) {
    this.#hasBonus = this.#numbers.includes(bonus);
  }

  check(winningNumbers, bonus) {
    this.#compare(winningNumbers);
    this.#checkBonus(bonus);
  }
}

export default Lotto;
