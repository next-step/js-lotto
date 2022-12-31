import { LottoInputView } from './common/LottoInputView.js';
import { lottoStore } from '../store/LottoStore.js';
import { resultStore } from '../store/ResultStore.js';

class LottoPurchaseInputView extends LottoInputView {
  lottoPurchaseContainer;
  autoPurchaseButton;
  balanceView;

  constructor() {
    super();
    const $lottoPurchaseContainer = document.getElementById('lotto-purchase');
    this.lottoPurchaseContainer = $lottoPurchaseContainer;

    this.numberInputCollection = Array.from(document.getElementById('new-lotto-number-inputs-container').querySelectorAll('input'));

    const $lottoPurchaseButtonContainer = document.getElementById('lotto-purchase-button-container');
    const [$autoPurchaseButton, $lottoPurchaseButton] = Array.from($lottoPurchaseButtonContainer.querySelectorAll('button'));
    this.autoPurchaseButton = $autoPurchaseButton;
    this.submitButton = $lottoPurchaseButton;

    this.balanceView = document.getElementById('balance');

    this.initNumberInputCollection();
    this.#onClick();
  }

  #checkIfInputsFilled() {
    if (this.numberInputCollection.some((el) => !el.value)) {
      alert('로또 번호를 모두 입력해주세요!');
      return false;
    }

    return true;
  }

  hide() {
    this.lottoPurchaseContainer.classList.add('hide');
  }

  #setBalance() {
    const balance = lottoStore.getStore().balance;
    this.balanceView.textContent = balance;
  }

  #show() {
    this.lottoPurchaseContainer.classList.remove('hide');
  }

  initLocalPurchaseInputView() {
    this.#show();
    this.#setBalance();
  }

  #onClick() {
    this.submitButton.addEventListener('click', () => {
      if (!this.#checkIfInputsFilled()) return;
      if (!this.validateInputs()) return;

      const newLottoNumbers = this.getLottoNums();
      lottoStore.dispatch('addLotto', [newLottoNumbers]);
      this.numberInputCollection.forEach((el) => el.value = '');

      const prevBalance = lottoStore.getStore().balance;
      lottoStore.dispatch('updateBalance', prevBalance - 1000);
      this.#setBalance();
    });

    this.autoPurchaseButton.addEventListener('click', () => {
      const balance = lottoStore.getStore().balance;

      if (balance <= 0) return;

      const purchaseLottoCount = Math.floor( Number(balance) / 1000);
      const autoCreatedLottos = this.#createLotto(purchaseLottoCount);

      lottoStore.dispatch('addLotto', autoCreatedLottos);
      lottoStore.dispatch('updateBalance', 0);
    })
  };

  #createLotto(count) {
    const LOTTO_NUMBER_COUNT = 6;
    const lottos = new Array(count)
      .fill(null)
      .map(() => new Array(LOTTO_NUMBER_COUNT)
        .fill(null)
        .map(() => createRandomNumber(MAX_LOTTO_NUMBER))
      );

    return lottos;
  }
}

export const lottoPurchaseInputView = new LottoPurchaseInputView();
