import Component from "../lib/Component.js";
// import {LOTTO_NUMBERS} from "../Context.js";
import {$} from "../modules/utils.js";

export default class PurchaseForm extends Component {
  setup() {
    this.onSubmit = this.onSubmit.bind(this);
  }
  template() {
    const {money} = this.props;
    return `
      <form id="purchaseForm" class="mt-5" >
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input
            id="purchaseMoney"
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
            value="${money || ''}"
          />
          <button type="button" class="btn btn-cyan manual-purchase">수동구매</button>
          <button type="button" class="btn btn-cyan submit">자동구매</button>
        </div>
      </form>
    `;
  }
  mounted() {
    const {showManualModal} = this.props;
    this.$purchaseMoney = $('#purchaseMoney')
    $('#purchaseForm').addEventListener('submit', this.onSubmit);
    $('#purchaseForm .manual-purchase').addEventListener('click', () => showManualModal(this.$purchaseMoney.value));
    $('.submit').addEventListener('click', this.onSubmit)
  }
  onSubmit(eve) {
    eve.preventDefault();
    const {purchaseLotto} = this.props;
    const money = Number.parseInt(this.$purchaseMoney.value);

    purchaseLotto(money);
  }
}