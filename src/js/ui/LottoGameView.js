import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { PROMPT } from '../../constants/prompt.js'

class LottoGameView {
  constructor() {
    this.rl = readline.createInterface({
      input,
      output,
    })
  }

  async getPurchaseAmount() {
    return await this.#getUserInput(PROMPT.PURCHASE_AMOUNT)
  }

  async getLottoWinningNumbers() {
    return await this.#getUserInput(PROMPT.LOTTO_WINNING_NUMBERS)
  }

  async getExtraNumber() {
    return await this.#getUserInput(PROMPT.EXTRA_NUMBER)
  }

  async #getUserInput(prompt) {
    const userInput = await this.rl.question(prompt)
    return userInput
  }

  print(prompt) {
    console.log(prompt)
  }
}

export default LottoGameView
