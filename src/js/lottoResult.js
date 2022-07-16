import { getLottoNumber } from '../utils/getLottoNumber.js'

const $lottoResultList = document.querySelector('#lottoResultList')
const $lottoResultSwitch = document.querySelector(
  '.lotto-numbers-toggle-button'
)

const updateLottoResultForm = (count) => {
  setLottoCountText(count)
  renderLottto(count)
}

const handleToggle = (e) => {
  const isChecked = e.target.checked
  const $lottoNumbers = document.querySelectorAll('span[name="lottoNumbers"]')

  if (isChecked) {
    $lottoNumbers.forEach((el) => (el.style = 'display: inline-block'))
  } else {
    $lottoNumbers.forEach((el) => (el.style = 'display: none'))
  }
}

const setLottoCountText = (count) => {
  const $lottoCountLabel = document.querySelector('#lottoCountLabel')
  $lottoCountLabel.innerHTML = `총 ${count}개를 구매하였습니다.`
}

const renderLottto = (count) => {
  let dom = ''

  for (let i = 0; i < count; i++) {
    dom += `<span class="mx-1 text-4xl">🎟️ <span name="lottoNumbers" style="display: none">${getLottoNumber()}</span></span>`
  }

  $lottoResultList.innerHTML = dom
}

$lottoResultSwitch.addEventListener('change', handleToggle)

export { updateLottoResultForm }
