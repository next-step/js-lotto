import { lottoStore } from './store/LottoStore.js';

// 여기서 구입할 금액 입력 담당

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
console.log(lottos)
  // 전역 state를 갱신해야 함.
  lottoStore.dispatch('update', lottos);
})

function createLotto(count) {
  const lottos = new Array(count).fill(null).map(() => new Array(6).fill(null).map(() => 0));

  return lottos;
}
