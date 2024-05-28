import { readLineAsync } from "../../../utils/readlineAsync";
import { ErrorLottoGameRestart } from "../../constants/error";

const Input = {
  RESTART_GAME_TRUE: "y",
  RESTART_GAME_FALSE: "n",

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
    const input = await readLineAsync("\n다시 시작하시겠습니까? (y/n)");

    this.validateIsRestartLottoGame(input);

    return input === Input.RESTART_GAME_TRUE;
  },

  validateIsRestartLottoGame(input) {
    if (![this.RESTART_GAME_FALSE, this.RESTART_GAME_TRUE].includes(input)) {
      throw new Error(ErrorLottoGameRestart.ERROR_LOTTO_GAME_RESTART_NOT_VALID);
    }
  },
};

export default Input;
