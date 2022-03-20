import Lotto from './models/lotto';

const lotto = new Lotto();

const $lottoPayForm = document.querySelector('[data-target="lotto-pay-form"]');
const $lottoPayInput = $lottoPayForm.querySelector('input');

const $lottoPaidSection = document.querySelector('[data-target="lotto-paid-section"]');
const $lottoPaidCounts = document.querySelector('[data-target="lotto-paid-counts"]');
const $lottoPaidSwitch = document.querySelector('[data-target="lotto-paid-switch"]');
const $lottoPaidCheckBox = $lottoPaidSwitch.querySelector('input');
const $lottoPaidCards = document.querySelector('[data-target="lotto-paid-cards"]');

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

$lottoPayForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const lottos = Lotto.pay($lottoPayInput.value);

  if (lottos === undefined) $lottoPayForm.reset();
  else {
    renderPaidSectionItems(lottos);
    resetPaidSection();
  }
});

const renderPaidSectionItems = (lottos) => {
  $lottoPaidSection.style.visibility = 'visible';
  $lottoPaidCounts.innerHTML = lottos.length;
  $lottoPaidCards.innerHTML = lottos
    .map((lotto) => {
      return `<div class="d-flex items-center mx-1 text-4xl" data-target="lotto-paid-card">
                <div>🎟️</div> 
                <span class="d-none text-xl ml-3" data-target="lotto-paid-card-numbers">${lotto.join()}</span>
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
  const $lottoPaidCardNumbers = document.querySelectorAll(
    '[data-target="lotto-paid-card-numbers"]',
  );

  toggleLottoPaidCardsLayout();
  $lottoPaidCardNumbers.forEach((elm) => elm.classList.toggle('d-none'));
};

const toggleLottoPaidCardsLayout = () => {
  $lottoPaidCards.classList.toggle('flex-col');
  $lottoPaidCards.classList.toggle('flex-row');
};

const resetPaidSection = () => {
  if ($lottoPaidCheckBox.checked) {
    $lottoPaidCheckBox.checked = false;
    toggleLottoPaidCardsLayout();
  }
};

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
