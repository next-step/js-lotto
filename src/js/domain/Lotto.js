class Lotto {
  #numbers;

  #rank;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  get rank() {
    return this.#rank;
  }

  compare(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  hasBonus(bonus) {
    return this.#numbers.includes(bonus);
  }

  check(winningNumbers, bonus) {
    const correctCount = this.compare(winningNumbers);
    const hasBonus = this.hasBonus(bonus);
    const rank = this.#numbers.length - correctCount + 1;

    this.#rank = (rank === 2 && !hasBonus) || rank > 2 ? rank + 1 : rank;
  }
}

export default Lotto;
