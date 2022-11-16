import Component from '../core/Component.js';
import { checkUnitOfPrice } from '../utils/validate.js';

export default class PurchasePrice extends Component {
  constructor($target, state, issueTicket) {
    super($target, state);
    this.issueTicket = issueTicket;
  }

  setEvent() {
    const handlerOnSubmit = event => {
      event.preventDefault();
      const purchasePrice = this.$target.querySelector(
        'input[data-cy="purchase-price-input"]',
      ).value;
      if (this.validatePrice(purchasePrice)) {
        this.issueTicket(purchasePrice);
      }
    };

    this.$target.addEventListener('submit', handlerOnSubmit);
  }

  validatePrice(price) {
    let flag = false;
    try {
      flag = checkUnitOfPrice(price);
    } catch (error) {
      alert(error.message);
    }
    return flag;
  }

  template() {
    this.templateHTML = `
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

  render() {
    this.template();
    this.$target.innerHTML = `${this.$target.innerHTML}${this.templateHTML}`;
  }
}
