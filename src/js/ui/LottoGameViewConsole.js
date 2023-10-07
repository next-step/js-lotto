import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { PROMPT } from '../../constants/prompt.js'
import LottoGameView from './LottoGameView.js'

class LottoGameViewConsole extends LottoGameView {
  constructor() {
    super()
    this.rl = readline.createInterface({
      input,
      output,
    })
  }

  async getPurchaseAmount() {
    return this.#getUserInput(PROMPT.PURCHASE_AMOUNT)
  }

  async getLottoWinningNumbers() {
    const selectedNums = await this.#getUserInput(PROMPT.LOTTO_WINNING_NUMBERS)
    const extraNum = await this.#getUserInput(PROMPT.EXTRA_NUMBER)

    return { selectedNums: selectedNums.split(','), extraNum }
  }

  async getRestart() {
    return this.#getUserInput(PROMPT.RESTART)
  }

  async #getUserInput(prompt) {
    const userInput = await this.rl.question(prompt)
    return userInput
  }

  printPurchasedLottos(purchasedLottoList) {
    this.print(`\n${purchasedLottoList.length}개를 구매했습니다.`)

    purchasedLottoList.forEach((lotto) => {
      const { selectedNums, extraNum } = lotto.numbers
      const numbers = [...selectedNums, extraNum].sort((a, b) => a - b)
      this.print(numbers)
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

  printResult(result) {
    const formattedResult = this.formatLottoResults(result)
    this.print(formattedResult)
  }

  print(prompt) {
    console.log(prompt)
  }
}

export default LottoGameViewConsole
