import { LottoInputView } from './common/LottoInputView.js';
import { initStore, resultStore } from '../store/ResultStore.js';
import { lottoStore } from '../store/LottoStore.js';
import { countSameElementInBothArray } from '../utils/utils.js';

class MyLottoInputView extends LottoInputView {
  myLottoInputFormContainer = null;

  constructor() {
    super()
    const $MyLottoInputFormContainer = document.getElementById('lotto-input');
    this.myLottoInputFormContainer = $MyLottoInputFormContainer;
    this.numberInputCollection = Array.from($MyLottoInputFormContainer.getElementsByTagName('input'));
    this.submitButton = $MyLottoInputFormContainer.getElementsByTagName('button')[0];
    this.initNumberInputCollection();
    this.#onSubmit();
  }

  hide() {
    this.myLottoInputFormContainer.classList.add('hide');
    this.#reset();
  }

  #reset() {
    this.myLottoInputFormContainer.reset();
  }

  show() {
    this.myLottoInputFormContainer.classList.remove('hide');
  }

  #onSubmit() {
    this.myLottoInputFormContainer.addEventListener('submit', (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (!this.validateInputs()) return;

      const inputLottoNums = this.getLottoNums();
      const bonusNumber = inputLottoNums.splice(inputLottoNums.length - 1, 1);

      const lottos = lottoStore.getStore().lottos;
      const lottoResult = this.#calcLottoResult(lottos, inputLottoNums, bonusNumber);
      const result = { ...initStore.result };
      lottoResult.forEach((el) => {
        if (el) result[el] += 1;
      });

      resultStore.dispatch('showResult', { result });
      lottoStore.dispatch('updateBalance', 0);
    });
  }

  #calcLottoResult(lottos, myLottoNums, bonusNumber) {
    return lottos.map((lotto) => {
      const sameNumberCount = countSameElementInBothArray(lotto, myLottoNums)
      const isBonusExist = lotto.some((num) => num === bonusNumber);

      if (sameNumberCount === 5 && isBonusExist) {
        return 'bonus';
      }

      if (sameNumberCount >= 3) {
        return sameNumberCount;
      }

      return null;
    });
  }
}

export const myLottoInputView = new MyLottoInputView();
