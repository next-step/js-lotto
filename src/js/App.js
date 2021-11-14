import LottoContainer from './components/LottoContainer'
import ClassName from './constants/ClassName'
import ElementId from './constants/ElementId'
import Event from './constants/Event'
import EventType from './constants/EventType'
import LottoService from './service/LottoService'
import { $ } from './utils/dom'

const clickEventMapper = {
  [EventType.purchase]: (lottoService) => onLottoPurchase(lottoService),
  [EventType.checkMyLottoResult]: () => onCheckMyLottoResult(),
  [EventType.toggleMyLotto]: () => onToggleMyLottoNumber(),
}

function onLottoPurchase(lottoService) {
  console.log('I buy Lotto!')

  const money = Number($('#' + ElementId.purchaseInput).value)

  if (money === 0 || money % 1000 !== 0) {
    alert('1000원 단위로 입력해주세요.')
    return
  }

  const lottoAmount = money / 1000

  lottoService.autoPurchase(lottoAmount)

  document
    .getElementById(ElementId.purchasedLotto)
    .classList.remove(ClassName.displayNone)

  document
    .getElementById(ElementId.lottoAnswerInput)
    .classList.remove(ClassName.displayNone)
}

function onCheckMyLottoResult() {
  console.log('Check my Lotto Result!')
}

function onToggleMyLottoNumber() {
  console.log('toggle my lotto status!')
}

export default class App {
  #rootContainer
  #lottoService

  constructor() {
    this.#rootContainer = $('#' + ElementId.luckyLottoContainer)
    this.#lottoService = new LottoService()
    new LottoContainer(this.#rootContainer)

    this.setEvent()
  }

  setEvent() {
    this.#rootContainer.addEventListener(Event.onClick, (event) => {
      const clickEvent = event.target.dataset.event

      if (!clickEvent) {
        return
      }

      clickEventMapper[clickEvent](this.#lottoService)
    })
  }
}
