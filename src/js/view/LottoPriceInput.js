import { lottoStore } from '../store/LottoStore.js';
import { resultStore } from '../store/ResultStore.js';
import { createRandomNumber } from '../utils/utils.js';
import { MAX_LOTTO_NUMBER } from '../constants/lottoConstants.js';

const LOTTO_NUMBER_COUNT = 6;

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

  // TODO: 이걸 수동, 자동 로또 구입하는 곳에서 갱신하도록 하기
  const purchaseLottoCount = Math.floor( Number(inputVal) / 1000);
  const lottos = createLotto(purchaseLottoCount);

  lottoStore.dispatch('update', []);
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

export const initLottoPriceInput = { purchaseCost: 0 };

export function LottoPriceInput({ purchaseCost } = initLottoPriceInput) {
  if (!purchaseCost) {
    $lottoPurchaseFormContainer.reset()
  }
}
