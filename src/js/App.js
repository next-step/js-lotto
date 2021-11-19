import LottoContainer from './components/LottoContainer'
import lottoConfig from './config/lotto.config'
import ClassName from './constants/ClassName'
import CypressDom from './constants/CypressDom'
import ElementId from './constants/ElementId'
import Event from './constants/Event'
import EventType from './constants/EventType'
import {
  LOTTO_NUMBER_DUPLICATED_ERROR,
  LOTTO_NUMBER_EMPTY_ERROR,
  LOTTO_NUMBER_OUT_OF_RANGE_ERROR,
  MY_LOTTO_LIMIT_ERROR,
} from './constants/Message'
import { BASE_LOTTO_NUMBERS, BONUS_LOTTO_NUMBER } from './constants/DomName'
import LottoService from './service/LottoService'
import { $ } from './utils/dom'

const clickEventMapper = {
  [EventType.purchase]: (lottoService) => onLottoPurchase(lottoService),
  [EventType.checkMyLottoResult]: (lottoService) =>
    onCheckMyLottoResult(lottoService),
  [EventType.toggleMyLotto]: () => onToggleMyLottoNumber(),
  [EventType.resetGame]: (lottoService) => resetGame(lottoService),
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

    $('.modal').addEventListener(Event.onClick, (event) => {
      const clickEvent = event.target.dataset.event

      if (!clickEvent) {
        return
      }

      if (clickEvent !== EventType.resetGame) {
        return
      }

      clickEventMapper[clickEvent](this.#lottoService)
    })
  }
}

function onLottoPurchase(lottoService) {
  const money = Number($('#' + ElementId.purchaseInput).value)

  if (money === 0 || money % lottoService.lottoPrice !== 0) {
    alert(lottoService.lottoPrice + '원 단위로 입력해주세요.')
    return
  }

  const lottoAmount = money / lottoService.lottoPrice

  if (lottoAmount > lottoConfig.maxMyLottoLimit) {
    alert(MY_LOTTO_LIMIT_ERROR)
    $('#' + ElementId.purchaseInput).value = ''
    lottoService.initService()
    resetUI()
    return
  }

  resetUI()
  lottoService.autoPurchase(lottoAmount)

  setLottoVisible(true)

  handlePurchaseLotto(lottoService.myLottos)
}

function onCheckMyLottoResult(lottoService) {
  const LottoAnswer = $('#' + ElementId.lottoAnswerInput)

  const answer = new FormData(LottoAnswer)

  const base = answer.getAll(BASE_LOTTO_NUMBERS).map((number) => Number(number))

  const bonus = Number(answer.get(BONUS_LOTTO_NUMBER))

  const lottoValidation = validateLottoAnswer(base, bonus)

  console.log(lottoValidation)
  if (lottoValidation.error) {
    alert(lottoValidation.message)
    return
  }

  lottoService.lottoAnswer = { base, bonus }
  const benefitResult = lottoService.calcLottoBenefit()

  document.querySelectorAll('td[data-rank-label]').forEach((node) => {
    const count = benefitResult.rank[Number(node.dataset.rankLabel)] || 0

    node.innerText = count + '개'
  })

  $(
    '#' + ElementId.benefitRateLabel
  ).innerText = `당신의 총 수익률은 ${benefitResult.benefitRate}%입니다.`

  $('.modal').classList.add('open')
}

function isLottoNumberOutOfRange(base, bonus) {
  if (!IsValidLottoNumber(bonus)) {
    return true
  }

  for (const baseNumber of base) {
    if (!IsValidLottoNumber(baseNumber)) {
      return true
    }
  }

  return false
}

function isLottoNumberDuplicated(base, bonus) {
  const lottoLength = base.length + 1
  const numberSet = new Set()

  numberSet.add(bonus)

  for (const baseNumber of base) {
    numberSet.add(baseNumber)
  }

  console.log(base)
  console.log(lottoLength)
  console.log(numberSet)
  console.log(numberSet.size !== lottoLength)

  return numberSet.size !== lottoLength
}

function isLottoNumberEmpty(base, bonus) {
  if (!bonus) {
    return true
  }

  for (const baseNumber of base) {
    if (!baseNumber) {
      return true
    }
  }

  return false
}

function validateLottoAnswer(base, bonus) {
  if (isLottoNumberEmpty(base, bonus)) {
    return { error: true, message: LOTTO_NUMBER_EMPTY_ERROR }
  }

  if (isLottoNumberOutOfRange(base, bonus)) {
    return { error: true, message: LOTTO_NUMBER_OUT_OF_RANGE_ERROR }
  }

  if (isLottoNumberDuplicated(base, bonus)) {
    return { error: true, message: LOTTO_NUMBER_DUPLICATED_ERROR }
  }

  return { error: false }
}

function IsValidLottoNumber(number) {
  if (number >= 0 && number < lottoConfig.maxLottoNumber) {
    return true
  }

  return false
}

function onToggleMyLottoNumber() {
  const isVisible = $('#' + ElementId.toggleButton).checked

  toggleLottoVisible(isVisible)
}

function toggleLottoVisible(visible) {
  const details = document.querySelectorAll('.lotto-detail')

  details.forEach((detail) => {
    detail.style.display = visible ? '' : 'none'
  })
}

function resetGame(lottoService) {
  lottoService.initService()
  resetUI()
}

function resetUI() {
  const modal = document.querySelector('.modal')
  const toggleButton = $('#' + ElementId.toggleButton)
  const purchaseButton = $('#' + ElementId.purchaseInput)
  const isVisible = toggleButton.checked

  setLottoVisible(false)

  modal.classList.remove('open')
  purchaseButton.value = ''
  purchaseButton.focus()

  document
    .getElementsByName(BASE_LOTTO_NUMBERS)
    .forEach((el) => (el.value = ''))
  document
    .getElementsByName(BONUS_LOTTO_NUMBER)
    .forEach((el) => (el.value = ''))

  $(
    '#' + ElementId.purchasedLottoAmountLabel
  ).innerText = `총 0개를 구매하였습니다.`

  $('#' + ElementId.purchasedLottoViewer).innerHTML = ''

  if (toggleButton.checked) {
    toggleLottoVisible(isVisible)
    toggleButton.checked = false
  }
}

function setLottoVisible(visible) {
  if (visible) {
    $('#' + ElementId.purchasedLotto).classList.remove(ClassName.displayNone)
    $('#' + ElementId.lottoAnswerInput).classList.remove(ClassName.displayNone)
    return
  }

  $('#' + ElementId.purchasedLotto).classList.add(ClassName.displayNone)
  $('#' + ElementId.lottoAnswerInput).classList.add(ClassName.displayNone)
}

function handlePurchaseLotto(lottoNumbers) {
  const template = (numbers) => {
    return `
      <li class="mx-1 text-4xl lotto-wrapper">
      <span class="lotto-icon">🎟️ </span>
      <span class="lotto-detail" style="display: none;" data-test-element="${
        CypressDom.lottoDetail
      }"">${numbers.reduce((a, b) => a + ', ' + b)}</span>
      </li>
    `
  }

  $('#' + ElementId.purchasedLottoViewer).innerHTML = `${lottoNumbers
    .map((lottoNumber) => template(lottoNumber))
    .join('')}`

  $(
    '#' + ElementId.purchasedLottoAmountLabel
  ).innerText = `총 ${lottoNumbers.length}개를 구매하였습니다.`

  $('#' + ElementId.purchasedLottoAmountLabel).dataset.count =
    lottoNumbers.length
}
