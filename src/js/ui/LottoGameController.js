import LottoGameView from './LottoGameView.js'
import LottoVendingMachine from '../domain/LottoVendingMachine.js'
import LottoWinningCalculator from '../domain/LottoWinningCalculator.js'
import LottoWinningNumbers from '../domain/LottoWinningNumbers.js'
import { PROMPT } from '../../constants/prompt.js'

class LottoGameController {
  #view
  #vendingMachine
  #winningCalculator

  constructor(
    view = new LottoGameView(),
    vendingMachine = new LottoVendingMachine(),
    winningCalculator = new LottoWinningCalculator(),
  ) {
    this.#view = view
    this.#vendingMachine = vendingMachine
    this.#winningCalculator = winningCalculator
  }

  async run() {
    // 금액을 입력받아 로또를 구매한다.
    const purchasedLottoList = await this.purchaseAndIssueLottos()
    // 로또 번호를 입력받아 당첨 번호를 설정한다.
    const lottoWinningNumbers = await this.setWinningNumbers()
    // 로또 당첨 결과를 계산한다.
    const result = this.calculateResults(
      lottoWinningNumbers,
      purchasedLottoList,
    )
    // 당첨 결과를 출력한다.
    this.printResult(result)
    process.exit()
  }

  async purchaseAndIssueLottos() {
    const purchaseAmount = await this.#view.getPurchaseAmount()

    this.#vendingMachine.purchase(purchaseAmount)
    const purchasedLottoList = this.#vendingMachine.lottos

    this.printPurchasedLottos(purchasedLottoList)

    return purchasedLottoList
  }

  async setWinningNumbers() {
    const selectedNums = (await this.#view.getLottoWinningNumbers()).split(',')
    const extraNum = await this.#view.getExtraNumber()

    return new LottoWinningNumbers({ selectedNums, extraNum })
  }

  calculateResults(lottoWinningNumbers, purchasedLottoList) {
    const purchasedLottoStatuses = this.getLottoStatus(
      lottoWinningNumbers.numbers,
      purchasedLottoList,
    )

    this.#winningCalculator.calculate(purchasedLottoStatuses)

    return this.#winningCalculator.result
  }

  printPurchasedLottos(purchasedLottoList) {
    this.#view.print(`\n${purchasedLottoList.length}개를 구매했습니다.`)

    purchasedLottoList.forEach((lotto) => {
      const { selectedNums, extraNum } = lotto.numbers
      const numbers = [...selectedNums, extraNum].sort((a, b) => a - b)
      this.#view.print(numbers)
    })
  }

  printResult(result) {
    const formattedResult = this.formatLottoResults(result)
    this.#view.print(formattedResult)
  }

  getLottoStatus(lottoWinningNumbers, purchasedLottoList) {
    return purchasedLottoList.map((lotto) => {
      lotto.setStatus(lottoWinningNumbers)
      return lotto.status
    })
  }

  formatLottoResults(result) {
    const HEADER = '\n당첨 통계\n----------------------\n'
    const FOOTER = `총 수익률은 ${result.profitRate}%입니다.`
    const mapping = new Map([
      [3, PROMPT.LOTTO_MATCHING_RESULTS[3]],
      [4, PROMPT.LOTTO_MATCHING_RESULTS[4]],
      [5, PROMPT.LOTTO_MATCHING_RESULTS[5]],
      [5.5, PROMPT.LOTTO_MATCHING_RESULTS[5.5]],
      [6, PROMPT.LOTTO_MATCHING_RESULTS[6]],
    ])

    const output = Array.from(mapping.keys()).reduce((acc, key) => {
      return `${acc}${mapping.get(key)} - ${result[key]}개\n`
    }, '')

    return `${HEADER}${output}${FOOTER}`
  }
}

export default LottoGameController
