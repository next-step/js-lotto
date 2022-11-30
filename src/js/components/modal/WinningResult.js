import { store } from '../../store/state.js';
import { subject } from '../../index.js';
import { clearState, toggleModal } from '../../store/actions.js';
import { PRICE_STANDARD, FIVE_BONUS } from '../../utils/constant.js';

export default class WinningResult extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    subject.subscribe(this);
  }

  handleClose() {
    toggleModal(false);
  }

  handlerReset() {
    document
      .querySelector('purchase-price')
      .shadowRoot.querySelector('form[data-cy="purchase-form"]')
      .reset();
    document
      .querySelector('winning-number')
      .shadowRoot.querySelector('form[data-cy="winning-number-form"]')
      .reset();
    toggleModal(false);
    clearState();
  }

  setEvent() {
    const $close = this.shadow.querySelector('.modal-close');
    $close.addEventListener('click', this.handleClose);

    const $resetBtn = this.shadow.querySelector('button[data-cy="reset-button"]');
    $resetBtn.addEventListener('click', this.handlerReset);
  }

  disconnectedCallback() {
    subject.unsubscribe(this);
  }

  connectedCallback() {
    this.render();
  }

  init() {
    this.template.innerHTML = `
			<link rel="stylesheet" href="./src/css/WinningResult.css" />
			<div class="modal" data-cy="result-modal">
				<div class="modal-inner p-10">
					<div class="modal-close">
						<svg viewbox="0 0 40 40">
							<path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
						</svg>
					</div>
					<h2 class="text-center">🏆 당첨 통계 🏆</h2>
					<div class="d-flex justify-center">
						<table class="result-table border-collapse border border-black">
							<thead>
								<tr class="text-center">
									<th class="p-3">일치 갯수</th>
									<th class="p-3">당첨금</th>
									<th class="p-3">당첨 갯수</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<p class="text-center font-bold">
						당신의 총 수익률은 <span data-cy="profit-rate"></span>%입니다.
					</p>
					<div class="d-flex justify-center mt-5">
						<button type="button" class="btn btn-cyan" data-cy="reset-button">
							다시 시작하기
						</button>
					</div>
				</div>
			</div>`;

    this.shadow.appendChild(this.template.content.cloneNode(true));
    this.setEvent();
  }

  getResultElement() {
    const { winningScore } = store.getState();
    return Object.entries(PRICE_STANDARD)
      .sort((a, b) => a[1] - b[1])
      .map(standard => {
        return `<tr class="text-center">
				<td class="p-3">${standard[0] === FIVE_BONUS ? '5개 + 보너스볼' : `${standard[0]}개`}</td>
				<td class="p-3">${standard[1].toLocaleString('ko-KR')}</td>
				<td class="p-3" data-cy='winning-count'>${winningScore[standard[0]]}개</td>
			</tr>`;
      })
      .join('');
  }

  render() {
    const { isModalShown, profit } = store.getState();
    if (this.shadow.innerHTML === '') this.init();
    const $modal = this.shadow.querySelector('.modal');

    if (!isModalShown) {
      $modal.classList.remove('open');
      return;
    }

    const $tbody = this.shadow.querySelector('table tbody');
    $tbody.innerHTML = this.getResultElement();
    const $profit = this.shadow.querySelector('span[data-cy="profit-rate"]');
    $profit.innerHTML = profit;
    $modal.classList.add('open');
  }
}

customElements.define('winning-result', WinningResult);
