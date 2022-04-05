import { selector, selectorAll } from "../utils/consts.js";
import { amountInfoComponent, lottoTicketComponent } from "./Component/lottoTicket.js";

const LottoTicketView = (function() {
  const ticketList = selector('#lotto-ticket-list')
  let randomNumberGroup;
  return {

    set setRandomNumber(randomNumber) {
      randomNumberGroup = randomNumber
    },

    showLottoInfoUI(amount) {
      selector('#counted-ticket').textContent = amountInfoComponent(amount)
      ticketList.innerHTML = lottoTicketComponent(amount)
      selector('#purchased-lottos').style.display = 'block'
      selector('#lotto-winning-numbers-form').style.display = 'block'
    },

    showTicketUI() {
      ticketList.classList.add('flex-col')
      selectorAll('#ticket-number').forEach((li, index) => {
        li.style.display = 'inline'
        li.textContent = String(randomNumberGroup[index]).replaceAll(',', ', ')
      })
    },

    hideTicketUI() {
      ticketList.classList.remove('flex-col')
      selectorAll('#ticket-number').forEach(li => {
        li.style.display = 'none'
      })
    },
  }
})()

export default LottoTicketView;
