import { InputViewWeb, OutputViewWeb } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT } from '../../constants';

export class ViewWeb {
  #inputView = InputViewWeb;
  #outputView = OutputViewWeb;
  #validator = Validator.View;

  async validateUserInput(message, validator) {
    try {
      const userInput = await this.#inputView.readUserInput(
        MESSAGE.PREFIX(message)
      );

      validator(userInput);
      return userInput;
    } catch (error) {
      this.#outputView.print(error.message);
      return this.validateUserInput(message, validator);
    }
  }

  /* Input */
  async readPurchaseAmount() {
    const userInput = await this.validateUserInput(
      MESSAGE.READ.PURCHASE_AMOUNT,
      this.#validator.readPurchaseAmount
    );

    return userInput;
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
  printPurchasedTickets(tickets) {
    const amount = tickets.length;
    this.#outputView.print(MESSAGE.PRINT.PURCHASED_AMOUNT(amount));

    for (const ticket of tickets) {
      const ticketNumbers = ticket.getTicketNumbers();

      this.#outputView.print(ticketNumbers);
    }
  }

  printTicketsResult(ticketResults) {
    const { prizes, profitRate } = ticketResults;

    this.#displayPrize(prizes);
    this.#outputView.print(MESSAGE.PRINT.PROFIT(profitRate));
  }

  #displayPrize(prizes) {
    this.#outputView.print(MESSAGE.PRINT.PRIZE(prizes));
  }

  /* Close Readline */
  close() {
    this.#inputView.close();
  }
}
