import { lottoTicket } from "./ticket.js";
import { $ } from "./consts.js";

const lottoPurchase = () => {
  const $lottoPurchaseForm = $('.lotto-purchase-form');  

  $lottoPurchaseForm.addEventListener('submit', event => {
    event.preventDefault()
  })

  const $lottoPurchaseInput = $('.lotto-purchase-input');
  const $lottoPurchaseBtn = $('.lotto-purchase-btn');

  const tagsVisibleWhenValidationPasses = [$('#purchased-lottos'), $('#lotto-winning-numbers-form')]
  const passValidatitonLottoPurchaseAmount = amount => {
    amount = Number(amount)


    if (amount < 1000 || amount >= 1000000) {
      tagsVisibleWhenValidationPasses.map(tag => { 
          if (tag.style.display === "block") tag.style.display = 'none'
        }
      )
      return false
    }

    if (amount % 1000 !== 0) {
      $lottoPurchaseInput.value = ""
      alert('로또 구입 금액을 1,000원 단위로 입력해 주세요')
      tagsVisibleWhenValidationPasses.map(tag => { 
          if (tag.style.display === "block") tag.style.display = 'none'
        }
      )
      return false
    }

    return true
  }

  const $toggle = $('.lotto-numbers-toggle-button');
  const $ticketContainer = $('ul[data-ticket]')
  const hideToggleWhenResubmitting = () => {
    if ($toggle) {
      $toggle.checked = false
      $ticketContainer.classList.remove('flex-col')
    }
  }

  $lottoPurchaseInput.addEventListener('keydown', (event) => {
    
    if (event.isComposing) return;
    
    if (event.key === 'Enter' && event.target.value !== "") {
      if (passValidatitonLottoPurchaseAmount(event.target.value)) {
        tagsVisibleWhenValidationPasses.map(tag => tag.style.display = "block")
        lottoTicket(event.target.value)
        hideToggleWhenResubmitting()
      }
    }
  })

  $lottoPurchaseBtn.addEventListener('click', () => {
    if (passValidatitonLottoPurchaseAmount($lottoPurchaseInput.value)) {
      tagsVisibleWhenValidationPasses.map(tag => tag.style.display = "block")
      lottoTicket($lottoPurchaseInput.value)
      hideToggleWhenResubmitting()
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
