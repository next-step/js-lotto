import el from './dom.js'
import Controller from './controller.js'
import View from './view/index.js'
import FormPriceClass from './view/formPrice.js'
import FormDetailsClass from './view/formDetails/index.js'
import FormWinningClass from './view/formWinning.js'
import ModalStatsClass from './view/modalStats.js'

export default class App extends View {
  static #template = `
  <div id="app" class="p-3">
    <div class="d-flex justify-center mt-5">
      <div class="w-100">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <form-price></form-price>
        <form-details></form-details>
        <form-winning></form-winning>
      </div>
    </div>
    <modal-stats></modal-stats>
  </div>
  `

  $formPriceView
  $formDetailsView
  $formWinningView
  $modalStatsView

  constructor() {
    super()
    const $app = el(App.#template)

    this.$formPriceView = $app.querySelector('form-price') as HTMLElement & FormPriceClass
    this.$formDetailsView = $app.querySelector('form-details') as HTMLElement & FormDetailsClass
    this.$formWinningView = $app.querySelector('form-winning') as HTMLElement & FormWinningClass
    this.$modalStatsView = $app.querySelector('modal-stats') as HTMLElement & ModalStatsClass

    el(this, [$app])

    new Controller(this)
  }
}

customElements.define('form-price', FormPriceClass)
customElements.define('form-details', FormDetailsClass)
customElements.define('form-winning', FormWinningClass)
customElements.define('modal-stats', ModalStatsClass)
customElements.define('lotto-app', App)
