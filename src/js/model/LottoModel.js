const LOTTO_SIZE = 6;

export default class LottoModel {
  #tickets;
  #winningNumbers;
  #isShow;

  constructor(quantity) {
    this.#tickets = Array(quantity).fill(new LottoTicket());
    this.#winningNumbers = new LottoWinningNumbers();
    this.#isShow = false;
  }
}

class LottoTicket {
  #ticketId;
  #ticketNumbers;
  #isAuto;

  constructor() {
    this.#ticketId = new Date() * 1;
    this.#ticketNumbers = this.randomGenerator();
    this.#isAuto = true;
  }

  randomGenerator(numbers = new Set()) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
    return numbers.size === LOTTO_SIZE
      ? Array.from(numbers)
      : this.randomGenerator(numbers);
  }
}

class LottoWinningNumbers {
  #winningNumbers;
  #bonusNumber;

  constructor() {
    this.#winningNumbers = Array(LOTTO_SIZE).fill('');
    this.#bonusNumber = '';
  }
}
