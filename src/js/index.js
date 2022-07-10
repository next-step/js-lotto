import {
  LOTTO_TRY_COUNT,
  LOTTO_PER_PRICE,
  LOTTO_NUMBERS,
} from '../js/consts.js';
import { lottoModule } from './modules/lottoModule.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const $lottoBuyForm = document.querySelector('#lotto-buy-form');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $moneyInput = document.querySelector('.money-input');
const $buyTocketsCountLabel = document.querySelector(
  '.buy-tickets-count-label'
);
const $autoBuySection = document.querySelector('.auto-buy-section');
const $autoBuyResultUl = $autoBuySection.querySelector('.auto-buy-result-ul');

$moneyInput.min = LOTTO_PER_PRICE;

const getLottoTicketSet = (
  lottoTry
) => `<li class="mx-1 text-4xl lotto-ticket-set">
        <span>🎟️ </span>
        <span class="lotto-result">${lottoTry.flat()}</span>
      </li>`;

const onAutoBuyLotto = (e) => {
  e.preventDefault();

  const {
    isInvalidInputMoneyUnit,
    getTicketNumbersOfBuying,
    getRandomLottoNumbers,
  } = lottoModule(+$moneyInput.value);

  if (isInvalidInputMoneyUnit(LOTTO_PER_PRICE)) {
    alert(`lotto 금액은 ${LOTTO_PER_PRICE}원 단위로 입력해야 합니다.`);
    return;
  }

  const ticketNumbers = getTicketNumbersOfBuying(LOTTO_PER_PRICE);
  $buyTocketsCountLabel.innerHTML = `총 ${ticketNumbers}개를 구매하였습니다.`;

  const boughtResult = Array.from({ length: ticketNumbers }).map(() => {
    return getRandomLottoNumbers(LOTTO_TRY_COUNT, LOTTO_NUMBERS);
  });

  $autoBuyResultUl.innerHTML = boughtResult.map(getLottoTicketSet).join('');

  $autoBuySection.classList.remove('hidden');
};

const onToggleLottoResult = () => {
  $autoBuyResultUl.classList.toggle('flex-col');
};

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$lottoBuyForm.addEventListener('submit', onAutoBuyLotto);
$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$lottoNumbersToggleButton.addEventListener('click', onToggleLottoResult);
