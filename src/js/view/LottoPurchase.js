import { lottoStore } from '../store/LottoStore.js';
import { resultStore } from '../store/ResultStore.js';
import { createRandomNumber } from '../utils/utils.js';

const $lottoPurchaseFormContainer = document.getElementById('lotto-purchase');
const $costInput = $lottoPurchaseFormContainer.getElementsByTagName('input')[0];

$costInput.setAttribute('required', true);
$costInput.setAttribute('min', 1000);
$costInput.setAttribute('max', 100000);

$lottoPurchaseFormContainer.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputVal = $costInput.value;
  if (!inputVal.match(/[\d]0{3,5}/)) {
    alert('구입 가격은 1000 단위로만 입력해주세요!');
    $costInput.value = null;
    return;
  }

  const purchaseLottoCount = Math.floor( Number(inputVal) / 1000);
  const lottos = createLotto(purchaseLottoCount);

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

export function LottoPurchase({ purchaseCost }) {
  if (!purchaseCost) {
    $lottoPurchaseFormContainer.reset()
  }
}
