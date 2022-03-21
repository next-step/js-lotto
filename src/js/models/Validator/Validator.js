import { LOTTO_PRICE } from "../../constant/index.js";

class Validator {
  validateTotalAmount(money) {
    try {
      if (money < LOTTO_PRICE) {
        throw Error("값은 1000원 이상이어야 합니다.");
      }
    } catch (error) {
      alert(error.message);
      return false;
    }
    return true;
  }
}

export default Validator;
