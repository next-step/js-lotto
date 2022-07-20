import { ERROR } from "./constants/messages.js";
import { LOTTO_PRICE, MAX_INPUT_MONEY } from "./constants/nums.js";

const fireError = function (error) {
  console.error(error);
  window.alert(error);
};

export const validateInputMoney = function (inputMoney) {
  const isInputMoneyNumber = !Number.isNaN(inputMoney);
  const isInputMoneyTooSmall = inputMoney <= 0;
  const isInputMoneyTooMany = inputMoney > MAX_INPUT_MONEY;
  const isInputMoneyMulitpleOfLottoPrice = inputMoney % LOTTO_PRICE === 0;

  try {
    if (!isInputMoneyNumber) throw new Error(ERROR.INPUT_MONEY_NOT_NUMBER);
    if (isInputMoneyTooSmall) throw new Error(ERROR.INPUT_MONEY_TOO_SMALL);
    if (!isInputMoneyMulitpleOfLottoPrice)
      throw new Error(ERROR.INPUT_MONEY_INVALID_PRICE);
    if (isInputMoneyTooMany) throw new Error(ERROR.INPUT_MONEY_TOO_MANY);
    return true;
  } catch (err) {
    fireError(err);
  }
};
