import ALERT_MESSAGE from './constants.js';

const [$lottoCountAndToggle, $winningNumbers] = document.querySelectorAll('.purchased-result');

const INIT_MY_LOTTO = [];

class Lotto {
  constructor({ $purchaseForm, $purchaseInput, $lottoCount, $lottoList }) {
    this.$purchaseForm = $purchaseForm;
    this.$purchaseInput = $purchaseInput;
    this.$lottoCount = $lottoCount;
    this.$lottoList = $lottoList;
    this.myLotto = [...INIT_MY_LOTTO];
  }

  initEvents() {
    this.$purchaseForm.addEventListener('submit', this.purchaseLotto.bind(this));
  }

  showPurchasedLotto() {
    $lottoCountAndToggle.classList.remove('not-purchased');
  }

  showWinningNumbersForm() {
    $winningNumbers.classList.remove('not-purchased');
  }

  showLottoCount() {
    const lottoCount = this.myLotto.length;
    this.$lottoCount.textContent = `총 ${lottoCount}개를 구매하였습니다.`;
  }

  renderLottoItems() {
    const lottoItemsTemplate = this.myLotto
      .map((element, index) => {
        return `
        <li class="lotto-item">
          <span class="mx-1 text-4xl">🎟️ </span>
        </li>`;
      })
      .join('');
    this.$lottoList.innerHTML = lottoItemsTemplate;
  }

  render() {
    this.showPurchasedLotto();
    this.showWinningNumbersForm();

    this.showLottoCount();

    this.renderLottoItems();
  }

  purchaseLotto(e) {
    e.preventDefault();
    const purchaseAmountInput = this.$purchaseInput.valueAsNumber;
    if (purchaseAmountInput % 1000 !== 0) {
      alert(ALERT_MESSAGE.NOT_ONE_THOUSAND_UNIT);
      return;
    }

    const lottoCount = purchaseAmountInput / 1000;
    this.myLotto = Array(lottoCount).fill([]);

    this.render();
  }
}

export default Lotto;
