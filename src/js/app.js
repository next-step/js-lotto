import { LottoComponent, LottoModel } from './lotto.js';
import {
  $purchaseAmount,
  $purchaseButton,
  $purchaseLotto,
  $purchaseNumbers,
  $toggleButton,
  $switch,
  $winningNumberForm,
  $winningNumbers,
  $lottoResultButton,
  $modalCloseButton,
  $bonusNumber,
  $modal,
  $resetButton,
} from './dom.js';
import { LottoResultComponent, LottoResultModel } from './result.js';
import { AMOUNT_UNIT } from './constants.js';

export class App {
  lotto;

  constructor() {
    this.setEvents();
  }

  onPurchase() {
    this.lotto = new LottoModel();
    const invalidMesssage = this.lotto.validate();
    if (invalidMesssage) {
      alert(invalidMesssage);
      return;
    }

    const purchaseNumbers = $purchaseAmount.value / AMOUNT_UNIT;
    this.lotto.generateLottoNumbers(purchaseNumbers);

    const lottoComp = new LottoComponent(this.lotto);

    this.handleWinningNumbersShow();
  }

  handleResultShow() {
    const lottoResultModel = new LottoResultModel(this.lotto.numbers);
    const invalidMessage = lottoResultModel.validate();
    if (invalidMessage) {
      alert(invalidMessage);
      return;
    }

    lottoResultModel.computeWinningResult();

    const lottoResultComp = new LottoResultComponent(lottoResultModel);

    this.handleModalShow();
  }

  handleLottoNumbersShow(checked) {
    const $lottoNumbers = document.querySelectorAll('.lotto-number');
    for (const numbers of $lottoNumbers) {
      numbers.style.display = checked ? 'block' : 'none';
    }
  }

  handleWinningNumbersShow() {
    $switch.classList.add('show');
    $winningNumberForm.classList.add('show');
  }

  handleModalShow() {
    $modal.classList.add('open');
  }

  handleModalClose() {
    $modal.classList.remove('open');
  }

  resetLotto() {
    $purchaseAmount.value = '';
    $purchaseNumbers.textContent = '';
    $toggleButton.checked = false;
    $purchaseLotto.style.display = 'none';
    for (const number of $winningNumbers) {
      number.value = '';
    }
    $bonusNumber.value = '';
    $winningNumberForm.classList.remove('show');
    this.lotto.resetLottoNumber();
    $purchaseAmount.value = '';
  }

  setEvents() {
    $purchaseButton.addEventListener('click', () => {
      this.onPurchase();
    });

    $toggleButton.addEventListener('click', (event) => {
      const checked = event.target.checked;
      this.handleLottoNumbersShow(checked);
    });

    $lottoResultButton.addEventListener('click', () => {
      this.handleResultShow();
    });

    $modalCloseButton.addEventListener('click', () => {
      this.handleModalClose();
    });

    $resetButton.addEventListener('click', () => {
      this.resetLotto();
      this.handleModalClose();
    });
  }
}
