import lottoConfig from '../config/lotto.config'
import lottoReward from '../config/lotto.reward'
import lottoRewardKey from '../constants/LottoRewardKey'
import { MANUAL_LOTTO_AMOUNT_INCORRECT_ERROR } from '../constants/Message'
import { getRandomNumber } from '../utils/random'

const rewardMapper = {
  [lottoRewardKey.FIFTH]: lottoReward.fifth,
  [lottoRewardKey.FOURTH]: lottoReward.fourth,
  [lottoRewardKey.THIRD]: lottoReward.third,
  [lottoRewardKey.SECOND]: lottoReward.second,
  [lottoRewardKey.FIRST]: lottoReward.fisrt,
}

const PURCHASE_MODE = {
  AUTO: 'auto_purchase',
  MANUAL: 'manual_purchase',
}

export default class LottoService {
  #purchasedLottos
  #lottoPrice
  #lottoAnswer
  #purchaseMode
  #manualPurchaseInfo

  constructor() {
    this.#purchaseMode = PURCHASE_MODE.AUTO
    this.initService()
  }

  initService() {
    this.#lottoPrice = lottoConfig.price || 1000
    this.#purchasedLottos = []
    this.#lottoAnswer = {
      base: [],
      bonus: 0,
    }
    this.#manualPurchaseInfo = {
      manualPurchaseAmount: 0,
      totalPurchaseAmount: 0,
    }
  }

  manualPurchase(manualLottos) {
    if (manualLottos.length !== this.#manualPurchaseInfo.manualPurchaseAmount) {
      return { success: false, message: MANUAL_LOTTO_AMOUNT_INCORRECT_ERROR }
    }

    this.#purchasedLottos = manualLottos

    const autoPurchaseAmount = this.#manualPurchaseInfo.totalPurchaseAmount - this.#manualPurchaseInfo.manualPurchaseAmount
    for (let i = 0; i < autoPurchaseAmount; i += 1) {
      this.generateLottoNumber()
    }

    return { success: true }
  }

  autoPurchase(count, fixedValues) {
    this.initService()

    for (let i = 0; i < count; i += 1) {
      this.generateLottoNumber(fixedValues ? fixedValues[i] : null)
    }
  }

  generateLottoNumber(fixed) {
    this.#purchasedLottos.push(this.getLottoNumbers(fixed))
  }

  getLottoNumbers(fixed) {
    if (fixed) {
      return fixed.slice(0, 6)
    }

    const lottoNumberSet = new Set()

    while (lottoNumberSet.size !== lottoConfig.lottoNumberCount - 1) {
      const randomValue = Math.floor(getRandomNumber(1, lottoConfig.maxLottoNumber + 1))

      if (!lottoNumberSet.has(randomValue)) {
        lottoNumberSet.add(randomValue)
      }
    }

    return Array.from(lottoNumberSet)
  }

  calcLottoBenefit() {
    const benefitMap = new Map()

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
        if (purchasedLotto.includes(this.#lottoAnswer.bonus)) {
          benefitMap.set(lottoRewardKey.SECOND, (benefitMap.get(lottoRewardKey.SECOND) || 0) + 1)
          return
        }
      }

      if (!rewardMapper[matches]) {
        return
      }

      benefitMap.set(matches, (benefitMap.get(matches) || 0) + 1)
    })

    let benefit = 0
    const rank = {}

    benefitMap.forEach((count, matches) => {
      benefit += rewardMapper[matches] * count

      rank[matches] = count
    })

    return {
      benefitRate: Math.floor((benefit / (this.#purchasedLottos.length * lottoConfig.price)) * 100 - 100),
      rank,
    }
  }

  isPurcaseModeAuto() {
    return this.#purchaseMode === PURCHASE_MODE.AUTO
  }

  changePurchaseMode() {
    this.#purchaseMode = this.isPurcaseModeAuto() ? PURCHASE_MODE.MANUAL : PURCHASE_MODE.AUTO
  }

  set manualPurchaseInfo({ manualPurchaseAmount, totalPurchaseAmount }) {
    this.#manualPurchaseInfo = {
      manualPurchaseAmount,
      totalPurchaseAmount,
    }
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
