// import app from "./app.js"

// const $showResultButton = document.querySelector('.open-result-modal-button')
// const $modalClose = document.querySelector('.modal-close')
// const $modal = document.querySelector('.modal')
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// )

// const onModalShow = () => {
//   $modal.classList.add('open')
// }

// const onModalClose = () => {
//   $modal.classList.remove('open')
// }

// // $showResultButton.addEventListener('click', onModalShow)
// // $modalClose.addEventListener('click', onModalClose)

import App from "./app.js";
import Subject from "./core/Subject.js";
import Modal from "./pages/modal.js";
import { STEP_NUMBER } from "./utils/constants.js"
import { section } from "./utils/htmlElementCreator.js"



const subject = new Subject({
  store: {
    lottoArr : [],
    step: STEP_NUMBER.FIRST,
    lastWinningLottoNum : [],
    purchaseAmount:0,
    checked : false
  },
  initFn: (modal) => {
    modal.store.lottoArr = []
    modal.store.lastWinningLottoNum = []
    modal.store.purchaseAmount = 0
    modal.store.step = STEP_NUMBER.FIRST
  }
})

const app = new App({component : document.querySelector("#app")}, subject)
const modal = new Modal({component: section({id: "modal-component", class: "modal", role: "dialog", ariaModal: "true", ariaLabelledby:"title-dialog"})}, subject)

subject.subscribe({observer: app, state: [""]})
subject.subscribe({observer: modal, state: ["lottoArr", "lastWinningLottoNum", "step"]})

document.querySelector("#app").appendChild(modal.$component)