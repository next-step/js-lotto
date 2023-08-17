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

  /* Input */
  async readPurchaseAmount() {
    const userInput = await this.#inputView.readUserInput(
      MESSAGE.PREFIX(MESSAGE.READ.PURCHASE_AMOUNT)
    );
    this.#validator.readPurchaseAmount(userInput);

    return userInput;
  }

  async readWinningNumbers() {
    const lottoNumbers = await this.#readLottoNumbers();
    const bonusNumber = await this.#readBonusNumber(lottoNumbers);

    return { lottoNumbers, bonusNumber };
  }

  async #readLottoNumbers() {
    const lottoNumbersInput = await this.#inputView.readUserInput(
      MESSAGE.PREFIX(MESSAGE.READ.LOTTO_NUMBERS)
    );
    const lottoNumbers = lottoNumbersInput.split(',').map(Number);
    this.#validator.readLottoNumbers(lottoNumbers);

    return lottoNumbers;
  }

  async #readBonusNumber(lottoNumbers) {
    const bonusNumberInput = await this.#inputView.readUserInput(
      MESSAGE.PREFIX(MESSAGE.READ.BONUS_NUMBER)
    );
    this.#validator.readBonusNumber(bonusNumberInput, lottoNumbers);

    return Number(bonusNumberInput);
  }

  /* Output */
  printPurchasedTickets(tickets) {
    const amount = tickets.length;
    this.#outputView.print(MESSAGE.PRINT.PURCHASED_AMOUNT(amount));

    for (let ticket of tickets) {
      const ticketNumbers = ticket.getTicketNumbers();

      this.#outputView.print(ticketNumbers);
    }
  }

  printTicketsResult(ticketResults) {
    this.#outputView.print(ticketResults);
  }
}
