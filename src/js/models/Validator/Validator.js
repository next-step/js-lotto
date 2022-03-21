import {
  LOTTO_PRICE,
  ERROR_MESSAGE_MIN_TOTAL_AMOUNT,
} from "../../constant/index.js";

class Validator {
  validateTotalAmount(money) {
    try {
      if (money < LOTTO_PRICE) {
        throw Error(ERROR_MESSAGE_MIN_TOTAL_AMOUNT);
      }
    } catch (error) {
      alert(error.message);
      return false;
    }
    return true;
  }
}

export default Validator;
