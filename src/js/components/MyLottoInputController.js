import { resultStore } from '../store/ResultStore.js';
import { checkIsSameElementInArray } from '../utils/utils.js';

const $MyLottoInput = document.getElementById('lotto-input');
const inputs = Array.from($MyLottoInput.getElementsByTagName('input'));
const resultButton = $MyLottoInput.getElementsByTagName('button')[0];

inputs.forEach((input, i) => {
  input.setAttribute('required', true);
  input.setAttribute('min', 1);
  input.setAttribute('max', 45);
  input.setAttribute('aria-label', `$lottery-input-${i + 1}`);
  input.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (value.length > 1) {
      if (i >= inputs.length - 1) {
        resultButton.focus();
        return;
      }

      inputs[i + 1].focus();
    }
  });
});

let submitEventListener = null;

export function MyLottoInput(lottos) {
  $MyLottoInput.removeEventListener('submit', submitEventListener);

  submitEventListener = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const inputLottoNums = inputs.map((el) => el.value);
    if (checkIsSameElementInArray(inputLottoNums)) {
      alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
      return;
    }

    const bonusNumber = inputLottoNums.splice(inputLottoNums.length - 1, 1);

    lottos.forEach((lotto) => {
      console.log(lotto);
    });

    resultStore.dispatch('showResult', { result: null });
  };

  $MyLottoInput.addEventListener('submit', submitEventListener);
}
