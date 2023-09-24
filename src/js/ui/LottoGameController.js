import LottoVendingMachine from '../domain/LottoVendingMachine.js'
import LottoWinningCalculator from '../domain/LottoWinningCalculator.js'
import LottoWinningNumbers from '../domain/LottoWinningNumbers.js'
import { withRetry } from '../utils/withRetry.js'
import LottoGameViewConsole from './LottoGameViewConsole.js'

class LottoGameController {
  #view
  #vendingMachine
  #winningCalculator

  constructor(
    view = new LottoGameViewConsole(),
    vendingMachine = new LottoVendingMachine(),
    winningCalculator = new LottoWinningCalculator(),
  ) {
    this.#view = view
    this.#vendingMachine = vendingMachine
    this.#winningCalculator = winningCalculator
  }

  // FIXME: withRetry 를 view 에 맞게 주입받도록 변경하자
  async run() {
    try {
      const purchasedLottoList = await withRetry(
        this.purchaseAndIssueLottos.bind(this),
      )
      const lottoWinningNumbers = await withRetry(
        this.setWinningNumbers.bind(this),
      )
      const result = this.calculateResults(
        lottoWinningNumbers,
        purchasedLottoList,
      )

      this.#view.printResult(result)

      await this.restartOrEnd()
    } catch (error) {
      console.log(error)
    }
  }

  // TODO: 이 재시작 로직이 웹, 콘솔 구애받지 않고 실행될 수 있도록 하자.
  async restartOrEnd() {
    const action = await this.#view.getRestart()

    switch (action) {
      case 'y':
        this.run()
        break
      case 'n':
      // process.exit()
      default:
      // process.exit()
    }
  }

  async purchaseAndIssueLottos() {
    const purchaseAmount = await this.#view.getPurchaseAmount()

    this.#vendingMachine.purchase(purchaseAmount)
    const purchasedLottoList = this.#vendingMachine.lottos

    this.#view.printPurchasedLottos(purchasedLottoList)

    return purchasedLottoList
  }

  async setWinningNumbers() {
    const { selectedNums, extraNum } = await this.#view.getLottoWinningNumbers()

    return new LottoWinningNumbers({
      selectedNums: selectedNums,
      extraNum,
    })
  }

  calculateResults(lottoWinningNumbers, purchasedLottoList) {
    const purchasedLottoStatuses = this.getLottoStatus(
      lottoWinningNumbers.numbers,
      purchasedLottoList,
    )

    this.#winningCalculator.calculate(purchasedLottoStatuses)

    return this.#winningCalculator.result
  }

  getLottoStatus(lottoWinningNumbers, purchasedLottoList) {
    return purchasedLottoList.map((lotto) => {
      lotto.setStatus(lottoWinningNumbers)
      return lotto.status
    })
  }
}

export default LottoGameController
