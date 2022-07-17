import { ERROR, LOTTO_PER_PRICE } from './consts.js';
import { isDuplicated } from './utils.js';
import { lottoModule } from './modules/lottoModule.js';
import { lottoViewModule } from './modules/lottoViewModule.js';
import { LottoError } from './modules/errorModule.js';

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

const $winningNumbersForm = document.querySelector('#winning-numbers-form');
const $winningNumberInputWrapper = document.querySelector(
  '.winning-number-input-wrapper'
);
const $bonusNumberInput = document.querySelector('.bonus-number');
const $winningResultBody = document.querySelector('.winning-result-body');
const $rateOfProfit = document.querySelector('.rate-of-profit');
const $lottoDataResetButton = document.querySelector('#lotto-data-reset');

const {
  lottoData,
  initializeData,
  isInvalidInputMoneyUnit,
  getTicketNumbersOfBuying,
  buyAllLottoByCount,
  getWinningResult,
} = lottoModule();

const {
  initializeView,
  renderTicketNumbers,
  renderAutoBuyResult,
  visibleAutoBuySectionView,
  getWinningValuesInInput,
  getWinningResultViewModel,
  renderWinningResult,
  visibleWinningFormView,
  renderProfit,
} = lottoViewModule(
  $moneyInput,
  $autoBuySection,
  $autoBuyResultUl,
  $winningNumberInputWrapper,
  $bonusNumberInput,
  $winningNumbersForm,
  $modal
);

const onInitialize = () => {
  initializeData();
  initializeView();
};

const onAutoBuyLotto = (e) => {
  e.preventDefault();
  if (isInvalidInputMoneyUnit(LOTTO_PER_PRICE, +$moneyInput.value)) {
    return new LottoError(
      `lotto 금액은 ${LOTTO_PER_PRICE}원 단위로 입력해야 합니다.`
    );
  }

  const ticketNumbers = getTicketNumbersOfBuying(
    LOTTO_PER_PRICE,
    +$moneyInput.value
  );
  const boughtResult = buyAllLottoByCount(ticketNumbers);
  lottoData.setInputMoney(+$moneyInput.value);
  lottoData.setBoughtResult(boughtResult);
  renderTicketNumbers($buyTicketsCountLabel, ticketNumbers);
  renderAutoBuyResult(boughtResult);
  visibleAutoBuySectionView();
  visibleWinningFormView();
};

const onToggleLottoResult = () => {
  $autoBuyResultUl.classList.toggle('flex-col');
};

const onVisibleWinningResult = (e) => {
  e.preventDefault();
  const winningNumbers = getWinningValuesInInput($winningNumberInputWrapper);

  if (isDuplicated([...winningNumbers, +$bonusNumberInput.value])) {
    return new LottoError(ERROR.DUPLICATED_LOTTO_NUMBER);
  }

  const result = getWinningResult(
    winningNumbers,
    lottoData.getBoughtResult(),
    +$bonusNumberInput.value
  );

  const viewModel = getWinningResultViewModel(result);
  renderWinningResult($winningResultBody, viewModel);
  renderProfit($rateOfProfit, lottoData.getInputMoney(), viewModel);
  onModalShow();
};
const onModalShow = () => {
  $modal.classList.add('open');
};
const onModalClose = () => {
  $modal.classList.remove('open');
};

$lottoBuyForm.addEventListener('submit', onAutoBuyLotto);
$winningNumbersForm.addEventListener('submit', onVisibleWinningResult);
$modalClose.addEventListener('click', onModalClose);
$lottoNumbersToggleButton.addEventListener('click', onToggleLottoResult);
$lottoDataResetButton.addEventListener('click', onInitialize);

onInitialize();
