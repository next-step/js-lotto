import { DOM, ERROR_MESSAGE, LOTTO_PRICE } from '../constants.js';
import Component from '../core/Component.js';
import { $ } from '../utils/dom.js';

class PurchaseForm extends Component {
  template() {
    return String.raw`
      <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
      <div class="d-flex">
        <input
          id="${DOM.PURCHASE_FORM_INPUT}"
          type="number"
          class="w-100 mr-2 pl-2"
          placeholder="구입 금액"
        />
        <button type="button" id="${DOM.PURCHASE_FORM_BUTTON}" class="btn btn-cyan">확인</button>
      </div>
    `;
  }

  mounted() {
    $(`#${DOM.PURCHASE_FORM_INPUT}`).focus();
  }

  setEvent() {
    this.$target.onsubmit = this.onSubmitPurchaseForm.bind(this);
    $(`#${DOM.PURCHASE_FORM_BUTTON}`).onclick = this.onSubmitPurchaseForm.bind(this);
  }

  onSubmitPurchaseForm(e) {
    const $purchaseFormInput = $(`#${DOM.PURCHASE_FORM_INPUT}`);
    e.preventDefault();

    if (!this.validateFormInput($purchaseFormInput.value)) {
      $purchaseFormInput.value = '';
      $purchaseFormInput.focus();
      return;
    }

    this.props.setLottoCountAndNumbers($purchaseFormInput.value / LOTTO_PRICE);
  }

  validateFormInput(value) {
    if (!value) {
      alert(ERROR_MESSAGE.REQUIRED_PRICE);
      return false;
    }

    if (value % LOTTO_PRICE !== 0) {
      alert(ERROR_MESSAGE.INVALID_PRICE);
      return false;
    }

    return true;
  }
}

export default PurchaseForm;
