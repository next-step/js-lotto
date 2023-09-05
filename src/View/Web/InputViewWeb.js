import { Validator } from '../../utils/Validator';
import { ELEMENT, MESSAGE } from '../../constants';

export class InputViewWeb {
  #element = ELEMENT;
  #validator = Validator.View;

  readPurchaseAmount() {
    const inputElement = this.#element.PURCHASE_AMOUNT_INPUT;
    const purchaseAmount = parseInt(inputElement.value, 10);

    if (isNaN(purchaseAmount)) throw new Error(MESSAGE.READ.PURCHASE_AMOUNT);

    return purchaseAmount;
  }

  // 아래부터 수정해야함
  readWinningNumbers() {
    const lottoNumbers = this.#readLottoNumbers();
    const bonusNumber = this.#readBonusNumber(lottoNumbers);

    return { lottoNumbers, bonusNumber };
  }

  #readLottoNumbers() {
    const lottoNumbers = Array.from(this.#element.LOTTO_NUMBER_INPUT).map(
      Number
    );

    if (!this.#validator.readLottoNumbers(lottoNumbers)) {
      throw new Error(MESSAGE.READ.LOTTO_NUMBERS);
    }

    return lottoNumbers;
  }

  #readBonusNumber(lottoNumbers) {
    const bonusNumber = Number(this.#element.BONUS_NUMBER_INPUT.value);

    if (!this.#validator.readBonusNumber(bonusNumber, lottoNumbers)) {
      throw new Error(MESSAGE.READ.BONUS_NUMBER);
    }

    return bonusNumber;
  }

  readRestart() {
    return new Promise((resolve) => {
      this.restartButton.addEventListener('click', () => {
        const restartConfirmed = confirm(MESSAGE.READ.RESTART);
        resolve(restartConfirmed === RESTART_INPUT.YES);
      });
    });
  }
}
