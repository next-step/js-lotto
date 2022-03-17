const $ = selector => document.querySelector(selector);

const $showResultButton = $('.open-result-modal-button')
const $modalClose = $('.modal-close')
const $modal = $('.modal')
const $lottoNumbersToggleButton = $('.lotto-numbers-toggle-button')
const $lottoPurchaseForm = $('.lotto-purchase-form');

const lottoPurchase = () => {
  const $lottoPurchaseInput = $('.lotto-purchase-input');
  const $lottoPurchaseBtn = $('.lotto-purchase-btn');
  
  const validateLottoPurchaseAmount = (amount) => {
    if (amount % 1000 !== 0 && Number(amount) > 1000) {
      $lottoPurchaseInput.value = ""
      alert('로또 구입 금액을 1,000원 단위로 입력해 주세요')
    }
  }

  $lottoPurchaseForm.addEventListener('submit', (event) => {
    event.preventDefault()
  })
  
  $lottoPurchaseInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && event.target.value !== "") {
      validateLottoPurchaseAmount(event.target.value)
    }
  })
  
  $lottoPurchaseBtn.addEventListener('click', (event) => {
    validateLottoPurchaseAmount($lottoPurchaseInput.value)
  })
}

lottoPurchase()


const onModalShow = () => {
  $modal.classList.add('open')
}

const onModalClose = () => {
  $modal.classList.remove('open')
}

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
