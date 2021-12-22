import Component from "../lib/Component.js";
// import {LOTTO_NUMBERS} from "../Context.js";
import {$, getLottoNumbers} from "../modules/utils.js";

export default class PurchaseForm extends Component {
  setup() {
    this.onSubmit = this.onSubmit.bind(this);
  }
  template() {
    return `
      <form id="purchaseForm" class="mt-5" >
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input
            id="purchaseMoney"
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
          />
          <button type="button" class="btn btn-cyan">확인</button>
        </div>
      </form>
    `;
  }
  mounted() {
    this.$purchaseMoney = $('#purchaseMoney')

    $('#purchaseForm').addEventListener('submit', this.onSubmit);
    $('.btn-cyan').addEventListener('click', this.onSubmit)
  }
  onSubmit(eve) {
    eve.preventDefault();
    const {lottoChangeHandler} = this.props;
    const money = this.$purchaseMoney.value;
    if(money < 1000) {
      alert('로또 구매에는 최소 1,000원 이상이 필요합니다');
      this.$purchaseMoney.value = '';
      lottoChangeHandler([]);
      return;
    }
    if(money > 100000) {
      alert('한 번에 10만원어치 이상은 구매할 수 없습니다');
      this.$purchaseMoney.value = '';
      lottoChangeHandler([]);
      return;
    }

    const lottoNumbers = [];
    const purchaseCount = Math.floor(money / 1000)
    for (let i = 0; i < purchaseCount; i++) {
      lottoNumbers[i] = getLottoNumbers();
    }
    lottoChangeHandler(lottoNumbers);
  }
}