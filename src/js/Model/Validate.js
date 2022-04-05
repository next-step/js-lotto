import { UNIT_PRICE, MAXIMUM_PRICE } from "../utils/consts.js";

const Validate  = (function(){
  return {
    checkPriceRange(price) {
      return price < UNIT_PRICE || price > MAXIMUM_PRICE
    },

    checkPriceUnit(price) {
      return price % UNIT_PRICE !== 0
    },

  }
})()

export default Validate;
