import { readLineAsync } from "../../../utils/readlineAsync";

const Input = {
  async getLottoPurchasedAmount() {
    return await readLineAsync("구입금액을 입력해 주세요.");
  },

  async getWinningLottoNumbers() {
    return await readLineAsync("\n당첨 번호를 입력해 주세요.");
  },

  async getBonusNumber() {
    return await readLineAsync("\n보너스 번호를 입력해 주세요.");
  },

  async getIsRestartLottoGame() {
    return await readLineAsync("\n다시 시작하시겠습니까? (y/n)");
  },
};

export default Input;
