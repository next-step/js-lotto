import { InputView, OutputView } from '.';
import { Validator } from '../utils/Validator';
import {
  MESSAGE,
  NUMBER,
  LOTTO_PRIZE_BOARD,
  LOTTO_INITIAL_PRIZE_COUNT,
} from '../constants';

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
    const prizeCount = this.#calculatePrizeCount(ticketResults);
    const totalPrize = this.#calculateTotalPrize(ticketResults);
    const profitRate = this.#calculateProfitRate(
      totalPrize,
      ticketResults.length
    );

    this.#displayPrize(prizeCount);
    this.#outputView.print(MESSAGE.PRINT.PROFIT(profitRate));
  }

  // PrizeCount
  #calculatePrizeCount(ticketResults) {
    const prizeCount = LOTTO_INITIAL_PRIZE_COUNT;

    ticketResults.forEach((result) =>
      this.#updatePrizeCount(prizeCount, result)
    );

    return prizeCount;
  }

  #updatePrizeCount(prizeCount, result) {
    if (result.matchingCount === NUMBER.LOTTO_PRIZE.BONUS_MATCH_THRESHOLD)
      return this.#checkBonusMatch(prizeCount, result);

    return prizeCount[result.matchingCount]++;
  }

  #checkBonusMatch(prizeCount, result) {
    const bonusMatchThreshold = NUMBER.LOTTO_PRIZE.BONUS_MATCH_THRESHOLD;

    if (result.prize === LOTTO_PRIZE_BOARD[bonusMatchThreshold].withBonus)
      return prizeCount[bonusMatchThreshold].withBonus++;

    return prizeCount[bonusMatchThreshold].withoutBonus++;
  }

  // TotalPrize
  #calculateTotalPrize(ticketResults) {
    return ticketResults.reduce(
      (acc, result) => acc + result.prize,
      NUMBER.INITIAL_TOTAL_RPIZE
    );
  }

  // PrifitRate
  #calculateProfitRate(totalPrize, ticketAmount) {
    return (totalPrize / (ticketAmount * NUMBER.DEFAULT_TICKET_PRICE)) * 100;
  }

  #displayPrize(prizeCount) {
    this.#outputView.print(MESSAGE.PRINT.PRIZE(prizeCount));
  }
}
