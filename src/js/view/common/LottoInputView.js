import { MAX_LOTTO_NUMBER } from "../../constants/lottoConstants.js";
import { hasSameElementInArray } from "../../utils/utils.js";

export class LottoInputView {
  numberInputCollection = [];
  submitButton = null;

  initNumberInputCollection() {
    this.numberInputCollection.forEach(($input, i) => {
      $input.setAttribute('required', true);
      $input.setAttribute('min', 1);
      $input.setAttribute('max', MAX_LOTTO_NUMBER);
      $input.setAttribute('aria-label', `$lottery-input-${i + 1}`);
      $input.addEventListener('keyup', createLottoInputKeyUpHandler(i, this.numberInputCollection, this.submitButton));
    });

    function createLottoInputKeyUpHandler(i, numberInputCollection, submitButton) {
      return (e) => {
        const value = e.target.value;
        if (value.length > 1) {
          if (i >= numberInputCollection.length - 1) {
            submitButton.focus();
            return;
          }

          numberInputCollection[i + 1].focus();
        }
      }
    }
  }

  getLottoNums() {
    return this.numberInputCollection.map(($input) => Number($input.value));
  }

  validateInputs() {
    const inputLottoNums = this.getLottoNums();
    if (hasSameElementInArray(inputLottoNums)) {
      alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
      return false;
    }

    return true;
  }
}
