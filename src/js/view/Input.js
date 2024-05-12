import { readLineAsync } from "../../utils/readlineAsync";
import Lotto from "../domain/Lotto";
import LottoResult from "../domain/LottoResult";

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

  async getWinningNumbers() {
    while (true) {
      const input = await readLineAsync("\n당첨 번호를 입력해 주세요.");
      try {
        Lotto.validateLottoNumbers(input);
        return input;
      } catch (e) {
        console.log(e.message);
        console.log();
      }
    }
  },

  async getBonusNumber(winningNumbers) {
    while (true) {
      const input = await readLineAsync("\n보너스 번호를 입력해 주세요.");
      try {
        LottoResult.validateBonusNumber(input, winningNumbers);
        const bonusNumber = Number(input);
        return bonusNumber;
      } catch (e) {
        console.log(e.message);
        console.log();
      }
    }
  },
};

export default Input;
