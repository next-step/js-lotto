import { lottoStore } from '../store/LottoStore.js';
import { resultStore } from '../store/ResultStore.js';

const $lottoPriceInputFormContainer = document.getElementById('lotto-price-input');
const $costInput = $lottoPriceInputFormContainer.getElementsByTagName('input')[0];

$costInput.setAttribute('required', true);
$costInput.setAttribute('min', 1000);
$costInput.setAttribute('max', 100000);

$lottoPriceInputFormContainer.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputVal = $costInput.value;
  if (!isNumberPlainThousandToTenThousand(inputVal)) {
    alert('구입 가격은 1000 단위로만 입력해주세요!');
    $costInput.value = null;
    return;
  }

  const inputPrice = Number(inputVal);
  // TODO: 변화된 store action에 따라 맞춰 넣어주기
  lottoStore.dispatch('show');
  lottoStore.dispatch('updateBalance', inputPrice);
  resultStore.dispatch('purchase', inputPrice);
});

function isNumberPlainThousandToTenThousand(num) {
  return num.match(/[\d]0{3,5}/);
}

export const initLottoPriceInput = { purchaseCost: 0 };

export function LottoPriceInput({ purchaseCost } = initLottoPriceInput) {
  if (!purchaseCost) {
    $lottoPriceInputFormContainer.reset()
  }
}
