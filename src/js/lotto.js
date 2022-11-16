import $ from './util.js';
import ALERT_MESSAGE from './constants.js';

const INIT_PURCHASE_AMOUNT = 0;
class Lotto {
  constructor({ $purchaseForm, $purchaseInput, $lottoCount, $myLotto }) {
    this.$purchaseForm = $purchaseForm;
    this.$purchaseInput = $purchaseInput;
    this.$lottoCount = $lottoCount;
    this.$myLotto = $myLotto;
    this.purchaseAmount = INIT_PURCHASE_AMOUNT;
  }

  initEvents() {
    this.$purchaseForm.addEventListener('submit', this.purchaseLotto.bind(this));
  }

  purchaseLotto(e) {
    e.preventDefault();
    const purchaseAmountInput = this.$purchaseInput.valueAsNumber;
    if (purchaseAmountInput % 1000 !== 0) {
      alert(ALERT_MESSAGE.NOT_ONE_THOUSAND_UNIT);
      return;
    }
    this.purchaseAmount = purchaseAmountInput;
    this.$purchaseInput.value = '';
  }
}

export default Lotto;
