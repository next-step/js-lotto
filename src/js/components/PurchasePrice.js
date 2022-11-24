import { checkUnitOfPrice } from '../utils/validate.js';
import { setPurchasePrice, getTickets } from '../store/actions.js';

export default class PurchasePrice extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  onStateChange() {
    this.render();
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { value: inputValue } = this.shadow.querySelector('input');
    const purchasePrice = Number(inputValue);
    if (checkUnitOfPrice(purchasePrice)) {
      setPurchasePrice(purchasePrice);
      getTickets(purchasePrice);
    }
  }

  setEvent() {
    const $form = this.shadow.querySelector('form');
    $form.addEventListener('submit', this.handleOnSubmit.bind(this));
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.shadow.innerHTML = `
			<link rel="stylesheet" href="./src/css/index.css" />
			<form class="mt-5" data-cy="purchase-form">
			<label class="mb-2 d-inline-block"
				>구입할 금액을 입력해주세요.
			</label>
			<div class="d-flex">
				<input
					type="number"
					class="w-100 mr-2 pl-2"
					placeholder="구입 금액"
					data-cy="purchase-price-input"
				/>
				<button
					type="submit"
					class="btn btn-cyan"
					data-cy="purchase-price-button"
				>
					확인
				</button>
			</div>
			</form>
		`;
  }
}

customElements.define('purchase-price', PurchasePrice);
