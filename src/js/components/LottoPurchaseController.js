import { lottoStore } from '../store/LottoStore.js';
import { resultStore } from '../store/ResultStore.js';
import { createRandomNumber } from '../utils/utils.js';

const lottoPurchaseContainer = document.getElementById('lotto-purchase');
const costInputElement = lottoPurchaseContainer.getElementsByTagName('input')[0];
const submitButton = lottoPurchaseContainer.getElementsByTagName('button')[0];

costInputElement.setAttribute('required', true);
costInputElement.setAttribute('min', 1000);
costInputElement.setAttribute('max', 100000);

lottoPurchaseContainer.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputVal = costInputElement.value;
  if (!inputVal.match(/[\d]0{3,5}/)) {
    alert('맞지 않습니다!');
    costInputElement.value = null;
    return;
  }

  // 1000 갯수에 따라 로또 반복 생성
  // 6개의 숫자는 랜덤으로 생성한다.
  const purchaseLottoCount = Math.floor( Number(inputVal) / 1000);
  const lottos = createLotto(purchaseLottoCount);
  // 전역 state를 갱신.
  lottoStore.dispatch('update', lottos);
  resultStore.dispatch('purchase', inputVal);
})

function createLotto(count) {
  const lottos = new Array(count)
    .fill(null)
    .map(() => new Array(6)
      .fill(null)
      .map(() => createRandomNumber(45))
    );

  return lottos;
}
