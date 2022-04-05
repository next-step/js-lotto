import Validate from "./Validate.js";

const Lotto = (function(){
  return {
    isNotCorrectPriceRange(value) {
      return Validate.checkPriceRange(value)
    },
    
    isNotCorrectPriceUnit(value) { 
      return Validate.checkPriceUnit(value)
    },

  }
})()


export default Lotto;
