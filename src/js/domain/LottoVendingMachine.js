import { ERROR_MESSAGE } from '../../constants/errorMessage.js'
import { generateLottoNumbers } from '../utils/generateLottoNumbers.js'
import { validate } from '../utils/validate.js'

class LottoVendingMachine {
  #purchaseAmount
  #issuedCount
  #lottos

  constructor() {}

  purchase(amount) {
    this.#validateAmount(amount)

    this.#purchaseAmount = amount
    this.#issuedCount = Math.floor(amount / 1000)

    this.#setLottos()
  }

  #setLottos() {
    this.#lottos = Array.from({ length: this.#issuedCount }).map((_) =>
      generateLottoNumbers(),
    )
  }

  #validateAmount(amount) {
    if (!(validate.isValidPositiveNumber(amount) && amount >= 1000))
      throw new Error(ERROR_MESSAGE.INVALID_AMOUNT)
  }

  get purchaseAmount() {
    return this.#purchaseAmount
  }

  get lottos() {
    return this.#lottos
  }
}

export default LottoVendingMachine
