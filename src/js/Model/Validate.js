import { UNIT_PRICE, MAXIMUM_PRICE, LOTTO_NUMBER } from '../utils/consts.js';

const Validate = (function () {
  return {
    checkPriceRange(price) {
      return price < UNIT_PRICE || price > MAXIMUM_PRICE;
    },

    checkPriceUnit(price) {
      return price % UNIT_PRICE !== 0;
    },

    checkWinningNumberUnit(number) {
      const reg = /^\d{1}$/g;
      return !reg.test(number);
    },

    checkWinningNumberRange(numbers) {
      return numbers
        .map(Number)
        .some(
          (number) => number < LOTTO_NUMBER.MIN || number > LOTTO_NUMBER.MAX
        );
    },

    checkWinningNumberDuplicate(numbers) {
      return numbers.some(
        (number) => numbers.indexOf(number) !== numbers.lastIndexOf(number)
      );
    },
  };
})();

export default Validate;
