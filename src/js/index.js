import { lottoTicket } from "./ticket.js";
import { $ } from "./consts.js";

const lottoPurchase = () => {
  const $lottoPurchaseForm = $('.lotto-purchase-form');  

  $lottoPurchaseForm.addEventListener('submit', event => {
    event.preventDefault()
  })

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


  const $ticketSection = $('#purchased-lottos');
  const $winningNumbersForm = $('#lotto-winning-numbers-form');
  const tagsVisibleWhenValidationPasses = [$ticketSection, $winningNumbersForm]

  $lottoPurchaseInput.addEventListener('keydown', (event) => {
    if (event.isComposing) return;
    
    if (event.key === 'Enter' && event.target.value !== "") {
      if (passValidatitonLottoPurchaseAmount(event.target.value)) {
        tagsVisibleWhenValidationPasses.map(tag => tag.style.display = "block")
        lottoTicket(event.target.value)
      }
    }
  })

  $lottoPurchaseBtn.addEventListener('click', () => {
    if (passValidatitonLottoPurchaseAmount($lottoPurchaseInput.value)) {
      tagsVisibleWhenValidationPasses.map(tag => tag.style.display = "block")
      lottoTicket($lottoPurchaseInput.value)
    }
  })


}

lottoPurchase()





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
