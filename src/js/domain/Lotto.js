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

  hasBonus(bonus) {
    return this.#numbers.includes(bonus);
  }

  getRank(winningNumbers, bonus) {
    const correctCount = this.compare(winningNumbers);
    const hasBonus = this.hasBonus(bonus);
    const rank = this.#numbers.length - correctCount + 1;

    if ((rank === 2 && !hasBonus) || rank > 2) return rank + 1;
    return rank;
  }
}

export default Lotto;
