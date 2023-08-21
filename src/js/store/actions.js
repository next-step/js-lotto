import {
  getCountOfPurchase,
  getLottoResult,
  calcTotalPrize,
  getReturnRate,
  getLottoStats,
  generateLottoList
} from '../services/lotto/lottoUtils'
import { DEFAULT_PRICE } from '../constants/lotto'
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
      commit('setCount', { count })
      generateLottoList(count).forEach(lotto => commit('addLotto', { lotto }))

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
      commit('setWinNumberList', { winNumberList })

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

      commit('setBonusNumber', bonusNumber)

      const lottoResultList = getLottoResult(
        winNumberList,
        bonusNumber,
        lottoList
      )
      const totalPrize = calcTotalPrize(lottoResultList)
      const payment = lottoList.length * DEFAULT_PRICE
      const rate = getReturnRate(totalPrize, payment)
      const stats = getLottoStats(lottoResultList)

      commit('setLottoResult', { lottoResult: { rate, stats } })
      onSuccess()
    } catch (e) {
      console.log(e.message)
      onError()
    }
  },
  updateRetry: ({ commit }, { answer, onSuccess, onClose }) => {
    if (answer === 'y') {
      commit('reset')
      onSuccess()
      return
    }

    onClose()
  }
}
