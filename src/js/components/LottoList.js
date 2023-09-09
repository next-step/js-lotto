import { lottoStore } from '../store'
import { createEl, getEl } from '../utils/dom'
import { getState } from '../utils/getState'

export const LottoList = (target, props) => {
  const Element = () => {
    const lottoState = getState(lottoStore)
    const { lottoList } = lottoState
    const { isShowList } = props

    return createEl(`
      <div id="lotto-list" class="d-flex flex-wrap ${
        isShowList() ? 'flex-col' : ''
      }">
        ${lottoList
          .map(lotto => {
            if (isShowList()) {
              return `
                <div class="d-flex flex-align-center">
                  <span class="mx-1 text-4xl">🎟️</span>
                  <span class="ml-2">${lotto.join(', ')}</span>
                </div>
              `
            }

            return '<span class="mx-1 text-4xl">🎟️</span>'
          })
          .join('')}
      </div>
    `)
  }

  return {
    render: props => {
      const oldEl = getEl('#lotto-list', target)
      const newEl = Element(props)

      if (oldEl) {
        oldEl.replaceWith(newEl)
        return
      }

      target.append(newEl)
    }
  }
}
