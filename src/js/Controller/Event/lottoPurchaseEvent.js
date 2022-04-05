import { UNIT_PRICE } from "../../utils/consts.js"

import Lotto from "../../Model/Lotto.js"
import priceAlert from "../../View/alert/priceAlert.js"
import LottoPurchaseView from "../../View/lottoPurchaseView.js"
import LottoTicketView from "../../View/lottoTicketView.js"
import Event from "../index.js"
import ticket from "./lottoTicketEvent.js"

const purchase = (function(){
  
  return {
    handleSubmitEvent(event) {
      event.preventDefault()
      const input = event.target[0]
      const { value } = input
      
      if (Lotto.isNotCorrectPriceRange(value)) {
        LottoPurchaseView.removeInputValue(input)
        LottoPurchaseView.attachInputStyleOutLine(input)
        return priceAlert.lottoPriceRangeAlert()
      }

      if (Lotto.isNotCorrectPriceUnit(value)) {
        LottoPurchaseView.removeInputValue(input)
        LottoPurchaseView.attachInputStyleOutLine(input)
        return priceAlert.lottoPriceUnitAlert()
      }
    
      LottoPurchaseView.detachInputStyleOutLine(input)

      const amount = value / UNIT_PRICE

      LottoTicketView.showLottoInfoUI(amount)
      LottoTicketView.setRandomNumber = Lotto.getRandomNumber(amount)
      ticket.setAmount = amount
      Event.ticketToggle()
    },
  }
})()

export default purchase;
