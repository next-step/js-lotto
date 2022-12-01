import { isValidatePrice } from '../utils/validate.js';
import { setPurchasePrice, getTickets } from '../store/actions.js';

export default class PurchasePrice extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement('template');
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { value: inputValue } = event.target.elements['purchase-price'];
    const purchasePrice = Number(inputValue);
    if (!isValidatePrice(purchasePrice)) return;
    setPurchasePrice(purchasePrice);
    getTickets(purchasePrice);
  }

  setEvent() {
    const $form = this.shadow.querySelector('form[data-cy="purchase-form"]');
    $form.addEventListener('submit', this.handleOnSubmit);
  }

  init() {
    this.template.innerHTML = `
		<link rel="stylesheet" href="./src/css/index.css" />
		<form class="mt-5" data-cy="purchase-form">
			<label class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
			<div class="d-flex">
				<input
					type="number"
					class="w-100 mr-2 pl-2"
					placeholder="구입 금액"
					data-cy="purchase-price-input"
					name="purchase-price"
				/>
				<button type="submit" class="btn btn-cyan" data-cy="purchase-price-button">확인</button>
			</div>
		</form>`;

    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this.init();
    this.setEvent();
  }
}

customElements.define('purchase-price', PurchasePrice);
