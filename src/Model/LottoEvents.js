import { EventBinder } from './EventBinder';
import { SELECTOR } from '../constants';

export class LottoEvents {
  #eventBinder;

  constructor() {
    this.#eventBinder = new EventBinder();
  }

  purchaseLotto($purchaseButton, getTickets) {
    this.#eventBinder.onSubmit($purchaseButton, getTickets);
  }

  toggleTicketNumber($toggleButton) {
    this.#eventBinder.onChange($toggleButton, (event) => {
      const lottoNumbers = document.querySelectorAll(SELECTOR.LOTTO.NUMBERS);

      lottoNumbers.forEach(($element) => {
        const { checked } = event.target;

        if (checked) return ($element.style.display = 'block');

        return ($element.style.display = 'none');
      });
    });
  }

  submitWinningNumber($winningNumberForm, readWinningNumbers) {
    this.#eventBinder.onSubmit($winningNumberForm, readWinningNumbers);
  }

  openResultModal($winningLottoForm, checkTicketsResult) {
    this.#eventBinder.onSubmit($winningLottoForm, checkTicketsResult);
  }
}
