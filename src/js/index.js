import { isValidateAmount } from './utils/validator.js';
import { purchaseLotto, getLottoNumbers } from './utils/common.js';
import { ERROR_MSSAGE } from './utils/constants.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $purchaseInputForm = document.querySelector('#input-price-form');
const $purchaseButton = document.querySelector('.purchase-button');
const $purchaseInput = document.querySelector('.purchase-amount');

const $purchasedLottos = document.querySelector('#purchased-lottos');
const $inputLottoNums = document.querySelector('#input-lotto-nums');

const $totalPurchased = document.querySelector('#total-purchased');

const $lottoImages = document.querySelector('.lotto-images');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onPurchaseLotto = (event) => {
  event.preventDefault();

  const purchaseAmount = $purchaseInput.value;

  if (!isValidateAmount(purchaseAmount)) {
    alert(ERROR_MSSAGE.AMOUNT);
    return;
  }

  const ticketCount = purchaseLotto(purchaseAmount);
  $totalPurchased.textContent = ticketCount;

  for (let count = 0; count < ticketCount; count++) {
    const lottoNumbers = getLottoNumbers();
    const lottoImageHTML = `<li><span class='lotto-image mx-1 text-4xl'>🎟️</span><span class='lotto-numbers' style='display:none'>${lottoNumbers.toString()}</span></li>`;
    $lottoImages.insertAdjacentHTML('beforeend', lottoImageHTML);
  }

  $purchasedLottos.style.display = 'block';
  $inputLottoNums.style.display = 'block';
};

const onToggleLottoNumbers = ($event) => {
  const $lottoNumbers = document.querySelectorAll('.lotto-numbers');

  if ($lottoNumbersToggleButton.checked) {
    $lottoImages.classList.add('d-block');
    $lottoImages.classList.remove('d-flex');
    $lottoNumbers.forEach((lotto) => {
      lotto.style.display = 'inline-block';
    });
  } else {
    $lottoImages.classList.add('d-flex');
    $lottoImages.classList.remove('d-block');
    $lottoNumbers.forEach((lotto) => {
      lotto.style.display = 'none';
    });
  }
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$purchaseInputForm.addEventListener('submit', onPurchaseLotto);
$lottoNumbersToggleButton.addEventListener('change', onToggleLottoNumbers);
