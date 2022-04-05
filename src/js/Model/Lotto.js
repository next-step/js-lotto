import Validate from "./Validate.js";

const Lotto = (function(){
  
  return {
    isNotCorrectPriceRange(value) {
      return Validate.checkPriceRange(value)
    },

    isNotCorrectPriceUnit(value) { 
      return Validate.checkPriceUnit(value)
    },

    getRandomNumber(amount) {
      const randomNumberList = Array.from({length: amount}).map(_ => {
        const numbers = Array(45).fill(1).map((v, k) => v + k );
        const lottoNumbers = numbers.slice().sort(() => Math.random() - 0.5).slice(0, 6);
        return lottoNumbers
      })
      
      return randomNumberList
    }

  }
})()


export default Lotto;
