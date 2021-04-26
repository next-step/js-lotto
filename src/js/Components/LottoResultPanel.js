import { createEl, MatchNumberOrder } from '../Utils/util.js'
import { TEMPLATE } from '../Constant/TEMPLATE.js'

class LottoResultPanel {
  constructor (parent, restart) {
    this.parent = parent
    this.restart = restart
  }

  makeResultData = (matchNumList) => {
    return matchNumList.reduce((acc, cur) => {
      if (!acc[MatchNumberOrder[cur]]) {
        acc[MatchNumberOrder[cur]] = 1
      } else {
        acc[MatchNumberOrder[cur]] += 1
      }
      return acc
    }, {})
  }

  handleClick = ({ target, currentTarget }) => {
    if (target.classList.contains('restart')) {
      return this.restart()
    }

    if (target.closest('div.modal-close').classList.contains('close')) {
      return currentTarget.classList.toggle('open')
    }
  }

  showModal = (ticketNum, matchNumList) => {
    const model = createEl('div', 'modal open')
    model.addEventListener('click', this.handleClick)
    const resultData = this.makeResultData(matchNumList)
    model.insertAdjacentHTML('beforeend', TEMPLATE.INPUT_LAST_NUMBER1(resultData))

    this.parent.append(model)
  }

}

export default LottoResultPanel
