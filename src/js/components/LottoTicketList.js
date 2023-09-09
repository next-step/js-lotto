import { createEl, getEl } from '../utils/dom'
import { debounce } from '../utils/debounce'
import { LottoCountLabel as LottoCountLabelComponent } from './LottoCountLabel'
import { LottoList as LottoListComponent } from './LottoList'
import { createSignal } from '../utils/createSignal'

export const LottoTicketList = target => {
  const [isShowList, setIsShowList] = createSignal(false)

  const Element = createEl(`
    <div>
      <div class="d-flex">
        <label id="lotto-count-label" class="flex-auto my-0"></label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label for="lotto-numbers-toggle-button" class="switch">
            <input type="checkbox" id="lotto-numbers-toggle-button" class="lotto-numbers-toggle-button">
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div id="lotto-list" class="d-flex flex-wrap"></div>
    </div>
  `)
  const LottoCountLabel = new LottoCountLabelComponent(Element)
  const LottoList = new LottoListComponent(Element, {
    isShowList
  })

  const handleClickToggle = () => {
    setIsShowList(!isShowList())
    update()
  }

  const update = debounce(() => {
    LottoCountLabel.render()
    LottoList.render()
  })

  return {
    update,
    render: () => {
      const ToggleButton = getEl('#lotto-numbers-toggle-button', Element)
      ToggleButton.addEventListener('click', handleClickToggle)

      target.append(Element)
      update()
    },
    destroy: () => {
      const ToggleButton = getEl('#lotto-numbers-toggle-button', Element)
      ToggleButton.removeEventListener('click', handleClickToggle)
    }
  }
}
