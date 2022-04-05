import { 
  WARNING_WHEN_NOT_IN_1000_UNITS,
  WARNING_WHEN_NOT_IN_CORRECT_RANGE 
} from "../../utils/consts.js"

const price = {
  lottoPriceRangeAlert() {
    alert(WARNING_WHEN_NOT_IN_CORRECT_RANGE)
  },
  lottoPriceUnitAlert() {
    alert(WARNING_WHEN_NOT_IN_1000_UNITS)
  }
}

export default price;
