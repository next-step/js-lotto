import LottoVendingMachine from '../domain/LottoVendingMachine.js'
import LottoWinningCalculator from '../domain/LottoWinningCalculator.js'
import LottoWinningNumbers from '../domain/LottoWinningNumbers.js'

class LottoGameController {
  #view
  #vendingMachine
  #winningCalculator

  constructor(
    view,
    vendingMachine = new LottoVendingMachine(),
    winningCalculator = new LottoWinningCalculator(),
  ) {
    this.#view = view
    this.#vendingMachine = vendingMachine
    this.#winningCalculator = winningCalculator
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

  printResult(result) {
    this.#view.printResult(result)
  }
}

export default LottoGameController
