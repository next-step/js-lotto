import { lottoStore } from '../store/LottoStore.js';
import { resultStore } from '../store/ResultStore.js';
import { createRandomNumber } from '../utils/utils.js';
import { MAX_LOTTO_NUMBER } from '../constants/lottoConstants.js';

const LOTTO_NUMBER_COUNT = 6;

const $lottoPurchaseFormContainer = document.getElementById('lotto-purchase');
const $costInput = $lottoPurchaseFormContainer.getElementsByTagName('input')[0];

$costInput.setAttribute('required', true);
$costInput.setAttribute('min', 1000);
$costInput.setAttribute('max', 100000);

$lottoPurchaseFormContainer.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputVal = $costInput.value;
  if (!isNumberPlainThousandToTenThousand(inputVal)) {
    alert('구입 가격은 1000 단위로만 입력해주세요!');
    $costInput.value = null;
    return;
  }

  const purchaseLottoCount = Math.floor( Number(inputVal) / 1000);
  const lottos = createLotto(purchaseLottoCount);

  lottoStore.dispatch('update', lottos);
  resultStore.dispatch('purchase', inputVal);
});

function isNumberPlainThousandToTenThousand(num) {
  return num.match(/[\d]0{3,5}/);
}

function createLotto(count) {
  const lottos = new Array(count)
    .fill(null)
    .map(() => new Array(LOTTO_NUMBER_COUNT)
      .fill(null)
      .map(() => createRandomNumber(MAX_LOTTO_NUMBER))
    );

  return lottos;
}

export const initLottoPurchase = { purchaseCost: 0 };

export function LottoPurchase({ purchaseCost } = initLottoPurchase) {
  if (!purchaseCost) {
    $lottoPurchaseFormContainer.reset()
  }
}
