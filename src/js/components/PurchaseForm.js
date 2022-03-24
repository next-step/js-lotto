import { DOM, ERROR_MESSAGE, LOTTO } from '../constants.js';
import { $ } from '../utils/dom.js';

class PurchaseForm {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.render();
    this.setEvent();
  }

  setState(nextState) {
    this.state = { ...nextState };
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return String.raw`
      <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
      <div class="d-flex">
        <input
          id="${DOM.PURCHASE_FORM_INPUT_ID}"
          type="number"
          class="w-100 mr-2 pl-2"
          placeholder="구입 금액"
        />
        <button type="submit" id="${DOM.PURCHASE_FORM_BUTTON_ID}" class="btn btn-cyan">확인</button>
      </div>
    `;
  }

  mounted() {
    $(`#${DOM.PURCHASE_FORM_INPUT_ID}`).focus();
  }

  setEvent() {
    this.$target.onsubmit = this.onSubmitPurchaseForm.bind(this);
  }

  onSubmitPurchaseForm(e) {
    e.preventDefault();
    const [$purchaseFormInput] = e.target;

    if (!this.checkInputValueAndAlert($purchaseFormInput.value)) {
      $purchaseFormInput.value = '';
      $purchaseFormInput.focus();
      return;
    }

    this.props.setLottoCountAndNumbers($purchaseFormInput.value / LOTTO.PRICE);
    this.props.renderSection();
  }

  checkInputValueAndAlert(value) {
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
