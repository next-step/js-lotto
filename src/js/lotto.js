import { $$ } from './util.js';
import {
  ALERT_MESSAGE,
  PURCHASE_AMOUNT_UNIT,
  MAX_IN_NUMBER,
  MIN_IN_NUMBER,
  LOTTO_NUMBERS_COUNT,
} from './constants.js';

const [$lottoCountAndToggle, $winningNumbers] = $$('.purchased-result');

const INIT_MY_LOTTO = [];

class Lotto {
  constructor({ $purchaseForm, $purchaseInput, $lottoCount, $lottoList, $lottoNumbersToggle }) {
    this.$purchaseForm = $purchaseForm;
    this.$purchaseInput = $purchaseInput;
    this.$lottoCount = $lottoCount;
    this.$lottoList = $lottoList;
    this.$lottoNumbersToggle = $lottoNumbersToggle;
    this.myLotto = [...INIT_MY_LOTTO];
  }

  initEvents() {
    this.$purchaseForm.addEventListener('submit', this.purchaseLotto.bind(this));
    this.$lottoNumbersToggle.addEventListener('click', this.renderLottoItems.bind(this));
  }

  setMyLotto() {
    const generateRandomNumber = () => {
      return Math.floor(Math.random() * (MAX_IN_NUMBER - MIN_IN_NUMBER + 1)) + MIN_IN_NUMBER;
    };
    const generatePurchasedLottoToArray = () => {
      const purchasedLottoToSet = new Set();
      while (purchasedLottoToSet.size < LOTTO_NUMBERS_COUNT) {
        purchasedLottoToSet.add(generateRandomNumber());
      }
      return [...purchasedLottoToSet];
    };

    this.myLotto = this.myLotto.map(() => generatePurchasedLottoToArray());
  }

  showPurchasedLotto() {
    $lottoCountAndToggle.classList.remove('hidden');
  }

  showWinningNumbersForm() {
    $winningNumbers.classList.remove('hidden');
  }

  showLottoCount() {
    const lottoCount = this.myLotto.length;
    this.$lottoCount.textContent = `총 ${lottoCount}개를 구매하였습니다.`;
  }

  renderLottoItems() {
    const isToggleOn = this.$lottoNumbersToggle.checked;
    const lottoItemsTemplate = this.myLotto
      .map((item) => {
        return `
        <li class="mx-1 d-flex items-center lotto-item">
          <span class="text-4xl">🎟️ </span>
          <span class="text-2xl ${isToggleOn || 'hidden'}" data-cy="lotto-item-numbers">${item.join(', ')} </span>
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
    if (purchaseAmountInput < PURCHASE_AMOUNT_UNIT) {
      alert(ALERT_MESSAGE.NOT_OVER_ONE_THOUSAND);
      return;
    }
    if (purchaseAmountInput % PURCHASE_AMOUNT_UNIT !== 0) {
      alert(ALERT_MESSAGE.NOT_ONE_THOUSAND_UNIT);
      return;
    }

    const lottoCount = purchaseAmountInput / PURCHASE_AMOUNT_UNIT;
    this.myLotto = Array(lottoCount).fill(null);

    this.setMyLotto();

    this.render();
  }
}

export default Lotto;
