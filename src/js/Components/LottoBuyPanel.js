import { createEl, selector } from '../Utils/util.js'
import { TEMPLATE } from '../Constant/TEMPLATE.js'
import { ALERT_MESSAGE } from '../Constant/Language.js'

class LottoBuyPanel {
  constructor (showTickets) {
    this.money = 0
    this.ticketNum = 0
    this.showTickets = showTickets
  }

  showBuyTicketPanel = () => {
    const lottoBuyPanel = createEl('form', 'mt-1')
    lottoBuyPanel.insertAdjacentHTML('beforeend', TEMPLATE.INPUT_MONEY())

    lottoBuyPanel.addEventListener('submit', this.handleSubmit)

    return lottoBuyPanel
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const $moneyInput = selector('input', e.currentTarget)
    if (this.validationInputMoney($moneyInput.value) === false) {
      alert(ALERT_MESSAGE.LIMIT_MONEY)
      return
    }
    this.changeToTicket($moneyInput.value)
    this.showTickets()

    return false
  }

  validationInputMoney = (money) => {
    return 0 < money && money % 1000 === 0
  }

  changeToTicket = (money = 0) => {
    this.money = money
    this.ticketNum = this.money / 1000
  }

}

export default LottoBuyPanel
