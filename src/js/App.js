import LottoContainer from './components/LottoContainer'
import lottoConfig from './config/lotto.config'
import ClassName from './constants/ClassName'
import { CY_LOTTO_DETAIL } from './constants/CypressDom'
import ElementId, {
  LUCKY_LOTTO_CONTAINER,
  PURCHASE_INPUT,
  PURCHAED_LOTTO_AMOUNT_LABEL,
  LOTTO_ANSWER_INPUT,
  TOGGLE_BUTTON,
  PURCHASED_LOTTO_VIEWER,
  PURCHASED_LOTTO,
  BENEFIT_RATE_LABEL,
} from './constants/ElementId'
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
    this.#rootContainer = $('#' + LUCKY_LOTTO_CONTAINER)
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
  const money = Number($('#' + PURCHASE_INPUT).value)

  if (money === 0 || money % lottoService.lottoPrice !== 0) {
    alert(lottoService.lottoPrice + '원 단위로 입력해주세요.')
    return
  }

  const lottoAmount = money / lottoService.lottoPrice

  if (lottoAmount > lottoConfig.maxMyLottoLimit) {
    alert(MY_LOTTO_LIMIT_ERROR)
    $('#' + PURCHASE_INPUT).value = ''
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
  const LottoAnswer = $('#' + LOTTO_ANSWER_INPUT)

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
    '#' + BENEFIT_RATE_LABEL
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
  const isVisible = $('#' + TOGGLE_BUTTON).checked

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
  const toggleButton = $('#' + TOGGLE_BUTTON)
  const purchaseButton = $('#' + PURCHASE_INPUT)
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

  $('#' + PURCHAED_LOTTO_AMOUNT_LABEL).innerText = `총 0개를 구매하였습니다.`

  $('#' + PURCHASED_LOTTO_VIEWER).innerHTML = ''

  if (toggleButton.checked) {
    toggleLottoVisible(isVisible)
    toggleButton.checked = false
  }
}

function setLottoVisible(visible) {
  if (visible) {
    $('#' + PURCHASED_LOTTO).classList.remove(ClassName.displayNone)
    $('#' + LOTTO_ANSWER_INPUT).classList.remove(ClassName.displayNone)
    return
  }

  $('#' + PURCHASED_LOTTO).classList.add(ClassName.displayNone)
  $('#' + LOTTO_ANSWER_INPUT).classList.add(ClassName.displayNone)
}

function handlePurchaseLotto(lottoNumbers) {
  const template = (numbers) => {
    return `
      <li class="mx-1 text-4xl lotto-wrapper">
      <span class="lotto-icon">🎟️ </span>
      <span class="lotto-detail" style="display: none;" data-test-element="${CY_LOTTO_DETAIL}"">${numbers.reduce(
      (a, b) => a + ', ' + b
    )}</span>
      </li>
    `
  }

  $('#' + PURCHASED_LOTTO_VIEWER).innerHTML = `${lottoNumbers
    .map((lottoNumber) => template(lottoNumber))
    .join('')}`

  $(
    '#' + PURCHAED_LOTTO_AMOUNT_LABEL
  ).innerText = `총 ${lottoNumbers.length}개를 구매하였습니다.`

  $('#' + PURCHAED_LOTTO_AMOUNT_LABEL).dataset.count = lottoNumbers.length
}
