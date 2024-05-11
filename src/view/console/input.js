import { INPUT_MESSAGE } from "../../constants/message";
import { readline } from "../../utils/readline";

export const input = {
  async purchasePrice() {
    return await readline.question(INPUT_MESSAGE.INPUT_PURCHASE_PRICE, () =>
      readline.close()
    );
  },

  async winningLotto() {
    return await readline.question(INPUT_MESSAGE.INPUT_WINNING_NUMBER, () =>
      readline.close()
    );
  },

  async bonusNumber() {
    return await readline.question(INPUT_MESSAGE.INPUT_BONUS_NUMBER, () =>
      readline.close()
    );
  },
};
