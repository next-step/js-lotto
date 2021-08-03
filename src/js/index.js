import { App } from './app.js'
import { replaceSelectorToDOM } from './utils/dom.js'

const app = new App()
replaceSelectorToDOM('#app', app.$target)
app.setChildren()

// const $showResultButton = document.querySelector('.open-result-modal-button')
// const $modalClose = document.querySelector('.modal-close')

// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
