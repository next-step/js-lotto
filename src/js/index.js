import { pay } from './models/lotto';

const $lottoPayForm = document.querySelector('.lotto-pay-form');
const $lottoPayInput = $lottoPayForm.querySelector('input');

const $lottoPaidSection = document.querySelector('.lotto-paid-section');
const $lottoPaidCounts = document.querySelector('.lotto-paid-counts');
const $lottoPaidSwitch = document.querySelector('.lotto-paid-switch');
const $lottoPaidCheckBox = $lottoPaidSwitch.querySelector('input');
const $lottoPaidCards = document.querySelector('.lotto-paid-cards');

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

$lottoPayForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const lottos = pay($lottoPayInput.value);

  if (lottos === undefined) $lottoPayForm.reset();
  else {
    renderPaidSectionItems(lottos);
    resetPaidSection();
  }
});

const renderPaidSectionItems = (lottos) => {
  $lottoPaidSection.classList.add('visible');
  $lottoPaidCounts.innerHTML = lottos.length;
  $lottoPaidCards.innerHTML = lottos
    .map((lotto) => {
      return `<div class="lotto-paid-card d-flex items-center mx-1 text-4xl" data-target="lotto-paid-card">
                <div>🎟️</div> 
                <span class="lotto-paid-card-numbers d-none text-xl ml-3" data-target="lotto-paid-card-numbers">${lotto.join()}</span>
              </div>`;
    })
    .join('');
};

$lottoPaidSwitch.addEventListener('click', (e) => {
  e.preventDefault();

  $lottoPaidCheckBox.checked = !$lottoPaidCheckBox.checked;
  toggleLottoPaidCards();
});

const toggleLottoPaidCards = () => {
  const $lottoPaidCardNumbers = document.querySelectorAll('.lotto-paid-card-numbers');

  toggleLottoPaidCardsLayout();
  $lottoPaidCardNumbers.forEach((elm) => elm.classList.toggle('d-none'));
};

const toggleLottoPaidCardsLayout = () => {
  $lottoPaidCards.classList.toggle('flex-col');
  $lottoPaidCards.classList.toggle('flex-row');
};

const resetPaidSection = () => {
  $lottoPaidCheckBox.checked = false;
  $lottoPaidCards.classList.remove('flex-col');
  $lottoPaidCards.classList.add('flex-row');
};

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
