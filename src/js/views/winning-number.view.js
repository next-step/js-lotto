import View from './view.js';
import { ResultStatsView } from './result-stats.view.js';
import WinningNumberService from '../service/winning-number.service.js';

export default class WinningNumberView extends View {
  #lottoState;
  #winningNumberService;
  #winningInput = this.element.querySelectorAll('.winning-number');
  #bonusInput = this.element.querySelector('.bonus-number');
  #btnOpenDetail = this.element.querySelector('.btn-open-detail');
  #errorMessage = this.element.querySelector('.error-message');

  constructor(lottoState) {
    super('.winning-area');

    this.#lottoState = lottoState;
    this.#winningNumberService = new WinningNumberService(this.#lottoState);
    this.#setEvent();
    this.#reset();
  }

  #setEvent() {
    this.events = [
      {
        target: this.element,
        event: 'input',
        handler: this.#numbersOnly,
      },
      {
        target: this.#btnOpenDetail,
        event: 'click',
        handler: this.#openDetail,
      },
    ];

    super.setEventHandler();
  }

  #numbersOnly = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  #openDetail = () => {
    const winningNumber = {
      numbers: Array.from(this.#winningInput, el => el.value),
      bonus: this.#bonusInput.value,
    };

    if (!this.#validate(winningNumber)) {
      return;
    }

    this.#lottoState.winningNumber = winningNumber;
    const resultStats = new ResultStatsView(this.#lottoState, this.#winningNumberService);
  };

  #validate(winningNumber) {
    const isValid = this.#winningNumberService.isValidValue(winningNumber);

    if (!isValid) {
      this.#showErrorMessage();

      return false;
    }

    this.#hideErrorMessage();

    return true;
  }

  #showErrorMessage() {
    this.#errorMessage.classList.remove('hide');
  }

  #hideErrorMessage() {
    this.#errorMessage.classList.add('hide');
  }

  #reset = () => {
    this.#winningInput.forEach(el => Object.assign(el, { value: '' }));
    this.#bonusInput.value = '';
  };
}
