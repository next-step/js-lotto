import { LOTTO_NUMBER_SIZE, LOTTO_MAX_RANGE, LOTTO_PURCHASE_MAX_QUANTITY } from '../constants/unit.js';
import { ERR_MESSAGE } from '../constants/alertMessage.js';
import { PRIZE_TYPES } from '../constants/prize.js';
import {
  LOTTO_SECTION,
  LOTTO_SECTION__LABEL,
  LOTTO_SECTION_TICKETS,
  LOTTO_SECTION__TICKET,
  LOTTO_FORM,
} from '../constants/selectTarget.js';
import { $ } from '../util/dom.js';

export default class LottoModel {
  #tickets;
  #quantity;

  constructor(quantity) {
    this.createLotto(quantity);
    this.showLottoTicket();
  }

  static validators = {
    isValidQuantity: (totalQuantity) => {
      if (totalQuantity > LOTTO_PURCHASE_MAX_QUANTITY) throw new Error(ERR_MESSAGE.OVER_LIMIT_QUANTITY);
    },
    isDuplicatedWinningNumber: (inputNumbers) => {
      if (new Set(inputNumbers).size < LOTTO_NUMBER_SIZE) throw new Error(ERR_MESSAGE.DUPLICATED_NUMBERS);
    },
  };

  createLotto(quantity) {
    this.#quantity = quantity;
    this.#tickets = Array.from(Array(this.#quantity), (_, i) => new LottoTicket((i += 1)));
  }

  addLotto(quantity) {
    this.#quantity += quantity;
    const newTickets = Array.from(Array(quantity), (_, i) => new LottoTicket((i += 1)));
    this.#tickets = [...this.#tickets, ...newTickets];
    this.showLottoTicket();
  }

  showLottoTicket() {
    $(LOTTO_SECTION).hidden = false;
    $(LOTTO_FORM).hidden = false;
    $(LOTTO_SECTION__LABEL).textContent = `총 ${this.#quantity}개를 구매하였습니다.`;

    const ticketPosition = $(LOTTO_SECTION_TICKETS);
    if (ticketPosition.childNodes.length > 0) ticketPosition.replaceChildren();
    ticketPosition.insertAdjacentHTML('afterBegin', this.ticketsHtml);
  }

  toggleLottoTicketsNumbers() {
    $(LOTTO_SECTION_TICKETS).classList.toggle('hidden');
  }

  calculateWinningResult(input) {
    this.#tickets.forEach((ticket) => {
      ticket.checkTheWinningResult(input);
    });
  }

  get ticketsHtml() {
    const getTemplate = (ticket) => `<span class="mx-1 text-4xl ${LOTTO_SECTION__TICKET}" data-lotto-id=${ticket.id}> 🎟️ 
                        <span class="lotto-section__ticket__numbers">${ticket.ticketNumbers}</span>
                      </span></span>`;
    return this.#tickets.map(getTemplate).join('');
  }

  get quantity() {
    return this.#quantity;
  }

  get lottoBenefit() {
    return this.#tickets.reduce((acc, cur) => acc + (cur.lottoPrize || 0), 0);
  }

  getWinningQuantityByRank(rank) {
    return this.#tickets.filter((ticket) => ticket.lottoRank === rank).length;
  }
}

class LottoTicket {
  #id;
  #ticketNumbers;
  #matchedCount;
  #lottoRank;
  #lottoPrize;

  constructor(i) {
    this.#id = Date.now() + i || 0;
    this.#ticketNumbers = this.generateTicketNumbers();
    this.#matchedCount = 0;
  }

  checkTheWinningResult({ winningNumbers, bonusNumber }) {
    this.#matchedCount = 0;
    winningNumbers.forEach((winningNumber) => {
      if (this.#ticketNumbers.includes(Number(winningNumber))) {
        this.#matchedCount += 1;
      }
    });

    const isBonus = this.#matchedCount === 5 && this.#ticketNumbers.includes(Number(bonusNumber));
    this.#lottoRank = isBonus ? 'RANK-BONUS' : `RANK-${this.#matchedCount}`;
    this.#lottoPrize = Number(PRIZE_TYPES[this.#lottoRank]?.cost) || 0;
  }

  generateTicketNumbers() {
    const numbers = new Set();

    while (numbers.size < LOTTO_NUMBER_SIZE) {
      const random = Math.floor(Math.random() * LOTTO_MAX_RANGE) + 1;
      numbers.add(random);
    }

    return Array.from(numbers);
  }

  get id() {
    return this.#id;
  }

  get ticketNumbers() {
    return this.#ticketNumbers;
  }

  get lottoPrize() {
    return this.#lottoPrize;
  }
  get lottoRank() {
    return this.#lottoRank;
  }
}
