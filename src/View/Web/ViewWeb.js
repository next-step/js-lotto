import { OutputViewWeb, Element } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT, SELECTOR } from '../../constants';
import { TicketAmount, TicketsNumbers } from '../../components';
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
    const { getTickets } = events;

    const purchaseButton = this.#element.get(SELECTOR.TICKET.FORM);
    this.#lottoEvents.purchaseLotto(purchaseButton, () => {
      getTickets();
    });

    const ticketSection = this.#element.get(SELECTOR.TICKET.PURCHASED);
    this.#lottoEvents.toggleTicketNumber(ticketSection);
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
