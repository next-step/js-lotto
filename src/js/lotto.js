import { DEFAULT_LOTTO_STATE } from '../constant.js';
import { getRandomNumbers } from '../utils/index.js';

class Lotto {
  constructor($target) {
    this.$target = $target;
    this.state = {
      ...DEFAULT_LOTTO_STATE,
    };

    this.initialize();
  }

  onConfirm() {
    const CONFIRM_CONDITION =
      this.state.moneyAmount >= 1000 && this.state.moneyAmount <= 100000;
    const ALERT_CONDITION = this.state.moneyAmount % 1000 !== 0;

    if (ALERT_CONDITION) {
      window.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
      this.setState({ ...this.state, moneyAmount: 0 });
      return;
    }

    if (CONFIRM_CONDITION) {
      const RANDOM_NUMBERS = new Array(this.state.moneyAmount / 1000)
        .fill(0)
        .map(getRandomNumbers);

      this.setState({
        ...this.state,
        lottoPurchaseNumber: this.state.moneyAmount / 1000,
        randomNumbers: RANDOM_NUMBERS,
        isVisibleResult: true,
      });
    }
  }

  onTypeAmount(value) {
    if (!Number.isInteger(Number(value))) return;
    this.setState({ ...this.state, moneyAmount: Number(value) });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  renderResult() {
    const wrapper = document.querySelector('#purchased-result');

    if (!this.state.isVisibleResult) {
      wrapper.style.display = 'none';
      return;
    }

    wrapper.querySelector(
      '[data-id=result-text]'
    ).innerText = `총 ${this.state.lottoPurchaseNumber}개를 구매하였습니다.`;

    wrapper.querySelector('[data-id=lotto-image-wrapper]').innerHTML = `
      ${this.state.randomNumbers
        .map((randomNumber) => {
          return `
        <li>
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="lotto-number" display="none">
            ${randomNumber.join(' ')}
          </span>
        </li>
        `;
        })
        .join('')}
    `;
    wrapper.style.display = 'block';
  }

  renderCheckResultForm() {
    const wrapper = document.querySelector('#check-result');
    if (!this.state.isVisibleResult) {
      wrapper.style.display = 'none';
      return;
    }
    wrapper.style.display = 'block';
  }

  render() {
    this.renderResult();
    this.renderCheckResultForm();
  }

  addEventListener() {
    document.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'lotto-submit-button') {
        this.onConfirm();
      }
    });

    document.addEventListener('input', (event) => {
      if (event.target.dataset.id === 'lotto-number-input') {
        this.onTypeAmount(event.target.value);
      }
    });
  }

  initialize() {
    this.render();
    this.addEventListener();
  }
}

export default Lotto;
