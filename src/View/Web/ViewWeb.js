import { OutputViewWeb, InputViewWeb } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT, ELEMENT } from '../../constants';
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

  /* Input */
  readPurchaseAmount() {
    return this.#inputView.readPurchaseAmount();
  }

  readWinningNumbers() {
    return this.#inputView.readWinningNumbers();
  }

  #readLottoNumbers() {
    return this.#inputView.readLottoNumbers();
  }

  // async #readBonusNumber(lottoNumbers) {
  //   const bonusNumberInput = await this.validateUserInput(
  //     MESSAGE.READ.BONUS_NUMBER,
  //     (input) => this.#validator.readBonusNumber(input, lottoNumbers)
  //   );

  //   return Number(bonusNumberInput);
  // }

  // async readRestart() {
  //   const restartInput = await this.validateUserInput(
  //     MESSAGE.READ.RESTART,
  //     Validator.View.readRestart
  //   );

  //   return restartInput === RESTART_INPUT.YES;
  // }

  /* Output */
  renderPurchasedTickets(tickets) {
    const amount = tickets.length;

    this.#outputView.render(ELEMENT.TICKET_AMOUNT, TicketAmount(amount));
    this.#outputView.render(ELEMENT.TICKETS, TicketsNumbers(tickets));
  }

  // printTicketsResult(ticketResults) {
  //   const { prizes, profitRate } = ticketResults;

  //   this.#displayPrize(prizes);
  //   this.#outputView.print(MESSAGE.PRINT.PROFIT(profitRate));
  // }

  // #displayPrize(prizes) {
  //   this.#outputView.print(MESSAGE.PRINT.PRIZE(prizes));
  // }
}
