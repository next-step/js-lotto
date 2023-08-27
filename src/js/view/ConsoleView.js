import { prompt } from '../utils/prompt'
import { lottoStore } from '../store/index'
import { INFO_MESSAGE } from '../constants/message'
import { LOTTO_ACTIONS_TYPE, LOTTO_STATE_KEY } from '../constants/store'

export const ConsoleView = () => {
  const renderPaymentPrompt = () => {
    prompt.question(INFO_MESSAGE.REQUEST_PAYMENT, paymentText => {
      lottoStore.dispatch(LOTTO_ACTIONS_TYPE.UPDATE_PAYMENT, {
        paymentText,
        onSuccess: renderWinNumberPrompt,
        onError: error => {
          console.log(error.message)
          renderPaymentPrompt()
        }
      })
    })
  }

  const renderWinNumberPrompt = () => {
    prompt.question(INFO_MESSAGE.REQUEST_WIN_NUMBER, winNumberText => {
      lottoStore.dispatch(LOTTO_ACTIONS_TYPE.UPDATE_WIN_NUMBER, {
        winNumberText,
        onSuccess: renderBonusNumberPrompt,
        onError: error => {
          console.log(error.message)
          renderWinNumberPrompt()
        }
      })
    })
  }

  const renderBonusNumberPrompt = () => {
    prompt.question(INFO_MESSAGE.REQUEST_BONUS_NUMBER, bonusNumberText => {
      lottoStore.dispatch(LOTTO_ACTIONS_TYPE.UPDATE_BONUS_NUMBER, {
        bonusNumberText,
        onSuccess: renderRetryPrompt,
        onError: error => {
          console.log(error.message)
          renderBonusNumberPrompt()
        }
      })
    })
  }

  const renderRetryPrompt = () => {
    prompt.question(INFO_MESSAGE.REQUEST_RETRY, answer => {
      lottoStore.dispatch(LOTTO_ACTIONS_TYPE.UPDATE_RETRY, {
        answer,
        onSuccess: renderPaymentPrompt,
        onClose: closePrompt
      })
    })
  }

  const closePrompt = () => {
    prompt.close()
  }

  const render = payload => {
    if (!payload) {
      return
    }

    const key = Object.keys(payload)[0]

    switch (key) {
      case LOTTO_STATE_KEY.COUNT:
        console.log(`${payload.count}개를 구매했습니다.`)
        return
      case LOTTO_STATE_KEY.LOTTO_RESULT:
        console.log(
          '당첨 통계\n' +
            '--------------------\n' +
            `${payload.lottoResult.stats.join('\n')}\n` +
            `총 수익률은 ${payload.lottoResult.rate}%입니다.`
        )
        return
      case LOTTO_STATE_KEY.WIN_NUMBER_LIST:
      case LOTTO_STATE_KEY.BONUS_NUMBER:
        return
      default:
        console.log(payload[key])
    }
  }

  return {
    render,
    renderPaymentPrompt,
    renderWinNumberPrompt,
    renderBonusNumberPrompt,
    renderRetryPrompt,
    closePrompt
  }
}
