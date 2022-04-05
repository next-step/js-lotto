import { selector } from '../utils/consts.js'
import purchase from './Event/lottoPurchaseEvent.js';
import ticket from './Event/lottoTicketEvent.js';

const Event = {
  init() {
    const lottoPurchaseForm = selector('.lotto-purchase-form');
    lottoPurchaseForm.addEventListener('submit', purchase.handleSubmitEvent)
  }, 

  ticketToggle(amount) {
    const ticketSwitch = selector('.switch');
    ticketSwitch.addEventListener('click', ticket.handleClickEvent)
  }
}

export default Event;
