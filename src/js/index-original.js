const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const $showResultButton = $('.open-result-modal-button')
const $modalClose = $('.modal-close')
const $modal = $('.modal')
const $lottoNumbersToggleButton = $(
  '.lotto-numbers-toggle-button'
)
const $submitButton = $('.btn-cyan')
const $purchaseMount = $('#purchaseMount')
const $purchaseForm = $('#purchaseForm')
const $purchaseAmount = $('#purchaseAmount')
const $lottoTickets = $('#lottoTickets')
const $lottoTicketsAndNumbers = $('#lottoTicketsAndNumbers')

const eleLottoTicket = '<span class="mx-1 text-4xl">🎟️ </span>'
const eleLottoTicketAndNumbers = numbers => `<div class="mx-1 text-4xl d-flex items-center">🎟️ <span class="mx-3 text-xl">${numbers.join(', ')}</span></div>`

const onModalShow = () => {
  $modal.classList.add('open')
}
const onModalClose = () => {
  $modal.classList.remove('open')
}

const LOTTO_NUMBERS = []

const onSubmit = function(eve) {

  eve.preventDefault && eve.preventDefault();

  // 전역으로 관리할 Lotto 번호모음
  const money = $purchaseMount.value
  if(money < 1000) {
    alert('로또 구매에는 최소 1,000원 이상이 필요합니다')
    return
  }
  if(money > 100000) {
    alert('한 번에 10만원어치 이상은 구매할 수 없습니다')
    $purchaseMount.value = ''
    return
  }

  const purchaseCount = Math.floor(money / 1000)
  $purchaseMount.value = money - purchaseCount * 1000
  for (let i = 0; i < purchaseCount; i++) {
    LOTTO_NUMBERS.push(getLottoNumbers())
  }
  render();
}

const onToggle = (eve) => {
  if(eve.target.checked === true) {
    $lottoTicketsAndNumbers.classList.add('show');
    $lottoTickets.classList.remove('show');
  } else {
    $lottoTickets.classList.add('show');
    $lottoTicketsAndNumbers.classList.remove('show');
  }
}


function render() {
  $purchaseAmount.innerHTML = LOTTO_NUMBERS.length
  $lottoTickets.innerHTML = LOTTO_NUMBERS.reduce((lottos, lottoNumber) => {
    lottos += eleLottoTicket
    return lottos
  }, '')
  $lottoTicketsAndNumbers.innerHTML = LOTTO_NUMBERS.reduce((lottos, lottoNumber) => {
    lottos += eleLottoTicketAndNumbers(lottoNumber)
    return lottos
  }, '')

}

function getLottoNumbers() {
  const lottoSet = new Set()
  while(lottoSet.size < 6) {
    lottoSet.add(getRandomIntInclusive(1, 45))
  }
  return Array.from(lottoSet).sort((a, b) => a-b)
}

function getRandomIntInclusive(min = 1, max = 45) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}


$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
$submitButton.addEventListener('click', onSubmit)
$purchaseForm.addEventListener('submit', onSubmit)
$lottoNumbersToggleButton.addEventListener('click', onToggle)