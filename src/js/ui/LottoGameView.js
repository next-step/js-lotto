import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

class LottoGameView {
  constructor() {
    this.rl = readline.createInterface({
      input,
      output,
    })
  }

  async getPurchaseAmount() {
    return await this.#getUserInput('> 구입금액을 입력해 주세요. ')
  }

  async getLottoWinningNumbers() {
    return await this.#getUserInput('> 당첨 번호를 입력해 주세요. ')
  }

  async getExtraNumber() {
    return await this.#getUserInput('> 보너스 번호를 입력해 주세요. ')
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
