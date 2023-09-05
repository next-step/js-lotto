import { OutputViewWeb, InputViewWeb } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT, SELECTOR } from '../../constants';
import { TicketAmount, TicketsNumbers } from '../../components';

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
  readPurchaseAmount() {
    const purchaseAmount = this.#inputView.getElementValueByInt(
      SELECTOR.PURCHASE_AMOUNT_INPUT
    );

    if (isNaN(purchaseAmount)) throw new Error(MESSAGE.READ.PURCHASE_AMOUNT);

    return purchaseAmount;
  }

  readWinningNumbers() {
    const lottoNumbers = this.#readLottoNumbers();
    const bonusNumber = this.#readBonusNumber(lottoNumbers);

    return { lottoNumbers, bonusNumber };
  }

  #readLottoNumbers() {
    const lottoNumbers = Array.from(
      this.#inputView.getElement(SELECTOR.LOTTO_NUMBER_INPUT)
    ).map(Number);

    if (!this.#validator.readLottoNumbers(lottoNumbers)) {
      throw new Error(MESSAGE.READ.LOTTO_NUMBERS);
    }

    return lottoNumbers;
  }

  #readBonusNumber(lottoNumbers) {
    const bonusNumber = Number(
      this.#inputView.getElementValueByInt(SELECTOR.BONUS_NUMBER_INPUT)
    );

    if (!this.#validator.readBonusNumber(bonusNumber, lottoNumbers)) {
      throw new Error(MESSAGE.READ.BONUS_NUMBER);
    }

    return bonusNumber;
  }

  readRestart() {
    return new Promise((resolve) => {
      this.restartButton.addEventListener('click', () => {
        const restartConfirmed = confirm(MESSAGE.READ.RESTART);
        resolve(restartConfirmed === RESTART_INPUT.YES);
      });
    });
  }

  /* Output */
  renderPurchasedTickets(tickets) {
    const amount = tickets.length;

    this.#outputView.render(SELECTOR.TICKET_AMOUNT, TicketAmount(amount));
    this.#outputView.render(SELECTOR.TICKETS, TicketsNumbers(tickets));
  }

  renderWinningNumbers() {}

  // printTicketsResult(ticketResults) {
  //   const { prizes, profitRate } = ticketResults;

  //   this.#displayPrize(prizes);
  //   this.#outputView.print(MESSAGE.PRINT.PROFIT(profitRate));
  // }

  // #displayPrize(prizes) {
  //   this.#outputView.print(MESSAGE.PRINT.PRIZE(prizes));
  // }
}
