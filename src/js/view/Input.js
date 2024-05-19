import { readLineAsync } from "../../utils/readlineAsync";
import Lotto from "../domain/Lotto";
import LottoGame from "../domain/LottoGame";
import LottoNumber from "../domain/LottoNumber";

const Input = {
  async getLottoPurchasedAmount() {
    const purchasedAmount = await readLineAsync("구입금액을 입력해 주세요.");
    LottoGame.validateLottoPurchasedAmount(purchasedAmount);
    return purchasedAmount;
  },

  async getWinningLotto() {
    const winningNumbers = await readLineAsync("\n당첨 번호를 입력해 주세요.");

    const winningLotto = new Lotto(winningNumbers);
    return winningLotto;
  },

  async getBonusNumber(winningLotto) {
    const input = await readLineAsync("\n보너스 번호를 입력해 주세요.");

    const bonusNumber = new LottoNumber(input);

    LottoNumber.validateBonusNumber(bonusNumber, winningLotto);
    return bonusNumber;
  },

  async getIsRestartLottoGame() {
    const isRestartLottoGame = await readLineAsync(
      "\n다시 시작하시겠습니까? (y/n)"
    );
    LottoGame.validateIsRestartLottoGame(isRestartLottoGame);
    return isRestartLottoGame === LottoGame.RESTART_GAME_TRUE;
  },
};

export default Input;
