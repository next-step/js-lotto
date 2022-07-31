import { getLottoNumber } from './lotto.js'
import { querySelector } from '../utils/querySelector.js'

const showLottoForm = () => {
  const $lottoResultForm = querySelector('#lottoResultForm')
  const $lottoNumberForm = querySelector('#lottoNumberForm')

  $lottoResultForm.style.display = 'block'
  $lottoNumberForm.style.display = 'block'
}

const updateLottoResultForm = (count) => {
  renderLottoCountText(count)

  const lottoTicket = makeLottoTicket(count)
  renderLotttoTicket(lottoTicket)
}

const renderLottoCountText = (count) => {
  const $lottoCountLabel = querySelector('#lottoCountLabel')
  $lottoCountLabel.innerHTML = `총 ${count}개를 구매하였습니다.`
}

const makeLottoTicket = (count) => {
  let dom = ''

  for (let i = 0; i < count; i++) {
    dom += `<span class="mx-1 text-4xl">🎟️ <span name="lottoNumbers" style="display: none">${getLottoNumber()}</span></span>`
  }

  return dom
}

const renderLotttoTicket = (lottoTicket) => {
  const $lottoTicket = querySelector('#lottoTicket')
  $lottoTicket.innerHTML = lottoTicket
}

export { showLottoForm, updateLottoResultForm }
