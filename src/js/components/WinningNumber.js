import { store } from '../store/state.js';
import { subject } from '../index.js';
import { LOTTO_COUNT } from '../utils/constant.js';
import { setWinningNumbers, toggleModal, calculatePrize } from '../store/actions.js';
import { getWinningNumbers } from '../utils/lotto.js';
import { checkWinningNumbers } from '../utils/validate.js';

export default class WinningNumber extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    subject.subscribe(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const inputNumbers = event.target.elements['lotto-number'];
    const winningNumbers = getWinningNumbers(inputNumbers);
    if (!checkWinningNumbers(winningNumbers)) return;
    setWinningNumbers(winningNumbers);
    calculatePrize();
    toggleModal(true);
  }

  setEvent() {
    this.shadow.addEventListener('submit', this.handleOnSubmit);
  }

  disconnectedCallback() {
    subject.unsubscribe(this);
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  getNumberInputs() {
    const numberInputs = new Array(LOTTO_COUNT)
      .fill(null)
      .map(
        () =>
          `<input type="number" name="lotto-number" class="winning-number mx-1 text-center" data-cy="winning-number" required />`,
      )
      .join('');

    return numberInputs;
  }

  init() {
    this.template.innerHTML = `
		<link rel="stylesheet" href="./src/css/WinningNumber.css" />
		<form class="mt-9" data-cy="winning-number-form">
			<label class="flex-auto d-inline-block mb-3"
				>지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
			<div class="d-flex">
				<div>
					<h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
					<div>${this.getNumberInputs()}</div>
				</div>
				<div class="bonus-number-container flex-grow">
					<h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
					<div class="d-flex justify-center">
						<input type="number" name="lotto-number" class="bonus-number text-center" data-cy="bonus-number" />
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
		</form>`;

    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  render() {
    const { ticketCount } = store.getState();
    if (ticketCount === 0) {
      this.shadow.innerHTML = '';
      return;
    }
    if (this.shadow.innerHTML === '') this.init();
  }
}

customElements.define('winning-number', WinningNumber);
