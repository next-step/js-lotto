import LottoGameController from './js/ui/LottoGameController.js'
import LottoGameViewConsole from './js/ui/LottoGameViewConsole.js'
import { withRetry } from './js/utils/withRetry.js'

class App {
  #view
  #controller

  constructor() {
    this.#view = new LottoGameViewConsole()
    this.#controller = new LottoGameController(this.#view)
  }

  async run() {
    try {
      const purchasedLottoList = await withRetry(
        this.#controller.purchaseAndIssueLottos.bind(this.#controller),
      )
      const lottoWinningNumbers = await withRetry(
        this.#controller.setWinningNumbers.bind(this.#controller),
      )
      const result = this.#controller.calculateResults(
        lottoWinningNumbers,
        purchasedLottoList,
      )
      this.#controller.printResult(result)
      await this.restartOrEnd()
    } catch (error) {
      console.log(error)
    }
  }

  async restartOrEnd() {
    const action = await this.#view.getRestart()

    switch (action) {
      case 'y':
        this.run()
        break
      case 'n':
        process.exit()
      default:
        process.exit()
    }
  }
}

new App().run()
