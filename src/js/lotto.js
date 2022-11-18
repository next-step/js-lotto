import {
  ALERT,
  DEFAULT_LOTTO_STATE,
  MAX_LOTTO_PRICE,
  MIN_LOTTO_PRICE,
} from '../constants.js';
import { checkRandom, makeRandomNumbers } from '../utils/index.js';

class Lotto {
  constructor({ $target }) {
    this.$target = $target;
    this.$resultWrapper = $target.querySelector('#purchased-result');
    this.$checkWrapper = $target.querySelector('#check-result');
    this.state = {
      ...DEFAULT_LOTTO_STATE,
    };

    this.initialize();
  }

  onConfirm() {
    const IS_OVERPRICE = this.state.moneyAmount > MAX_LOTTO_PRICE;
    const IS_CONFIRM =
      this.state.moneyAmount >= MIN_LOTTO_PRICE &&
      this.state.moneyAmount <= MAX_LOTTO_PRICE;
    const IS_ALERT = this.state.moneyAmount % MIN_LOTTO_PRICE !== 0;

    if (IS_OVERPRICE) {
      window.alert(ALERT.OVER_MAX_VALUE);
      this.setState({ ...this.state, moneyAmount: null });
      return;
    }

    if (IS_ALERT) {
      window.alert(ALERT.TYPE_THOUSAND_UNIT);
      this.setState({ ...this.state, moneyAmount: null });
      return;
    }

    if (IS_CONFIRM) {
      const RANDOM_NUMBERS = checkRandom(
        makeRandomNumbers(this.state.moneyAmount)
      );

      this.setState({
        ...this.state,
        lottoPurchaseNumber: this.state.moneyAmount / MIN_LOTTO_PRICE,
        randomNumbers: RANDOM_NUMBERS,
        isVisibleResult: true,
      });
    }
  }

  onEnter(event) {
    event.preventDefault();
    this.onConfirm();
  }

  onTypeAmount(value) {
    if (!Number.isInteger(Number(value))) return;
    this.setState({ ...this.state, moneyAmount: Number(value) });
  }

  onToggle() {
    this.setState({ ...this.state, isToggle: !this.state.isToggle });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  renderToggle() {
    this.$target
      .querySelectorAll('.lotto-number')
      .forEach(
        (element) =>
          (element.style.display = this.state.isToggle ? 'inline' : 'none')
      );
  }

  renderResult() {
    if (!this.state.isVisibleResult) {
      this.$resultWrapper.style.display = 'none';
      return;
    }

    this.$resultWrapper.querySelector(
      '[data-id=result-text]'
    ).innerText = `총 ${this.state.lottoPurchaseNumber}개를 구매하였습니다.`;

    this.$resultWrapper.querySelector(
      '[data-id=lotto-image-wrapper]'
    ).innerHTML = `
      ${this.state.randomNumbers
        .map((randomNumber) => {
          return `
            <li class="lotto-list">
              <span class="mx-1 text-4xl" data-id="lotto-image">🎟️</span>
              <span class="lotto-number" data-id="lotto-number">
                ${randomNumber.join(' ')}
              </span>
            </li>
        `;
        })
        .join('')}
    `;
    if (this.$resultWrapper.style.display !== 'block') {
      this.$resultWrapper.style.display = 'block';
    }
  }

  renderCheckResultForm() {
    if (!this.state.isVisibleResult) {
      this.$checkWrapper.style.display = 'none';
      return;
    }

    if (this.$checkWrapper.style.display !== 'block') {
      this.$checkWrapper.style.display = 'block';
    }
  }

  renderInput() {
    const IS_BLANK =
      this.state.moneyAmount === 0 || this.state.moneyAmount === null;

    if (IS_BLANK) {
      this.$target.querySelector('[data-id=lotto-number-input]').value = null;
      this.$target
        .querySelector('[data-id=lotto-submit-button]')
        .setAttribute('disabled', '');
    }

    if (!IS_BLANK) {
      this.$target.querySelector('[data-id=lotto-number-input]').value =
        this.state.moneyAmount;
      this.$target
        .querySelector('[data-id=lotto-submit-button]')
        .removeAttribute('disabled');
    }
  }

  render() {
    this.renderResult();
    this.renderCheckResultForm();
    this.renderToggle();
    this.renderInput();
  }

  addEventListener() {
    this.$target.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'lotto-submit-button') {
        this.onConfirm();
      }

      if (event.target.dataset.id === 'number-toggle-button') {
        this.onToggle();
      }
    });

    this.$target.addEventListener('input', (event) => {
      if (event.target.dataset.id === 'lotto-number-input') {
        this.onTypeAmount(event.target.value);
      }
    });

    this.$target.addEventListener('keydown', (event) => {
      if (
        event.target.dataset.id === 'lotto-number-input' &&
        event.key === 'Enter'
      ) {
        this.onEnter(event);
      }
    });
  }

  initialize() {
    this.render();
    this.addEventListener();
  }
}

export default Lotto;
