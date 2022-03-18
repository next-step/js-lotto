import { LOTTO_SIZE } from '../constants/unit.js';
import {
  LOTTO_SECTION,
  LOTTO_FORM,
  LOTTO_SECTION__LABEL,
  LOTTO_SECTION_TICKETS,
  LOTTO_SECTION_TICKET,
  LOTTO_SECTION_TICKET__NUMBERS,
} from '../constants/selectTarget.js';

export default class LottoModel {
  #tickets;
  #quantity;
  #winningNumbers;
  #isShow;

  constructor(quantity) {
    //init Data
    this.#quantity = quantity;
    this.#tickets = Array.from(Array(this.#quantity), (_, i) => new LottoTicket((i += 1)));
    this.#winningNumbers = new LottoWinningNumbers();
    this.#isShow = false;

    // update view
    this.showLottoTicket();
  }

  showLottoTicket() {
    document.querySelector(`.${LOTTO_SECTION}`).hidden = false;
    document.querySelector(`.${LOTTO_FORM}`).hidden = false;
    document.querySelector(`.${LOTTO_SECTION__LABEL}`).textContent = `총 ${this.#quantity}개를 구매하였습니다.`;
    const position = document.querySelector(`.${LOTTO_SECTION_TICKETS}`);
    position.insertAdjacentHTML('afterBegin', this.ticketsHtml);
  }

  get ticketsHtml() {
    const getTemplate = (ticket) => `<span class="mx-1 text-4xl ${LOTTO_SECTION_TICKET}" data-lotto-id-${ticket.id} hidden> 🎟️ 
                        <span class="${LOTTO_SECTION_TICKET__NUMBERS}">${ticket.ticketNumbers}</span>
                      </span></span>`;
    return this.#tickets.map((ticket) => getTemplate(ticket)).join('');
  }
}

class LottoTicket {
  #id;
  #ticketNumbers;
  #isAuto;

  constructor(i) {
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
