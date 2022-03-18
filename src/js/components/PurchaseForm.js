import { DOM, MESSAGE } from '../constants.js';
import Component from '../core/Component.js';
import { $ } from '../utils/dom.js';

class PurchaseForm extends Component {
  template() {
    return `
			<label class="mb-2 d-inline-block">
				구입할 금액을 입력해주세요.
			</label>
			<div class="d-flex">
				<input
					id="${DOM.purchaseFormInput}"
					type="number"
					class="w-100 mr-2 pl-2"
					placeholder="구입 금액"
				/>
				<button
					type="button"
					id="${DOM.purchaseFormButton}"
					class="btn btn-cyan"
				>
					확인
				</button>
			</div>
		`;
  }

  mounted() {
    $(`#${DOM.purchaseFormInput}`).focus();
  }

  setEvent() {
    this.$target.addEventListener('submit', e => e.preventDefault());
    $(`#${DOM.purchaseFormButton}`).addEventListener(
      'click',
      this.onClickPurchaseFormButton.bind(this),
    );
  }

  onClickPurchaseFormButton() {
    const $purchaseFormInput = $(`#${DOM.purchaseFormInput}`);

    if ($purchaseFormInput.value % 1000 !== 0) {
      alert(MESSAGE.pleaseEnterlottoPurchasePriceInUnitsOf1000);
      $purchaseFormInput.value = '';
      $purchaseFormInput.focus();
      return;
    }

    this.props.setLottoCountAndNumbers($purchaseFormInput.value / 1000);
  }
}

export default PurchaseForm;
