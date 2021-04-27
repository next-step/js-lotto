import { createEl, selector } from '../Utils/util.js'
import { TEMPLATE } from '../Constant/TEMPLATE.js'

class Ticket {
  constructor (nums) {
    this.nums = nums
  }

  getTicket = () => {
    this.lottoEl = createEl('li', 'mx-1 text-4xl lotto-wrapper')
    this.lottoEl.insertAdjacentHTML('beforeend', TEMPLATE.LOTTO_NUMBER(this.nums))
    return this.lottoEl
  }

  toggleNumber = () => {
    selector('.lotto-detail', this.lottoEl).classList.toggle('hidden')
  }

  matchNum = (lastNums, bonusNum) => {
    const set = new Set(this.nums)
    let matchNumCount = lastNums.reduce((acc, cur) => {
      if (set.has(+cur)) {
        return acc + 1
      }
      return acc
    }, 0)

    if (matchNumCount === 5) {
      if (set.has(bonusNum)) {
        matchNumCount += 0.5
      }
    }
    return matchNumCount
  }

}

export default Ticket

