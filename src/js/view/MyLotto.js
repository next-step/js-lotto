import { initStore, resultStore } from '../store/ResultStore.js';
import { hasSameElementInArray } from '../utils/utils.js';
import { MAX_LOTTO_NUMBER } from '../constants/lottoConstants';

const $MyLottoInputFormContainer = document.getElementById('lotto-input');
const $numberInputCollection = Array.from($MyLottoInputFormContainer.getElementsByTagName('input'));
const $resultButton = $MyLottoInputFormContainer.getElementsByTagName('button')[0];

$numberInputCollection.forEach(($input, i) => {
  $input.setAttribute('required', true);
  $input.setAttribute('min', 1);
  $input.setAttribute('max', MAX_LOTTO_NUMBER);
  $input.setAttribute('aria-label', `$lottery-input-${i + 1}`);
  $input.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (value.length > 1) {
      if (i >= $numberInputCollection.length - 1) {
        $resultButton.focus();
        return;
      }

      $numberInputCollection[i + 1].focus();
    }
  });
});

let submitEventListener = null;

export function MyLotto({ lottos, isShow }) {
  if (!isShow) {
    $MyLottoInputFormContainer.classList.add('hide');
    $MyLottoInputFormContainer.reset();
    return;
  }

  $MyLottoInputFormContainer.classList.remove('hide');
  $MyLottoInputFormContainer.removeEventListener('submit', submitEventListener);

  submitEventListener = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const inputLottoNums = $numberInputCollection.map(($input) => Number($input.value));
    if (hasSameElementInArray(inputLottoNums)) {
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

  $MyLottoInputFormContainer.addEventListener('submit', submitEventListener);
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
