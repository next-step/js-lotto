import { OutputViewWeb, Element } from './';
import { Validator } from '../../utils/Validator';
import { MESSAGE, RESTART_INPUT, SELECTOR } from '../../constants';
import {
  TicketAmount,
  TicketsNumbers,
  WinningNumberInput,
  WinningPrize,
  Modal,
} from '../../components';
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
    const { getTickets, checkTicketsResult, restartGame } = events;

    this.#lottoEvents.purchaseLotto(
      this.#element.get(SELECTOR.TICKET.FORM),
      getTickets
    );

    this.#lottoEvents.toggleTicketNumber(
      this.#element.get(SELECTOR.TICKET.PURCHASED)
    );

    this.#lottoEvents.openResultModal(
      this.#element.get(SELECTOR.LOTTO.WINNING_NUMBER_FORM),
      checkTicketsResult
    );

    this.#lottoEvents.closeResultModal(
      this.#element.get(SELECTOR.MODAL.PORTAL),
      () => {
        this.closeModal();
      }
    );

    this.#lottoEvents.restartGame(
      this.#element.get(SELECTOR.MODAL.PORTAL),
      restartGame
    );
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
    const $lottoNumbers = this.#element.getAll(SELECTOR.LOTTO.WINNING_NUMBER);
    const lottoNumbers = [...$lottoNumbers].map(({ value }) => value);

    this.#validator.readLottoNumbers(lottoNumbers);

    return lottoNumbers.map(Number);
  }

  async #readBonusNumber(lottoNumbers) {
    const $bonusNumber = this.#element.get(SELECTOR.LOTTO.BONUS_NUMBER);
    const bonusNumber = Number($bonusNumber.value);

    this.#validator.readBonusNumber(bonusNumber, lottoNumbers);

    return bonusNumber;
  }

  /* Output */
  renderPurchasedTickets(tickets) {
    const amount = tickets.length;

    this.#outputView.render(SELECTOR.TICKET.AMOUNT, TicketAmount(amount));
    this.#outputView.render(SELECTOR.TICKET.TICKETS, TicketsNumbers(tickets));
  }

  renderReadWinningNumbers() {
    this.#outputView.render(
      SELECTOR.LOTTO.WINNING_NUMBER_FORM,
      WinningNumberInput
    );
  }

  renderTicketsResult(ticketResults) {
    this.#outputView.render(
      SELECTOR.MODAL.PORTAL,
      Modal(WinningPrize(ticketResults))
    );
  }

  closeModal() {
    this.#outputView.clear(SELECTOR.MODAL.PORTAL);
  }

  resetView() {
    this.#resetInputValues();
    this.#removePurchasedTickets();
    this.#removeReadWinningNumbers();
  }

  #resetInputValues() {
    const $lottoNumbers = this.#element.getAll(SELECTOR.LOTTO.WINNING_NUMBER);
    const $bonusNumber = this.#element.get(SELECTOR.LOTTO.BONUS_NUMBER);
    const $purchaseAmount = this.#element.get(
      SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT
    );

    $lottoNumbers.forEach(($number) => ($number.value = ''));
    $bonusNumber.value = '';
    $purchaseAmount.value = '';
  }

  #removePurchasedTickets() {
    this.#outputView.clear(SELECTOR.TICKET.AMOUNT);
    this.#outputView.clear(SELECTOR.TICKET.TICKETS);
  }

  #removeReadWinningNumbers() {
    this.#outputView.clear(SELECTOR.LOTTO.WINNING_NUMBER_FORM);
  }
}
