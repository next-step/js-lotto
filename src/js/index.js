import { addLottoDetail } from './view.js';

const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const $buyLottoButton = document.querySelector('.buy-lotto-button');
const $lotto = document.querySelector('.lotto');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const handleClickBuy = () => {
  addLottoDetail($lotto);
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
$buyLottoButton.addEventListener('click', handleClickBuy);
