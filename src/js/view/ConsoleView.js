import { prompt } from '../utils/prompt'
import { lottoStore } from '../store/index'

export const ConsoleView = () => {
  const renderPaymentPrompt = () => {
    prompt.question('구입금액을 입력해 주세요.\n', paymentText => {
      lottoStore.dispatch('updatePayment', {
        paymentText,
        onSuccess: renderWinNumberPrompt,
        onError: renderPaymentPrompt
      })
    })
  }

  const renderWinNumberPrompt = () => {
    prompt.question('당첨 번호를 입력해 주세요.\n', winNumberText => {
      lottoStore.dispatch('updateWinNumber', {
        winNumberText,
        onSuccess: renderBonusNumberPrompt,
        onError: renderWinNumberPrompt
      })
    })
  }

  const renderBonusNumberPrompt = () => {
    prompt.question('보너스 번호를 입력해 주세요.\n', bonusNumberText => {
      lottoStore.dispatch('updateBonusNumber', {
        bonusNumberText,
        onSuccess: renderRetryPrompt,
        onError: renderBonusNumberPrompt
      })
    })
  }

  const renderRetryPrompt = () => {
    prompt.question('다시 시작하시겠습니까? (y/n)\n', answer => {
      lottoStore.dispatch('updateRetry', {
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
      case 'count':
        console.log(`${payload.count}개를 구매했습니다.`)
        return
      case 'lottoResult':
        console.log(
          '당첨 통계\n' +
            '--------------------\n' +
            `${payload.lottoResult.stats.join('\n')}\n` +
            `총 수익률은 ${payload.lottoResult.rate}%입니다.`
        )
        return
      case 'winNumberList':
      case 'bonusNumber':
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
