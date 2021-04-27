import { TEMPLATE } from '../Constant/TEMPLATE.js'
import { getTicket } from '../Utils/lottoNum.js'
import { createEl } from '../Utils/util.js'
import Ticket from './Ticket.js'
import LottoResultPanel from './LottoResultPanel.js'
import { ALERT_MESSAGE } from '../Constant/Language.js'

class LottoTickets {
  constructor (parent, restart) {
    this.ResultPanel = new LottoResultPanel(parent, restart)
  }

  showPanel = (ticketNum) => {
    this.ticketNum = ticketNum
    this.$purchasedSection = createEl('section', 'mt-9')
    this.makeTitle()
    this.makeLottoList()
    this.makeLastWeekNumInput()

    return this.$purchasedSection
  }

  handleToggleNumber = () => {
    this.tickets.forEach(ticket => {
      ticket.toggleNumber()
    })
  }

  makeTitle = () => {
    const $titleSection = createEl('div', 'd-flex')
    $titleSection.addEventListener('change', this.handleToggleNumber)
    $titleSection.insertAdjacentHTML('beforeend', TEMPLATE.CHECK_LOTTO(this.ticketNum))

    this.$purchasedSection.insertAdjacentElement('beforeend', $titleSection)
  }

  makeTickets = () => {
    this.tickets = Array.from({ length: this.ticketNum }, () => new Ticket(getTicket()))
  }

  makeLottoList = () => {
    const $lottoList = createEl('ul', 'd-flex flex-wrap tickets')
    this.makeTickets()

    this.tickets.forEach(ticket => {
      $lottoList.insertAdjacentElement('beforeend', ticket.getTicket())
    })
    this.$purchasedSection.insertAdjacentElement('beforeend', $lottoList)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const numData = formData.getAll('number')
    const bonusNum = formData.get('bonus')

    if (this.validationLastWeekNums(numData, bonusNum) === false) {
      alert(ALERT_MESSAGE.OVERLAP_NUMBER)
      return false
    }

    const matchNumList = []
    this.tickets.forEach(ticket => {
      matchNumList.push(ticket.matchNum(numData, bonusNum))
    })

    this.ResultPanel.showModal(this.ticketNum, matchNumList)

    return false
  }

  makeLastWeekNumInput = () => {
    const lastWeekNumForm = createEl('form', 'mt-1 last-week-number')
    lastWeekNumForm.addEventListener('submit', this.handleSubmit)
    lastWeekNumForm.insertAdjacentHTML('beforeend', TEMPLATE.INPUT_LAST_NUMBER())

    this.$purchasedSection.insertAdjacentElement('beforeend', lastWeekNumForm)
  }

  validationLastWeekNums = (nums, bonusNum) => {
    const numsList = [...nums, bonusNum]
    return numsList.length === new Set(numsList).size
  }

}

export default LottoTickets
