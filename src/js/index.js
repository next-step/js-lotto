import Lotto from './models/lotto';

const lotto = new Lotto();

const $lottoPayForm = document.querySelector('#lotto-pay-form');
const $lottoPayInput = $lottoPayForm.querySelector('input');

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

$lottoPayForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const lottos = Lotto.pay($lottoPayInput.value);

  console.log('lottos', lottos);
  if (lottos === undefined) $lottoPayForm.reset();
});

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
