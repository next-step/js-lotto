import {
  getCountOfPurchase,
  getLottoResult,
  calcTotalPrize,
  getReturnRate,
  getLottoStats,
  generateLottoList
} from '../services/lotto/lottoUtils'
import { DEFAULT_PRICE } from '../constants/lotto'
import { LOTTO_MUTATIONS_TYPE } from '../constants/store'
import {
  checkValidBonusNumber,
  checkValidPayment,
  checkValidWinNumberList
} from '../services/lotto/lottoValidate'

export const actions = {
  updatePayment: ({ commit }, { paymentText, onSuccess, onError }) => {
    try {
      const payment = Number(paymentText)
      checkValidPayment(payment)

      const count = getCountOfPurchase(payment)
      commit(LOTTO_MUTATIONS_TYPE.SET_COUNT, { count })

      generateLottoList(count).forEach(lotto =>
        commit(LOTTO_MUTATIONS_TYPE.ADD_LOTTO, { lotto })
      )

      onSuccess?.()
    } catch (error) {
      onError?.(error)
    }
  },
  updateWinNumber: ({ commit }, { winNumberText, onSuccess, onError }) => {
    try {
      checkValidWinNumberList(winNumberText)

      const winNumberList = winNumberText.split(',').map(num => Number(num))
      commit(LOTTO_MUTATIONS_TYPE.SET_WIN_NUMBER_LIST, { winNumberList })

      onSuccess?.()
    } catch (error) {
      onError?.(error)
    }
  },
  updateBonusNumber: (
    { commit, state },
    { bonusNumberText, onSuccess, onError }
  ) => {
    try {
      const bonusNumber = Number(bonusNumberText)
      const { winNumberList, lottoList } = state
      checkValidBonusNumber(bonusNumber, winNumberList)

      const lottoResultList = getLottoResult(
        winNumberList,
        bonusNumber,
        lottoList
      )
      const totalPrize = calcTotalPrize(lottoResultList)
      const payment = lottoList.length * DEFAULT_PRICE
      const rate = getReturnRate(totalPrize, payment)
      const stats = getLottoStats(lottoResultList)

      commit(LOTTO_MUTATIONS_TYPE.SET_BONUS_NUMBER, { bonusNumber })
      commit(LOTTO_MUTATIONS_TYPE.SET_LOTTO_RESULT, {
        lottoResult: { rate, stats }
      })

      onSuccess?.()
    } catch (error) {
      onError?.(error)
    }
  },
  updateRetry: ({ commit }, { answer, onSuccess, onClose }) => {
    if (answer === 'y') {
      commit(LOTTO_MUTATIONS_TYPE.RESET)
      onSuccess?.()
      return
    }

    onClose?.()
  }
}
