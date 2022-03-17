import { LottoVendingMachine } from './lottoVendingMachine.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// );
const $purchaseLotto = document.querySelector('form.mt-5');
const $lottoAmount = document.querySelector('section.mt-9 label.my-0 span');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

$purchaseLotto.addEventListener('submit', (event) => {
  event.preventDefault();
  const money = new FormData(event.currentTarget).get('money');
  const lottos = LottoVendingMachine.purchaseLotto(money);
  $lottoAmount.innerText = lottos.length;
});
