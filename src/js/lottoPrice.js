const $lottoPriceForm = document.querySelector('#lottoPriceForm')
const $lottoPriceInput = document.querySelector('input[name="lottoPriceInput"]')

const $lottoResult = document.querySelector('#lottoResult')
const $lottoNumberForm = document.querySelector('#lottoNumberForm')

const PREFIX = 1000

const handleFormSubmit = (e) => {
  e.preventDefault()

  if (!checkValidate()) {
    return
  }

  updateStyle()
}

const checkValidate = () => {
  if (!isPriceValidate()) {
    alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.')
    return false
  }

  return true
}

const isPriceValidate = () => {
  const price = Number($lottoPriceInput.value)

  if (price >= PREFIX) {
    return Number.isInteger(price / PREFIX)
  }
}

const updateStyle = () => {
  if (isPriceValidate) {
    $lottoResult.style.display = 'block'
    $lottoNumberForm.style.display = 'block'
  }
}

$lottoPriceForm.addEventListener('submit', handleFormSubmit)
