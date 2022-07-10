import { ERR_MSG } from './constants/index.js';
import { validateMoney } from './validate/money.js';
import { addLottoDetail } from './view.js';

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

  addLottoDetail($lottoDiv);
  initLottoDetail();
};

const initLottoDetail = () => {
  const $showResultButton = document.querySelector('.open-result-modal-button');
  const $lottoNumbersToggleButton = document.querySelector(
    '.lotto-numbers-toggle-button'
  );

  $showResultButton.addEventListener('click', onModalShow);
};

$modalClose.addEventListener('click', onModalClose);
$moneyForm.addEventListener('submit', handleClickBuy);
