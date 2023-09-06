import { OutputViewWeb, InputViewWeb } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT, SELECTOR } from '../../constants';
import {
  TicketAmount,
  TicketsNumbers,
  WinningNumberInput,
  WinningPrize,
} from '../../components';

export class ViewWeb {
  #inputView;
  #outputView;
  #validator;

  constructor() {
    this.#inputView = new InputViewWeb();
    this.#outputView = OutputViewWeb;
    this.#validator = Validator.View;
  }

  getElement(selector) {
    return this.#inputView.getElement(selector);
  }

  /* Input */
  async readPurchaseAmount() {
    const purchaseAmount = this.#inputView.getElementValueByInt(
      SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT
    );

    if (isNaN(purchaseAmount)) throw new Error(MESSAGE.READ.PURCHASE_AMOUNT);

    return purchaseAmount;
  }

  async readWinningNumbers() {
    const lottoNumbers = await this.#readLottoNumbers();
    const bonusNumber = await this.#readBonusNumber(lottoNumbers);

    return { lottoNumbers, bonusNumber };
  }

  async #readLottoNumbers() {
    const lottoNumbersInput = await this.validateUserInput(
      MESSAGE.READ.LOTTO_NUMBERS,
      (input) => {
        const lottoNumbers = input.split(',').map(Number);
        this.#validator.readLottoNumbers(lottoNumbers);
      }
    );

    return lottoNumbersInput.split(',').map(Number);
  }

  async #readBonusNumber(lottoNumbers) {
    const bonusNumberInput = await this.validateUserInput(
      MESSAGE.READ.BONUS_NUMBER,
      (input) => this.#validator.readBonusNumber(input, lottoNumbers)
    );

    return Number(bonusNumberInput);
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

  renderTicketsResult(ticketResults) {
    const { prizes, profitRate } = ticketResults;

    this.#displayPrize(prizes);
    this.#outputView.print(MESSAGE.PRINT.PROFIT(profitRate));
  }

  #displayPrize(prizes) {
    this.#outputView.print(MESSAGE.PRINT.PRIZE(prizes));
  }
}
