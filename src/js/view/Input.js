import { readLineAsync } from "../../utils/readlineAsync";
import LottoGame from "../domain/LottoGame";

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

  async getIsRestartLottoGame() {
    while (true) {
      try {
        const isRestartLottoGame = await readLineAsync(
          "\n다시 시작하시겠습니까? (y/n)"
        );
        LottoGame.validateIsRestartLottoGame(isRestartLottoGame);
        return isRestartLottoGame === LottoGame.RESTART_GAME_TRUE;
      } catch (e) {
        console.log(e.message);
      }
    }
  },
};

export default Input;
