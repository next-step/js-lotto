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
  // TODO: Lotto번호들을 검증하는 로직은 MyLotto와 동일 따라서 refactoring 필요
  if (hasSameElementInArray(newLottoNumbers)) {
    alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
    return;
  }

  lottoStore.dispatch('addLotto', [newLottoNumbers]);
  newLottoNumberInputs.forEach((el) => el.value = '');
  lottoStore.dispatch('updateBalance', localBalance - 1000);
});

$buyAutoButton.addEventListener('click', () => {
  // 나머지 금액으로 자동생성 (금액 없으면 걍 return)
  if (localBalance <= 0) return;
  // TODO: 단위 로또 가격 상수로 관리하기
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

// 사실상 이건 Controller네....
// ㅋㅋㅋㅋㅋ 제왕적 Controller
// TODO: 역할별로 나누기
export function LottoPurchase({ isShow, balance }) {
  if (!isShow) {
    $lottoPurchaseContainer.classList.add('hide');
    return;
  }

  $lottoPurchaseContainer.classList.remove('hide');
  $balance.textContent = balance;
  localBalance = balance;
}

// FIXME: 우선 기능 만들고, 테스트 코드 만들고 리팩토링 및 클린코드
