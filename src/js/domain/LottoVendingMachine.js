import { ERROR_MESSAGE } from '../../constants/errorMessage.js'
import { validate } from '../utils/validate.js'
import Lotto from '../domain/Lotto.js'

class LottoVendingMachine {
  #purchaseAmount
  #issuedCount
  #lottos
  static MIN_AMOUNT = 1000

  purchase(amount) {
    this.#validateAmount(amount)

    this.#purchaseAmount = amount
    this.#issuedCount = Math.floor(amount / LottoVendingMachine.MIN_AMOUNT)

    this.#setLottos()
  }

  #setLottos() {
    this.#lottos = Array.from({ length: this.#issuedCount }).map(
      (_) => new Lotto(),
    )
  }
  #validateAmount(amount) {
    if (
      !(
        validate.isValidPositiveNumber(amount) &&
        amount >= LottoVendingMachine.MIN_AMOUNT
      )
    )
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
