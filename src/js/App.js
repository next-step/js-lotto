import LottoPurchaseInput from './components/LottoPurchaseInput'
import ElementId from './constants/ElementId'
import Event from './constants/Event'
import EventType from './constants/EventType'
import { $ } from './utils/dom'

const clickEventMapper = {
  [EventType.purchase]: () => onLottoPurchase(),
  [EventType.checkMyLottoResult]: () => onCheckMyLottoResult(),
  [EventType.toggleMyLotto]: () => onToggleMyLottoNumber(),
}

function onLottoPurchase() {
  console.log('I buy Lotto!')
}

function onCheckMyLottoResult() {
  console.log('Check my Lotto Result!')
}

function onToggleMyLottoNumber() {
  console.log('toggle my lotto status!')
}

export default class App {
  #rootContainer
  constructor() {
    this.#rootContainer = $('#' + ElementId.luckyLottoContainer)
    new LottoPurchaseInput(this.#rootContainer)

    this.setEvent()
  }

  setEvent() {
    this.#rootContainer.addEventListener(Event.onClick, (event) => {
      const clickEvent = event.target.dataset.event

      console.log(clickEvent)

      clickEventMapper[clickEvent]()
    })
  }
}
