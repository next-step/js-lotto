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
  checkBonusNumber,
  checkPayment,
  checkValidWinNumberList
} from '../services/lotto/lottoValidate'

export const actions = {
  updatePayment: ({ commit }, { paymentText, onSuccess, onError }) => {
    try {
      const payment = Number(paymentText)
      checkPayment(payment)

      const count = getCountOfPurchase(payment)
      commit(LOTTO_MUTATIONS_TYPE.SET_COUNT, { count })
      generateLottoList(count).forEach(lotto =>
        commit(LOTTO_MUTATIONS_TYPE.ADD_LOTTO, { lotto })
      )

      onSuccess()
    } catch (e) {
      console.log(e.message)
      onError()
    }
  },
  updateWinNumber: ({ commit }, { winNumberText, onSuccess, onError }) => {
    try {
      checkValidWinNumberList(winNumberText)

      const winNumberList = winNumberText.split(',').map(num => Number(num))
      commit(LOTTO_MUTATIONS_TYPE.SET_WIN_NUMBER_LIST, { winNumberList })

      onSuccess()
    } catch (e) {
      console.log(e.message)
      onError()
    }
  },
  updateBonusNumber: (
    { commit, state },
    { bonusNumberText, onSuccess, onError }
  ) => {
    try {
      const bonusNumber = Number(bonusNumberText)
      const { winNumberList, lottoList } = state
      checkBonusNumber(bonusNumber, winNumberList)

      commit(LOTTO_MUTATIONS_TYPE.SET_BONUS_NUMBER, { bonusNumber })

      const lottoResultList = getLottoResult(
        winNumberList,
        bonusNumber,
        lottoList
      )
      const totalPrize = calcTotalPrize(lottoResultList)
      const payment = lottoList.length * DEFAULT_PRICE
      const rate = getReturnRate(totalPrize, payment)
      const stats = getLottoStats(lottoResultList)

      commit(LOTTO_MUTATIONS_TYPE.SET_LOTTO_RESULT, {
        lottoResult: { rate, stats }
      })
      onSuccess()
    } catch (e) {
      console.log(e.message)
      onError()
    }
  },
  updateRetry: ({ commit }, { answer, onSuccess, onClose }) => {
    if (answer === 'y') {
      commit(LOTTO_MUTATIONS_TYPE.RESET)
      onSuccess()
      return
    }

    onClose()
  }
}
