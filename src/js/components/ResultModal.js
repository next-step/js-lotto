import { createEl, getEl } from '../utils/dom'
import { lottoStore } from '../store/index'
import { getState } from '../utils/getState'
import { LOTTO_RESULT_TABLE } from '../constants/lotto'

export const ResultModal = (target, { onReset, isOpen, onClose }) => {
  const Element = () => {
    const { lottoResult } = getState(lottoStore)
    const { rate, stats } = lottoResult

    const lottoCounts = stats.map(stat =>
      stat.substring(stat.indexOf('-') + 1).trim()
    )

    return createEl(`
      <div class="modal ${isOpen() ? 'open' : ''}" role="dialog">
        <div class="modal-inner p-10">
          <div class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>

          <h2 class="text-center">🏆 당첨 통계 🏆</h2>
          <div class="d-flex justify-center">
            <table class="result-table border-collapse border border-black">
              <thead>
                <tr class="text-center">
                  <th class="p-3">일치 갯수</th>
                  <th class="p-3">당첨금</th>
                  <th class="p-3">당첨 갯수</th>
                </tr>
              </thead>
              <tbody>
                ${LOTTO_RESULT_TABLE.map(
                  (row, index) => `
                  <tr class="text-center">
                    <td class="p-3">${row.score}</td>
                    <td class="p-3">${row.price}</td>
                      <td class="p-3">${lottoCounts[index]}</td>
                  </tr>
                `
                ).join('')}
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">
            당신의 총 수익률은 ${rate}%입니다.
          </p>
          <div class="d-flex justify-center mt-5">
            <button type="button" class="btn btn-cyan" id="retry-button">다시 시작하기</button>
          </div>
        </div>
      </div>
    `)
  }

  const handleReset = () => {
    onClose()
    onReset()
  }

  return {
    render: () => {
      const oldEl = getEl('.modal', target)
      const newEl = Element()

      const CloseButton = getEl('.modal-close', newEl)
      const RetryButton = getEl('#retry-button', newEl)

      CloseButton.addEventListener('click', onClose)
      RetryButton.addEventListener('click', handleReset)

      if (oldEl) {
        oldEl.replaceWith(newEl)
        return
      }

      target.append(newEl)
    },
    destroy: () => {
      const oldEl = getEl('.modal', target)
      const CloseButton = getEl('.modal-close', oldEl)
      const RetryButton = getEl('#retry-button', oldEl)

      CloseButton.removeEventListener('click', onClose)
      RetryButton.removeEventListener('click', handleReset)
    }
  }
}
