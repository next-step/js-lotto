import { LOTTO_SIZE, LOTTO_PURCHASE_MAX_QUANTITY } from '../constants/unit.js';
import { ERR_MESSAGE } from '../constants/alertMessage.js';
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
  #isShowLottoNumber;

  constructor(quantity) {
    this.createLotto(quantity);
    this.showLottoTicket();
  }

  static validators = {
    isValidQuantity: (totalQuantity) => {
      if (totalQuantity > LOTTO_PURCHASE_MAX_QUANTITY) {
        return alert(ERR_MESSAGE.OVER_LIMIT_QUANTITY);
      }
      return true;
    },
  };

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

  showLottoTicketsNumbers() {
    this.#isShowLottoNumber = true;
    document.querySelector(`.${LOTTO_SECTION_TICKETS}`).classList.add('flex-col');
    document.querySelector(`.${LOTTO_SECTION_TICKETS}`).classList.remove('flex-wrap');
    document.querySelectorAll(`.${LOTTO_SECTION_TICKET__NUMBERS}`).forEach((el) => {
      el.hidden = false;
    });
  }

  hideLottoTicketsNumbers() {
    this.#isShowLottoNumber = false;
    document.querySelector(`.${LOTTO_SECTION_TICKETS}`).classList.remove('flex-col');
    document.querySelector(`.${LOTTO_SECTION_TICKETS}`).classList.add('flex-wrap');
    document.querySelectorAll(`.${LOTTO_SECTION_TICKET__NUMBERS}`).forEach((el) => {
      el.hidden = true;
    });
  }

  get ticketsHtml() {
    const getTemplate = (ticket) => `<span class="mx-1 text-4xl ${LOTTO_SECTION_TICKET}" data-lotto-id-${ticket.id}> 🎟️ 
                        <span class="lotto-section-ticket__numbers" hidden>${ticket.ticketNumbers}</span>
                      </span></span>`;
    return this.#tickets.map((ticket) => getTemplate(ticket)).join('');
  }

  get quantity() {
    return this.#quantity;
  }
}

class LottoTicket {
  #id;
  #ticketNumbers;
  #isAuto;
  #isShow;

  constructor(i) {
    this.#id = Date.now() + i || 0;
    this.#ticketNumbers = this.randomGenerator();
    this.#isAuto = true;
    this.#isShow = false;
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
