import { readLineAsync } from "../../utils/readlineAsync";
import Lotto from "../domain/Lotto";

const Input = {
  async getLottoPurchasedAmount() {
    while (true) {
      const input = await readLineAsync("구입금액을 입력해 주세요.");
      try {
        Lotto.validateLottoPurchasedAmount(input);
        return Number(input);
      } catch (e) {
        console.log(e.message);
        console.log();
      }
    }
  },
};

export default Input;
