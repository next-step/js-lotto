import lottoConfig from '../config/lotto.config'
import lottoReward from '../config/lotto.reward'
import { getRandomArbitrary } from '../utils/landom'

const rewardMapper = {
  3: lottoReward.fifth,
  4: lottoReward.fourth,
  6: lottoReward.fisrt,
}

export default class LottoService {
  #purchasedLottos
  #lottoPrice
  #lottoAnswer

  constructor() {
    this.setInit()
  }

  setInit() {
    this.#lottoPrice = lottoConfig.price || 1000
    this.#purchasedLottos = []
    this.#lottoAnswer = {
      base: [],
      bonus: 0,
    }
  }

  autoPurchase(count, fixedValues) {
    for (let i = 0; i < count; i += 1) {
      this.generatorLottoNumber(fixedValues ? fixedValues[i] : null)
    }
  }

  generatorLottoNumber(fixed) {
    this.#purchasedLottos.push(this.getLottoNumbers(fixed))

    console.log(this.#purchasedLottos)
  }

  getLottoNumbers(fixed) {
    if (fixed) {
      return fixed.slice(0, 6)
    }

    const lottoNumberSet = new Set()

    while (lottoNumberSet.size !== lottoConfig.lottoNumberCount - 1) {
      const randomValue = Math.floor(
        getRandomArbitrary(1, lottoConfig.maxLottoNumber + 1)
      )

      if (!lottoNumberSet.has(randomValue)) {
        lottoNumberSet.add(randomValue)
      }
    }

    return Array.from(lottoNumberSet)
  }

  calcLottoBenefitRate() {
    let benefit = 0

    this.#purchasedLottos.forEach((purchasedLotto) => {
      const lottoSet = new Set()
      let matches = 0

      purchasedLotto.forEach((number) => {
        lottoSet.add(number)
      })

      this.#lottoAnswer.base.forEach((number) => {
        if (lottoSet.has(number)) {
          matches += 1
        }
      })

      if (matches === 5) {
        const reward = purchasedLotto.includes(this.#lottoAnswer.bonus)
          ? lottoReward.second
          : lottoReward.third

        benefit += reward
      }

      if (!rewardMapper[matches]) {
        return
      }

      benefit += rewardMapper[matches]
    })

    console.log('benefit:', benefit)
    return Math.floor(
      (benefit / (this.#purchasedLottos.length * lottoConfig.price)) * 100 - 100
    )
  }

  set lottoAnswer(answer) {
    this.#lottoAnswer = answer
  }

  get myLottos() {
    return this.#purchasedLottos
  }

  get lottoPrice() {
    return this.#lottoPrice
  }
}
