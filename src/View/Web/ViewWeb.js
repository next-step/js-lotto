import { OutputViewWeb, InputViewWeb } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT } from '../../constants';
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

  // 아래부터 수정해야함
  // async readWinningNumbers() {
  //   const lottoNumbers = await this.#readLottoNumbers();
  //   const bonusNumber = await this.#readBonusNumber(lottoNumbers);

  //   return { lottoNumbers, bonusNumber };
  // }

  // async #readLottoNumbers() {
  //   const lottoNumbersInput = await this.validateUserInput(
  //     MESSAGE.READ.LOTTO_NUMBERS,
  //     (input) => {
  //       const lottoNumbers = input.split(',').map(Number);
  //       this.#validator.readLottoNumbers(lottoNumbers);
  //     }
  //   );

  //   return lottoNumbersInput.split(',').map(Number);
  // }

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
    const $ticketAmount = document.querySelector('#ticket-amount');
    this.#outputView.render($ticketAmount, TicketAmount(amount));

    const ticketComponents = TicketsNumbers(tickets);

    const $ticketIcons = document.querySelector('#ticket-icons');
    this.#outputView.render($ticketIcons, ticketComponents);
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
