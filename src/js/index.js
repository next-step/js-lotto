import { LottoMachine } from './modules/LottoMachine.js'
import { LOTTO_MACHINE_CONFIG } from './constant.js'
import './components/lotto.js'

const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')
const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button')

const onModalShow = () => $modal.classList.add('open')
const onModalClose = () => $modal.classList.remove('open')

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)

// ==========================================================================================

export const lottoMachine = new LottoMachine(LOTTO_MACHINE_CONFIG).init()
