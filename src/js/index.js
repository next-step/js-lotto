import { ERR_MSG, LOTTO } from './constants/index.js';
import { validateMoney, validateWinning } from './validate/index.js';
import { renderLottoDetail, handleToggle, renderModalBody } from './view.js';
import {
  generateLottos,
  getLottoPlacesResult,
  getLottoTotalPrize,
} from './lotto.js';
import { LottoStore } from './LottoStore.js';

const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $moneyForm = document.querySelector('.money-form');
const lottoStore = new LottoStore();

const onModalShow = (e) => {
  e.preventDefault();
  const winningNumbers = Array(6)
    .fill(0)
    .map((v, i) => Number(e.target[i].value));
  const bonusNumber = Number(e.target[LOTTO.LENGTH].value);
  if (!validateWinning(winningNumbers, bonusNumber)) {
    alert(ERR_MSG.NOT_A_DUPLICATE_NUMBER);
    return;
  }
  renderModal(winningNumbers, bonusNumber);
};

const renderModal = (winningNumbers, bonusNumber) => {
  const places = getLottoPlacesResult(
    lottoStore.lottos,
    winningNumbers,
    bonusNumber
  );
  const money = lottoStore.lottos.length * LOTTO.PRICE;
  const revenue = Math.round(
    ((getLottoTotalPrize(places) - money) / money) * 100
  );

  renderModalBody(places, revenue);
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const handleClickBuy = (e) => {
  e.preventDefault();
  const money = e.target[0].value;
  if (!validateMoney(money)) {
    alert(ERR_MSG.NOT_MULTIPLE_OF_1000);
    return;
  }
  setBuyLotto(money);
};

const setBuyLotto = (money) => {
  const lottos = generateLottos(money);
  lottoStore.lottos = lottos;
  renderLottoDetail(lottos);
  initListenerAfterBuyLotto();
};

const initListenerAfterBuyLotto = () => {
  const $winningForm = document.querySelector('.winning-form');
  const $lottoNumbersToggleButton = document.querySelector(
    '.lotto-numbers-toggle-button'
  );

  $lottoNumbersToggleButton.addEventListener('click', () => {
    handleToggle(lottoStore.lottos);
  });
  $winningForm.addEventListener('submit', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
};

$moneyForm.addEventListener('submit', handleClickBuy);
