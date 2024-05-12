import { readLineAsync } from "../../utils/readlineAsync";
const Input = {
  async getLottoPurchasedAmount() {
    return await readLineAsync("구입금액을 입력해 주세요.");
  },

  async getWinningNumbers() {
    return await readLineAsync("\n당첨 번호를 입력해 주세요.");
  },

  async getBonusNumber() {
    return await readLineAsync("\n보너스 번호를 입력해 주세요.");
  },
};

export default Input;
