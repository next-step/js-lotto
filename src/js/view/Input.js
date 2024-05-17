import { readLineAsync } from "../../utils/readlineAsync";
import Lotto from "../domain/Lotto";
import LottoGame from "../domain/LottoGame";
import LottoNumber from "../domain/LottoNumber";

const Input = {
  async getLottoPurchasedAmount() {
    while (true) {
      try {
        const purchasedAmount = await readLineAsync(
          "구입금액을 입력해 주세요."
        );
        LottoGame.validateLottoPurchasedAmount(purchasedAmount);
        return purchasedAmount;
      } catch (e) {
        console.log(e.message);
      }
    }
  },

  async getWinningLotto() {
    while (true) {
      try {
        const winningNumbers = await readLineAsync(
          "\n당첨 번호를 입력해 주세요."
        );

        const winningLotto = new Lotto(winningNumbers);

        return winningLotto;
      } catch (e) {
        console.log(e.message);
      }
    }
  },

  async getBonusNumber(winningLotto) {
    while (true) {
      try {
        const input = await readLineAsync("\n보너스 번호를 입력해 주세요.");

        const bonusNumber = new LottoNumber(input);
        LottoNumber.validateBonusNumber(bonusNumber, winningLotto);
        return bonusNumber;
      } catch (e) {
        console.log(e.message);
      }
    }
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
