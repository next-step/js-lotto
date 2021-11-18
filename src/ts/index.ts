import el from './dom.js'
import Controller from './controller.js'
import View from './view/index.js'
import FormPriceClass from './view/formPrice.js'
import PurchasedInfoClass from './view/purchasedInfo.js'
import FormWinningClass from './view/formWinning.js'
import ModalStatsClass from './view/modalStats.js'

export default class App extends View {
  tag = '[View - App]'
  $formPriceView
  $purchasedInfoView
  $formWinningView
  $modalStatsView

  constructor() {
    super()
    const [FormPrice, PurchasedInfo, FormWinning, ModalStats] = [
      customElements.get('form-price'),
      customElements.get('purchased-info'),
      customElements.get('form-winning'),
      customElements.get('modal-stats'),
    ] as CustomElementConstructor[]

    this.$formPriceView = new FormPrice() as HTMLElement & FormPriceClass
    this.$purchasedInfoView = new PurchasedInfo() as HTMLElement & PurchasedInfoClass
    this.$formWinningView = new FormWinning() as HTMLElement & FormWinningClass
    this.$modalStatsView = new ModalStats() as HTMLElement & ModalStatsClass

    el(this, [
      el('<div id="app" class="p-3">', [
        el('<div class="d-flex justify-center mt-5">', [
          el('<div class="w-100">', [
            '<h1 class="text-center">🎱 행운의 로또</h1>',
            this.$formPriceView,
            this.$purchasedInfoView,
            this.$formWinningView,
          ]),
        ]),
        this.$modalStatsView,
      ]),
    ])

    new Controller(this)
  }
}

customElements.define('form-price', FormPriceClass)
customElements.define('purchased-info', PurchasedInfoClass)
customElements.define('form-winning', FormWinningClass)
customElements.define('modal-stats', ModalStatsClass)
customElements.define('lotto-app', App)
