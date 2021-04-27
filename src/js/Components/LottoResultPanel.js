import { createEl, MatchNumberOrder } from '../Utils/util.js'
import { TEMPLATE } from '../Constant/TEMPLATE.js'

class LottoResultPanel {
  constructor (parent, restart) {
    this.parent = parent
    this.restart = restart
  }

  getEarningRate = (ticketNum, profit) => {

    return (profit / (ticketNum * 1000)) * 100
  }

  makeResultData = (ticketNum, matchNumList) => {
    const resultData = matchNumList.reduce((acc, cur) => {
      if (cur < 3) return acc
      if (!acc[MatchNumberOrder[cur]]) {
        acc[MatchNumberOrder[cur].label] = 1
        acc['profit'] += MatchNumberOrder[cur].price
      } else if (acc[MatchNumberOrder[cur]]) {
        acc[MatchNumberOrder[cur].label] += 1
        acc['profit'] += MatchNumberOrder[cur].price
      }
      return acc
    }, { profit: 0 })
    debugger;
    resultData.earningRate = this.getEarningRate(ticketNum, resultData.profit)
    return resultData
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
    const resultData = this.makeResultData(ticketNum, matchNumList)
    model.insertAdjacentHTML('beforeend', TEMPLATE.INPUT_LAST_NUMBER1(resultData))

    this.parent.append(model)
  }

}

export default LottoResultPanel
