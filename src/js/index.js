import { ERR_MSG } from './constants/index.js';
import { validateMoney } from './validate/money.js';
import { renderLottoDetail, handleToggle } from './view.js';
import { generateLottos } from './lotto.js';
import { LottoStore } from './LottoStore.js';

const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $moneyForm = document.querySelector('.money-form');
const lottoStore = new LottoStore();

const onModalShow = () => {
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
  const $showResultButton = document.querySelector('.open-result-modal-button');
  const $lottoNumbersToggleButton = document.querySelector(
    '.lotto-numbers-toggle-button'
  );

  $lottoNumbersToggleButton.addEventListener('click', () => {
    handleToggle(lottoStore.lottos);
  });
  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
};

$moneyForm.addEventListener('submit', handleClickBuy);
