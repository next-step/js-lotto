class LottoNumberGenerator {
  #MIN = 1;
  #MAX = 45;
  constructor() {
    this.selectableNumbers = [];
    this.#init();
  }

  #init() {
    this.generateNumbers(this.#MIN, this.#MAX);
  }

  #shuffleNumbers(numbers) {
    for (let i = numbers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  }

  generateNumbers(min, max) {
    const numbers = Array.from({ length: max }, (_, i) => i + 1);
    this.#shuffleNumbers(numbers);
    this.selectableNumbers = numbers;
  }

  getNumber() {
    return this.selectableNumbers.pop();
  }
}

export default LottoNumberGenerator;
