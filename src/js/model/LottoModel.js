const LOTTO_SIZE = 6;

export default class LottoModel {
  #tickets;
  #winningNumbers;
  #isShow;

  constructor(quantity) {
    //init Data
    this.#tickets = Array.from(Array(quantity), (_, i) => new LottoTicket((i += 1)));
    this.#winningNumbers = new LottoWinningNumbers();
    this.#isShow = false;

    // update view
    // 2-(1) to be visible
    document.querySelector('.lotto-section').hidden = false;
    document.querySelector('.lotto-form').hidden = false;
    // 2-(2) 구매 수량을 노출된다
    document.querySelector('.lotto-section__label').textContent = `총 ${quantity}개를 구매하였습니다.`;
    // 2-(3) 구매 수량만큼 로또 티켓이 발급한다.
    const position = document.querySelector('.lotto-section-tickets');
    position.insertAdjacentHTML('afterBegin', this.ticketsHtml);
  }

  get ticketsHtml() {
    const getTemplate = (ticket) => `<span class="mx-1 text-4xl lotto-section-ticket" data-lotto-id-${ticket.id}> 🎟️ 
                      <span class="lotto-section-ticket__numbers">${ticket.ticketNumbers}</span>
                      </span></span>`;
    return this.#tickets.map((ticket) => getTemplate(ticket)).join('');
  }
}

class LottoTicket {
  #id;
  #ticketNumbers;
  #isAuto;

  constructor(i) {
    // debugger;
    this.#id = i || 0;
    this.#ticketNumbers = this.randomGenerator();
    this.#isAuto = true;
  }

  randomGenerator(numbers = new Set()) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
    return numbers.size === LOTTO_SIZE ? Array.from(numbers) : this.randomGenerator(numbers);
  }

  get id() {
    return this.#id;
  }

  get ticketNumbers() {
    return this.#ticketNumbers;
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
