import { lottoStore } from '../store'
import { createEl, getEl } from '../utils/dom'
import { getState } from '../utils/getState'

export const LottoCountLabel = target => {
  const Element = () => {
    const lottoState = getState(lottoStore)
    const { lottoList } = lottoState

    return createEl(`
      <label id="lotto-count-label" class="flex-auto my-0">
        총 ${lottoList.length} 개를 구매하였습니다.
      </label>
    `)
  }

  return {
    render: () => {
      const oldEl = getEl('#lotto-count-label', target)
      const newEl = Element()

      if (oldEl) {
        oldEl.replaceWith(newEl)
        return
      }

      target.append(newEl)
    }
  }
}
