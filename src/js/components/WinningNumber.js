import { getState } from '../store/state.js';
import { subject } from '../index.js';
import { LOTTO_COUNT } from '../utils/constant.js';
import { setWinningNumbers, showModal, calculatePrize } from '../store/actions.js';
import { getWinningNumbers } from '../utils/lotto.js';
import { checkWinningNumbers } from '../utils/validate.js';

export default class WinningNumber extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    subject.subscribe(this);
  }

  onStateChange() {
    const { winningNumbers } = getState();
    if (winningNumbers.length === 0) {
      this.render();
      this.setEvent();
    }
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const inputNumbers = this.shadow.querySelectorAll('input');
    const winningNumbers = getWinningNumbers(inputNumbers);
    if (checkWinningNumbers(winningNumbers)) {
      setWinningNumbers(winningNumbers);
      calculatePrize();
      showModal();
    }
  }

  setEvent() {
    const $form = this.shadow.querySelector('form[data-cy="winning-number-form"]');
    $form.addEventListener('submit', this.handleOnSubmit.bind(this));
  }

  disconnectedCallback() {
    subject.unsubscribe(this);
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    const { ticketCount } = getState();
    const numberInputs = new Array(LOTTO_COUNT)
      .fill(null)
      .map(
        () =>
          `<input type="number" class="winning-number mx-1 text-center" data-cy="winning-number" required />`,
      )
      .join('');

    this.shadow.innerHTML =
      ticketCount > 0
        ? `${style}
    		<form class="mt-9" data-cy="winning-number-form">
            <label class="flex-auto d-inline-block mb-3"
              >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
            >
            <div class="d-flex">
              <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
								${numberInputs}
                </div>
              </div>
              <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                  <input type="number" class="bonus-number text-center" data-cy="bonus-number" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="open-result-modal-button mt-5 btn btn-cyan w-100"
							data-cy="result-btn"
            >
              결과 확인하기
            </button>
          </form>
    	`
        : '<form class="mt-9" data-cy="winning-number-form"></form>';
  }
}

const style = `
<style>
	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.btn.btn-cyan:hover {
		background-color: #018c9e !important;
	}
  form {
    display: block;
  }
  .mt-9 {
    margin-top: 2.25rem;
  }
  .d-inline-block {
    display: inline-block;
  }
  html,
  body {
    margin: 0;
    height: 100%;
    font-size: 16px;
  }
  .d-flex {
    display: flex;
  }
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  .mt-5 {
    margin-top: 1.25rem;
  }
  .w-100 {
    width: 100%;
  }
  .btn-cyan {
    background-color: #00bcd4 !important;
    border-color: #00bcd4 !important;
  }
  .btn {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    border-radius: 4px;
    outline: 0;
    border-style: none;
    cursor: pointer;
  }
  .mt-0 {
    margin-top: 0px;
  }
  .font-bold {
    font-weight: 700;
  }
  .text-center {
    text-align: center;
  }
  .winning-number {
    width: 30px;
    height: 36px;
  }
  .mx-1 {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  .bonus-number {
    width: 30px;
    height: 36px;
  }
  .justify-center {
    justify-content: center;
  }
</style>

`;

customElements.define('winning-number', WinningNumber);
