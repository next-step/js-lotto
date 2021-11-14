import lottoConfig from '../config/lotto.config'
import { getRandomArbitrary } from '../utils/landom'

export default class LottoService {
  #purchasedLottos
  #lottoPrice

  constructor() {
    this.#lottoPrice = lottoConfig.price || 1000
    this.#purchasedLottos = []
  }

  autoPurchase(count, fixedValues) {
    for (let i = 0; i < count; i += 1) {
      this.generatorLottoNumber(fixedValues ? fixedValues[i] : null)
    }
  }

  generatorLottoNumber(fixed) {
    this.#purchasedLottos.push(this.getLottoNumbers(fixed))
  }

  getLottoNumbers(fixed) {
    if (fixed) {
      return fixed.slice(0, 6)
    }

    const lottoNumberSet = new Set()

    while (lottoNumberSet.size !== lottoConfig.lottoNumberCount) {
      const randomValue = Math.floor(
        getRandomArbitrary(1, lottoConfig.maxLottoNumber + 1)
      )

      if (!lottoNumberSet.has(randomValue)) {
        lottoNumberSet.add(randomValue)
      }
    }

    return Array.from(lottoNumberSet)
  }

  get myLottos() {
    return this.#purchasedLottos
  }

  get lottoPrice() {
    return this.#lottoPrice
  }
}
