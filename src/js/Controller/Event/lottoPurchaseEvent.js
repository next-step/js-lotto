import Lotto from "../../Model/Lotto.js"
import { WARNING_WHEN_NOT_IN_1000_UNITS } from "../../utils/consts.js"
import price from "../../View/alert/priceAlert.js"

const purchase = (function(){
  

  return {
    handleSubmitEvent(event) {
      event.preventDefault()
      const [input, button] = event.target
      const { value } = input
      
      if (Lotto.isNotCorrectPriceRange(value)) {
        return price.lottoPriceRangeAlert()
      }

      if (Lotto.isNotCorrectPriceUnit(value)) {
        return price.lottoPriceUnitAlert()
      }

      // alert는 여기서
    },
  }
})()

export default purchase;
