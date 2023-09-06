import { OutputViewWeb, Element } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT, SELECTOR } from '../../constants';
import {
  TicketAmount,
  TicketsNumbers,
  WinningNumberInput,
  WinningPrize,
} from '../../components';
import { LottoEvents } from '../../Model';

export class ViewWeb {
  #element;
  #outputView;
  #validator;
  #lottoEvents = new LottoEvents();

  constructor() {
    this.#element = new Element();
    this.#outputView = OutputViewWeb;
    this.#validator = Validator.View;
  }

  bindEvent(events) {
    const { getTickets, readWinningNumbers, checkTicketsResult } = events;

    this.#lottoEvents.purchaseLotto(
      this.#element.get(SELECTOR.TICKET.FORM),
      getTickets
    );

    this.#lottoEvents.toggleTicketNumber(
      this.#element.get(SELECTOR.TICKET.PURCHASED)
    );

    this.#lottoEvents.submitWinningNumber(
      this.#element.get(SELECTOR.LOTTO.WINNING_NUMBER_FORM),
      readWinningNumbers
    );

    this.#lottoEvents.openResultModal(
      this.#element.get(SELECTOR.LOTTO.WINNING_NUMBER_FORM),
      checkTicketsResult
    );
  }

  /* Input */
  async readPurchaseAmount() {
    const purchaseAmount = this.#element.getValueByInt(
      SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT
    );

    if (isNaN(purchaseAmount)) throw new Error(MESSAGE.READ.PURCHASE_AMOUNT);

    return purchaseAmount;
  }

  async readWinningNumbers() {
    const lottoNumbers = await this.#readLottoNumbers();
    const bonusNumber = await this.#readBonusNumber(lottoNumbers);

    console.log(lottoNumbers, bonusNumber);
    return { lottoNumbers, bonusNumber };
  }

  async #readLottoNumbers() {
    const $lottoNumbers = document.querySelectorAll(
      SELECTOR.LOTTO.WINNING_NUMBER
    );
    const lottoNumbers = [...$lottoNumbers].map(({ value }) => value);

    this.#validator.readLottoNumbers(lottoNumbers);

    return lottoNumbers.map(Number);
  }

  async #readBonusNumber(lottoNumbers) {
    const $bonusNumber = document.querySelector(SELECTOR.LOTTO.BONUS_NUMBER);
    const bonusNumber = Number($bonusNumber.value);

    this.#validator.readBonusNumber(bonusNumber, lottoNumbers);

    return bonusNumber;
  }

  async readRestart() {
    const restartInput = await this.validateUserInput(
      MESSAGE.READ.RESTART,
      Validator.View.readRestart
    );

    return restartInput === RESTART_INPUT.YES;
  }

  /* Output */
  renderPurchasedTickets(tickets) {
    const amount = tickets.length;

    this.#outputView.render(SELECTOR.TICKET.AMOUNT, TicketAmount(amount));
    this.#outputView.render(SELECTOR.TICKET.TICKETS, TicketsNumbers(tickets));
  }

  renderReadWinningNumbers() {
    this.#outputView.render(
      SELECTOR.LOTTO.WINNING_NUMBER_FORM,
      WinningNumberInput
    );
  }

  renderTicketsResult(ticketResults) {
    this.#outputView.render(SELECTOR.MODAL.PORTAL, WinningPrize(ticketResults));
  }
}
