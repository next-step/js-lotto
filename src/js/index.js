import { ERR_MSG } from './constants/index.js';
import { LottoStore } from './store.js';
import { validateMoney } from './validate/money.js';
import { addLottoDetail, renderLotto, handleToggle } from './view.js';
import { generateLottos } from './lotto.js';

const lottoStore = new LottoStore();

const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const $lottoDiv = document.querySelector('.lotto-div');
const $moneyForm = document.querySelector('.money-form');

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
  lottoStore.initStore();
  lottoStore.money = money;
  const lottos = generateLottos(money);
  lottoStore.lottos = lottos;
  lottoStore.printLotto();
  addLottoDetail($lottoDiv);
  initLottoDetail(lottos);
};

const initLottoDetail = (lottos) => {
  const $showResultButton = document.querySelector('.open-result-modal-button');
  const $lottoNumbersToggleButton = document.querySelector(
    '.lotto-numbers-toggle-button'
  );
  const $lottoList = document.getElementById('lotto-list');

  renderLotto($lottoList, lottos);
  $lottoNumbersToggleButton.addEventListener('click', handleToggle);
  $showResultButton.addEventListener('click', onModalShow);
};

$modalClose.addEventListener('click', onModalClose);
$moneyForm.addEventListener('submit', handleClickBuy);
