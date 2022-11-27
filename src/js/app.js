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
  $manualLottoNumbers,
  $manualPurchase,
} from './dom.js';

import { LottoModel } from './model/LottoModel.js';
import { LottoComponent } from './ui/LottoComponent.js';
import { LottoResultModel } from './model/LottoResultModel.js';
import { LottoResultComponent } from './ui/LottoResultComponent.js';
import { WinningLotto } from './WinningLotto.js';
import { PurchaseNumber } from './PurchaseNumber.js';

export class App {
  lottoModel;

  constructor() {
    this.setEvents();
  }

  handlePurchase() {
    const manualLottoNumbers = $manualPurchase.checked
      ? Array.from($manualLottoNumbers).map((number) => +number.value)
      : [];

    try {
      const manualLotto = new WinningLotto({
        lottoNumber: manualLottoNumbers,
        bonusNumber: [],
      });

      this.lottoModel = new LottoModel();
      const purchaseNumber = new PurchaseNumber($purchaseAmount.value);
      const manualLottoValue = manualLotto.lottoNumber.length > 0 ? 1 : 0;

      this.lottoModel.generateLottoNumbers(
        purchaseNumber.value - manualLottoValue,
        manualLotto.lottoNumber
      );
      new LottoComponent(this.lottoModel);

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
        this.lottoModel.numbers,
        winngingLotto
      );
      const purchaseAmount = $purchaseAmount.value;

      lottoResultModel.computeWinningResult(purchaseAmount);
      new LottoResultComponent(lottoResultModel);

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
    this.lottoModel.resetLottoNumber();
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
