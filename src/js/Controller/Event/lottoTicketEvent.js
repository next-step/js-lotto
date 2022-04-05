import Lotto from "../../Model/Lotto.js";
import { selector } from "../../utils/consts.js";
import LottoTicketView from "../../View/lottoTicketView.js";

const ticket = (function(){
  
  let amount = 0
  
  return {
    handleClickEvent(event) {
      if (event.pointerType === '') {
        if (event.target.checked) {
          LottoTicketView.showTicketUI()
        } else {
          LottoTicketView.hideTicketUI()
        }
      }
    },

    /**
     * @param {number} value
     */
    set setAmount(value) {
      amount = value
    }
  }
})()

export default ticket;
