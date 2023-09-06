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
  readPurchaseAmount() {
    const purchaseAmount = this.#inputView.getElementValueByInt(
      SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT
    );

    if (isNaN(purchaseAmount)) throw new Error(MESSAGE.READ.PURCHASE_AMOUNT);

    return purchaseAmount;
  }

  // readWinningNumbers() {
  //   const lottoNumbers = this.#readLottoNumbers();
  //   const bonusNumber = this.#readBonusNumber(lottoNumbers);

  //   return { lottoNumbers, bonusNumber };
  // }

  // #readLottoNumbers() {
  //   const lottoNumbers = Array.from(
  //     this.#inputView.getElement(SELECTOR.LOTTO.NUMBER_INPUT)
  //   ).map(Number);

  //   if (!this.#validator.readLottoNumbers(lottoNumbers)) {
  //     throw new Error(MESSAGE.READ.LOTTO_NUMBERS);
  //   }

  //   return lottoNumbers;
  // }

  // #readBonusNumber(lottoNumbers) {
  //   const bonusNumber = Number(
  //     this.#inputView.getElementValueByInt(SELECTOR.LOTTO.BONUS_NUMBER_INPUT)
  //   );

  //   if (!this.#validator.readBonusNumber(bonusNumber, lottoNumbers)) {
  //     throw new Error(MESSAGE.READ.BONUS_NUMBER);
  //   }

  //   return bonusNumber;
  // }

  // readRestart() {
  //   return new Promise((resolve) => {
  //     this.restartButton.addEventListener('click', () => {
  //       const restartConfirmed = confirm(MESSAGE.READ.RESTART);
  //       resolve(restartConfirmed === RESTART_INPUT.YES);
  //     });
  //   });
  // }

  /* Output */
  renderPurchasedTickets(tickets) {
    const amount = tickets.length;

    this.#outputView.render(SELECTOR.TICKET.AMOUNT, TicketAmount(amount));
    this.#outputView.render(SELECTOR.TICKET.TICKETS, TicketsNumbers(tickets));
  }

  renderWinningNumbers() {
    this.#outputView.render(
      SELECTOR.LOTTO.WINNING_NUMBER_INPUT,
      WinningNumberInput
    );
  }

  renderTicketsResult(ticketResults) {
    this.#outputView.openModal(WinningPrize(ticketResults));
  }
}
