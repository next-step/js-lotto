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

const ERROR_MESSAGE = {
  INVALID: '1,000원 단위로 입력하세요.',
  REQUIRED: '금액을 입력하세요.',
  EMPTY_RANGE: '1에서 45 사이의 당첨 번호를 입력하세요.',
  DUPLICATED: '당첨 번호와 보너스 번호 모두 중복 입력은 불가합니다.',
};
const AMOUNT_UNIT = 1_000;

export class App {
  lotto;

  constructor() {
    this.setEvents();
  }

  onPurchase() {
    if ($purchaseAmount.value === '') {
      alert(ERROR_MESSAGE.REQUIRED);
      return;
    }

    if (!this.isValidPurchaseAmount($purchaseAmount.value)) {
      alert(ERROR_MESSAGE.INVALID);
      return;
    }

    const purchaseNumbers = $purchaseAmount.value / AMOUNT_UNIT;

    this.onShowPurchaseNumber(purchaseNumbers);
    this.lotto = new LottoModel(purchaseNumbers);
    const lottoComp = new LottoComponent(this.lotto.numbers);
    lottoComp.render();

    this.onShowWinningNumbers();
  }

  onConfirmWinningNumbers() {
    const winningNumbers = Array.from($winningNumbers).map(
      (number) => +number.value
    );

    const bonusNumber = parseInt($bonusNumber.value);

    if (!this.isValidWinningNumbers([...winningNumbers, bonusNumber])) {
      alert(ERROR_MESSAGE.EMPTY_RANGE);
      return;
    }

    if (this.isDuplicateNumbers([...winningNumbers, bonusNumber])) {
      alert(ERROR_MESSAGE.DUPLICATED);
      return;
    }

    const lottoResultModel = new LottoResultModel(
      this.lotto.numbers,
      winningNumbers
    );

    const lottoResultComp = new LottoResultComponent(lottoResultModel);
    lottoResultComp.render();

    this.onShowModal();
  }

  isValidPurchaseAmount(purchaseAmount) {
    return purchaseAmount > 0 && purchaseAmount % AMOUNT_UNIT === 0;
  }

  isValidWinningNumbers(winningNumbers) {
    return winningNumbers.every(
      (number) => number !== '' && number > 0 && number <= 45
    );
  }

  isDuplicateNumbers(numbers) {
    const numberCollection = new Set(numbers);
    return numbers.length !== numberCollection.size;
  }

  onShowLottoNumbers(checked) {
    const $lottoNumbers = document.querySelectorAll('.lotto-number');
    for (const numbers of $lottoNumbers) {
      numbers.style.display = checked ? 'block' : 'none';
    }
  }

  onShowWinningNumbers() {
    $switch.classList.add('show');
    $winningNumberForm.classList.add('show');
  }

  onShowPurchaseNumber(purchaseNumbers) {
    $purchaseNumbers.textContent = `총 ${purchaseNumbers}개를 구매하였습니다.`;
    $purchaseLotto.style.display = 'block';
  }

  onShowModal() {
    $modal.classList.add('open');
  }

  onCloseModal() {
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
  }

  setEvents() {
    $purchaseButton.addEventListener('click', () => {
      this.onPurchase();
    });

    $toggleButton.addEventListener('click', (event) => {
      const checked = event.target.checked;
      this.onShowLottoNumbers(checked);
    });

    $lottoResultButton.addEventListener('click', () => {
      this.onConfirmWinningNumbers();
    });

    $modalCloseButton.addEventListener('click', () => {
      this.onCloseModal();
    });

    $resetButton.addEventListener('click', () => {
      this.resetLotto();
      this.onCloseModal();
    });
  }
}
