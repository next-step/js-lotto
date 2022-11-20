import { initStore, resultStore } from '../store/ResultStore.js';
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

export function MyLottoInput({ lottos, isShow }) {
  if (!isShow) {
    $MyLottoInput.classList.add('hide');
    $MyLottoInput.reset();
    return;
  }

  $MyLottoInput.classList.remove('hide');
  $MyLottoInput.removeEventListener('submit', submitEventListener);

  submitEventListener = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const inputLottoNums = inputs.map((el) => Number(el.value));
    if (checkIsSameElementInArray(inputLottoNums)) {
      alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
      return;
    }

    const bonusNumber = inputLottoNums.splice(inputLottoNums.length - 1, 1);

    const lottoResult = calcLottoResult(lottos, inputLottoNums, bonusNumber);
    const result = { ...initStore.result };
    lottoResult.forEach((el) => {
      if (el) result[el] += 1;
    });

    resultStore.dispatch('showResult', { result });
  };

  $MyLottoInput.addEventListener('submit', submitEventListener);
}

function calcLottoResult(lottos, myLottoNums, bonusNumber) {
  return lottos.map((lotto) => {
    const sameNumberCount = lotto.reduce((prev, curr, i) => {
      if (curr === myLottoNums[i]) {
        return prev + 1;
      }

      return prev;
    }, 0);

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
