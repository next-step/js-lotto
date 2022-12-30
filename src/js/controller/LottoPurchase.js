import { lottoStore } from "../store/LottoStore.js";
import { hasSameElementInArray, createRandomNumber } from '../utils/utils.js';
import { MAX_LOTTO_NUMBER } from '../constants/lottoConstants.js';

const $lottoPurchaseContainer = document.getElementById('lotto-purchase');
const $newLottoNumberInputsContainer = document.getElementById('new-lotto-number-inputs-container');
const $lottoPurchaseButtonContainer = document.getElementById('lotto-purchase-button-container');

const $balance = document.getElementById('balance');
const $newLottoNumberInputs = $newLottoNumberInputsContainer.querySelectorAll('input');
const newLottoNumberInputs = Array.from($newLottoNumberInputs);

const [$buyAutoButton, $lottoPurchaseButton] = Array.from($lottoPurchaseButtonContainer.querySelectorAll('button'));

let localBalance = 0;

$lottoPurchaseButton.addEventListener('click', () => {
  if (newLottoNumberInputs.some((el) => !el.value)) {
    alert('로또 번호를 모두 입력해주세요!');
    return;
  }

  const newLottoNumbers = newLottoNumberInputs.map((el) => Number(el.value));

  if (hasSameElementInArray(newLottoNumbers)) {
    alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
    return;
  }

  lottoStore.dispatch('addLotto', [newLottoNumbers]);
  newLottoNumberInputs.forEach((el) => el.value = '');
  lottoStore.dispatch('updateBalance', localBalance - 1000);
});

$buyAutoButton.addEventListener('click', () => {
  if (localBalance <= 0) return;

  const purchaseLottoCount = Math.floor( Number(localBalance) / 1000);
  const autoCreatedLottos = createLotto(purchaseLottoCount);

  lottoStore.dispatch('addLotto', autoCreatedLottos);
  lottoStore.dispatch('updateBalance', 0);
});

function createLotto(count) {
  const LOTTO_NUMBER_COUNT = 6;
  const lottos = new Array(count)
    .fill(null)
    .map(() => new Array(LOTTO_NUMBER_COUNT)
      .fill(null)
      .map(() => createRandomNumber(MAX_LOTTO_NUMBER))
    );

  return lottos;
}

export function LottoPurchase({ isShow, balance }) {
  if (!isShow) {
    $lottoPurchaseContainer.classList.add('hide');
    return;
  }

  $lottoPurchaseContainer.classList.remove('hide');
  $balance.textContent = balance;
  localBalance = balance;
}
