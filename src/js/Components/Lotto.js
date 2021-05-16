import LottoBuyPanel from './LottoBuyPanel.js'
import LottoTickets from './LottoTickets.js'

class Lotto {
  constructor (parent) {
    this.$parent = parent
    this.BuyPannel = new LottoBuyPanel(this.showTickets)
    this.Tickets = new LottoTickets(parent, this.restart)

    this.init()
  }

  init = () => {
    this.showBuyPanel()
  }

  showBuyPanel = () => {
    this.$parent.appendChild(this.BuyPannel.show())
  }

  showTickets = () => {
    this.$parent.appendChild(this.Tickets.showPanel(this.BuyPannel.ticketNum))
  }

  restart = () => {
    this.$parent.innerHTML = ''
    this.showBuyPanel()
  }

}

export default Lotto
