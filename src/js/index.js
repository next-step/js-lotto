import { LOTTO_PER_PRICE } from '../js/consts.js';
import { lottoModule } from './modules/lottoModule.js';
import { lottoViewModule } from './modules/lottoViewModule.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const $lottoBuyForm = document.querySelector('#lotto-buy-form');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $moneyInput = document.querySelector('.money-input');
const $buyTicketsCountLabel = document.querySelector(
  '.buy-tickets-count-label'
);
const $autoBuySection = document.querySelector('.auto-buy-section');
const $autoBuyResultUl = $autoBuySection.querySelector('.auto-buy-result-ul');

$moneyInput.min = LOTTO_PER_PRICE;

const onAutoBuyLotto = (e) => {
  e.preventDefault();

  const {
    isInvalidInputMoneyUnit,
    getTicketNumbersOfBuying,
    buyAllLottoByCount,
  } = lottoModule(+$moneyInput.value);

  const {
    renderTicketNumbers,
    renderAutoBuyResult,
    visibleAutoBuySectionView,
  } = lottoViewModule($moneyInput);

  if (isInvalidInputMoneyUnit(LOTTO_PER_PRICE)) {
    alert(`lotto 금액은 ${LOTTO_PER_PRICE}원 단위로 입력해야 합니다.`);
    return;
  }

  const ticketNumbers = getTicketNumbersOfBuying(LOTTO_PER_PRICE);
  const boughtResult = buyAllLottoByCount(ticketNumbers);

  renderTicketNumbers($buyTicketsCountLabel, ticketNumbers);
  renderAutoBuyResult($autoBuyResultUl, boughtResult);
  visibleAutoBuySectionView($autoBuySection);
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
