import { InputView } from '.';
import { Validator } from '../utils/Validator';
import { MESSAGE } from '../constants';
import { OutputView } from './OutputView';

export class View {
  #inputView = InputView;
  #outputView = OutputView;
  #validator = Validator.View;

  constructor() {
    this.#inputView = InputView;
  }

  async readPurchaseAmount() {
    const userInput = await this.#inputView.readUserInput(
      MESSAGE.PREFIX(MESSAGE.READ.PURCHASE_AMOUNT)
    );
    this.#validator.readPurchaseAmount(userInput);

    return userInput;
  }

  printPurchasedTickets(tickets) {
    const amount = tickets.length;
    this.#outputView.print(MESSAGE.PRINT.PURCHASED_AMOUNT(amount));

    for (let ticket of tickets) {
      const ticketNumbers = ticket.getTicketNumbers();

      this.#outputView.print(ticketNumbers);
    }
  }
}
