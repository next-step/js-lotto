import App from './index.js'
import model from './model.js'

export default class Controller {
  constructor(app: App) {
    app.$purchasedInfoView.hide()
    app.$formWinningView.hide()

    app.on('submit@FormPrice', ({ detail }: CustomEvent) => {
      const data = model.setAllLottoRandom(detail.price)
      app.$purchasedInfoView.onPurchased(data).show()
      app.$formWinningView.show()
    })
  }
}
