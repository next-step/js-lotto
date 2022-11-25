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

import { LottoModel } from './model/LottoModel.js';
import { LottoComponent } from './ui/LottoComponent.js';
import { LottoResultModel } from './model/LottoResultModel.js';
import { LottoResultComponent } from './ui/LottoResultComponent.js';
import { WinningLotto } from './WinningLotto.js';
import { PurchaseNumber } from './PurchaseNumber.js';

export class App {
  lotto;

  constructor() {
    this.setEvents();
  }

  handlePurchase() {
    try {
      this.lotto = new LottoModel();
      const purchaseNumber = new PurchaseNumber($purchaseAmount.value);

      this.lotto.generateLottoNumbers(purchaseNumber.number);
      const lottoComp = new LottoComponent(this.lotto);

      this.handleWinningNumbersShow();
    } catch (err) {
      alert(err.message);
    }
  }

  handleShowResult() {
    const winningNumbers = Array.from($winningNumbers).map(
      (number) => +number.value
    );
    try {
      const winngingLotto = new WinningLotto({
        lottoNumber: winningNumbers,
        bonusNumber: +$bonusNumber.value,
      });
      const lottoResultModel = new LottoResultModel(
        this.lotto.numbers,
        winngingLotto
      );
      const purchaseAmount = $purchaseAmount.value;

      lottoResultModel.computeWinningResult(purchaseAmount);
      const lottoResultComp = new LottoResultComponent(lottoResultModel);

      this.handleShowModal();
    } catch (err) {
      alert(err.message);
    }
  }

  handleShowLotto(checked) {
    const $lottoNumbers = document.querySelectorAll('.lotto-number');
    for (const numbers of $lottoNumbers) {
      numbers.style.display = checked ? 'block' : 'none';
    }
  }

  handleWinningNumbersShow() {
    $switch.classList.add('show');
    $winningNumberForm.classList.add('show');
  }

  handleShowModal() {
    $modal.classList.add('open');
  }

  handleCloseModal() {
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
      this.handlePurchase();
    });

    $toggleButton.addEventListener('click', (event) => {
      const checked = event.target.checked;
      this.handleShowLotto(checked);
    });

    $lottoResultButton.addEventListener('click', () => {
      this.handleShowResult();
    });

    $modalCloseButton.addEventListener('click', () => {
      this.handleCloseModal();
    });

    $resetButton.addEventListener('click', () => {
      this.resetLotto();
      this.handleCloseModal();
    });
  }
}
