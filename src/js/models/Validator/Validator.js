import {
  LOTTO_PRICE,
  ERROR_MESSAGE_MIN_TOTAL_AMOUNT,
} from "../../constant/index.js";

class Validator {
  validateTotalAmount(money) {
    if (money < LOTTO_PRICE) {
      alert(ERROR_MESSAGE_MIN_TOTAL_AMOUNT);
      return false;
    }

    return true;
  }
}

export default Validator;
