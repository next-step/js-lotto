import { $create } from '../utils/dom.js';

class PurchaseForm {
  constructor() {
    this.$input = $create('input');
    this.$button = $create('button');
  }

  render() {
    this.$input.type = 'number';
    this.$input.className = 'w-100 mr-2 pl-2';
    this.$input.placeholder = '구입 금액';

    this.$button.type = 'button';
    this.$button.className = 'btn btn-cyan';
    this.$button.textContent = '확인';

    return `
			<form class="mt-5">
				<label class="mb-2 d-inline-block">
					구입할 금액을 입력해주세요.
				</label>
				<div class="d-flex">
					${this.$input.outerHTML}
					${this.$button.outerHTML}
				</div>
			</form>
		`;
  }
}

export default PurchaseForm;
