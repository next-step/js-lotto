const $ = selector => document.querySelector(selector);

const $lottoPurchaseForm = $('.lotto-purchase-form');
const $ticketSection = $('#purchased-lottos');
const $winningNumbersForm = $('#lotto-winning-numbers-form');

const lottoPurchase = () => {
  const $lottoPurchaseInput = $('.lotto-purchase-input');
  const $lottoPurchaseBtn = $('.lotto-purchase-btn');
  
  const passValidatitonLottoPurchaseAmount = amount => {
    amount = Number(amount)

    if (amount < 1000 || amount >= 1000000) return false

    if (amount % 10 !== 0) {
      $lottoPurchaseInput.value = ""
      alert('로또 구입 금액을 1,000원 단위로 입력해 주세요')
      return false
    }

    return true
  }

  $lottoPurchaseForm.addEventListener('submit', event => {
    event.preventDefault()
  })
  
  $lottoPurchaseInput.addEventListener('keypress', event => {
    if (event.key === 'Enter' && event.target.value !== "") {
      if (passValidatitonLottoPurchaseAmount(event.target.value)) {
        $ticketSection.style.display = "block"
        $winningNumbersForm.style.display = "block"
      }
    }
  })
  
  $lottoPurchaseBtn.addEventListener('click', () => {
    if (passValidatitonLottoPurchaseAmount($lottoPurchaseInput.value)) {
      $ticketSection.style.display = "block"
      $winningNumbersForm.style.display = "block"
    }
  })
}

lottoPurchase()

// $ticketSection
// $winningNumbersForm

const $showResultButton = $('.open-result-modal-button');
const $modalClose = $('.modal-close');
const $modal = $('.modal');
const $lottoNumbersToggleButton = $('.lotto-numbers-toggle-button');





const onModalShow = () => {
  $modal.classList.add('open')
}

const onModalClose = () => {
  $modal.classList.remove('open')
}

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
