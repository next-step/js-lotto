import { DOM, ERROR_MESSAGE, LOTTO } from '../constants.js';
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
        <button type="submit" id="${DOM.PURCHASE_FORM_BUTTON}" class="btn btn-cyan">확인</button>
      </div>
    `;
  }

  mounted() {
    $(`#${DOM.PURCHASE_FORM_INPUT}`).focus();
  }

  setEvent() {
    this.$target.onsubmit = this.onSubmitPurchaseForm.bind(this);
  }

  onSubmitPurchaseForm(e) {
    e.preventDefault();
    const $purchaseFormInput = e.target[0];

    if (!this.validateFormInput($purchaseFormInput.value)) {
      $purchaseFormInput.value = '';
      $purchaseFormInput.focus();
      return;
    }

    this.props.setLottoCountAndNumbers($purchaseFormInput.value / LOTTO.PRICE);
  }

  validateFormInput(value) {
    if (!value) {
      alert(ERROR_MESSAGE.REQUIRED_PRICE);
      return false;
    }

    if (value % LOTTO.PRICE !== 0) {
      alert(ERROR_MESSAGE.INVALID_PRICE);
      return false;
    }

    return true;
  }
}

export default PurchaseForm;
