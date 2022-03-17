const LOTTO_SIZE = 6;

export default class LottoModel {
  #tickets;
  #winningNumbers;
  #isShow;

  constructor(quantity) {
    //init Data
    this.#tickets = Array(quantity).fill(new LottoTicket());
    this.#winningNumbers = new LottoWinningNumbers();
    this.#isShow = false;

    // update view
    // 2-(1) to be visible
    document.querySelector('.lotto-section').hidden = false;
    document.querySelector('.lotto-form').hidden = false;
    // 2-(2) 구매 수량을 노출된다
    document.querySelector(
      '.lotto-section__label'
    ).textContent = `총 ${quantity}개를 구매하였습니다.`;
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
