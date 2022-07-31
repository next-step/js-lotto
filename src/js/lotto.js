import { addEvent } from '../utils/addEvent.js'
import { querySelector, querySelectorAll } from '../utils/querySelector.js'
import { showLottoForm, updateLottoResultForm } from './lottoView.js'

const LOTTO_PER_MONEY = 1000

const getLottoTicket = () => {
  const $priceInput = querySelector('input[name=lottoPriceInput]')
  return $priceInput.value / LOTTO_PER_MONEY
}

const getLottoNumber = () => {
  const lottoNumbers = []

  while (lottoNumbers.length < 7) {
    const number = Math.floor(Math.random() * 100) + 1

    if (lottoNumbers.indexOf(number) === -1) {
      lottoNumbers.push(number)
    }
  }

  return lottoNumbers
}

const checkValidate = () => {
  if (!isPriceInteger()) {
    alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.')
    return false
  }

  return true
}

const isPriceInteger = () => {
  const $priceInput = querySelector('input[name=lottoPriceInput]')
  const price = Number($priceInput.value)

  if (price >= LOTTO_PER_MONEY) {
    return Number.isInteger(price / LOTTO_PER_MONEY)
  }
}

const handleSubmitButton = (e) => {
  e.preventDefault()

  if (!checkValidate()) {
    return
  }

  const lottoTicket = getLottoTicket()

  showLottoForm()
  updateLottoResultForm(lottoTicket)
}

const handleToggle = (e) => {
  const isChecked = e.target.checked
  const $lottoNumbers = querySelectorAll('span[name="lottoNumbers"]')

  if (isChecked) {
    $lottoNumbers.forEach((el) => (el.style = 'visibility: visible'))
  } else {
    $lottoNumbers.forEach((el) => (el.style = 'visibility: hidden'))
  }
}

const handlers = () => {
  addEvent('submit', '#lottoPriceForm', handleSubmitButton)
  addEvent('change', '.lotto-numbers-toggle-button', handleToggle)
}

const init = () => {
  handlers()
}

init()

export { getLottoNumber }
