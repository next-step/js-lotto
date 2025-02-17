import { RULES } from "../../util/rule.js";
import WinningDetail from "../WinningDetail/index.js";

const RATES_OF_RETURN_RULE = {
  purchasePriceRule: (number) =>
    number >= RULES.MIN_LOTTO_PURCHASE_PRICE &&
    number <= RULES.MAX_LOTTO_PURCHASE_PRICE,
  winningDetailRule: (winningDetail) => winningDetail instanceof WinningDetail,
};

export default RATES_OF_RETURN_RULE;
