import { LOTTO_SIZE } from '../constants/unit.js';
import {
  LOTTO_SECTION,
  LOTTO_FORM,
  LOTTO_SECTION__LABEL,
  LOTTO_SECTION_TICKETS,
  LOTTO_SECTION_TICKET,
} from '../constants/selectTarget.js';

export default class LottoModel {
  #tickets;
  #quantity;
  #winningNumbers;

  constructor(quantity) {
    this.createLotto(quantity);
    this.showLottoTicket();
  }

  createLotto(quantity) {
    //init Data
    this.#quantity = quantity;
    this.#tickets = Array.from(Array(this.#quantity), (_, i) => new LottoTicket((i += 1)));
    this.#winningNumbers = new LottoWinningNumbers();
  }

  addLotto(quantity) {
    this.#quantity += quantity;
    const newTickets = Array.from(Array(quantity), (_, i) => new LottoTicket((i += 1)));
    this.#tickets = [...this.#tickets, ...newTickets];
    this.showLottoTicket();
  }

  showLottoTicket() {
    document.querySelector(`.${LOTTO_SECTION}`).hidden = false;
    document.querySelector(`.${LOTTO_FORM}`).hidden = false;
    document.querySelector(`.${LOTTO_SECTION__LABEL}`).textContent = `총 ${this.#quantity}개를 구매하였습니다.`;

    const ticketPosition = document.querySelector(`.${LOTTO_SECTION_TICKETS}`);
    if (ticketPosition.childNodes.length > 0) ticketPosition.replaceChildren();
    ticketPosition.insertAdjacentHTML('afterBegin', this.ticketsHtml);
  }

  get ticketsHtml() {
    const getTemplate = (ticket) => `<span class="mx-1 text-4xl ${LOTTO_SECTION_TICKET}" data-lotto-id-${ticket.id}> 🎟️ 
                        <span class="lotto-section-ticket__numbers" hidden>${ticket.ticketNumbers}</span>
                      </span></span>`;
    return this.#tickets.map((ticket) => getTemplate(ticket)).join('');
  }
}

class LottoTicket {
  #id;
  #ticketNumbers;
  #isAuto;

  constructor(i) {
    this.#id = Date.now() + i || 0;
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
