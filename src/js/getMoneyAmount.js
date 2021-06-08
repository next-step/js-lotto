import { $ } from "./dom.js";
import { FUNC, MONEY, MESSAGE } from "./constant.js";
import { addTicketSection } from "./addTicketSection.js";
import { addWinNumberForm } from "./addWinNumberForm.js";

export const getMoneyAmount = ({ target }) => {
  if (target.tagName == "BUTTON") {
    let $input = $("input", target.parentNode);
    let amount = $input.value;
    if (FUNC.checkRange(amount, MONEY.MIN, MONEY.MAX)) {
      if (amount % 1000 !== 0) {
        alert(MESSAGE.MONEY_UNIT);
        $input.value = "";
        $input.focus();
      } else if ($("section") == null) {
        addTicketSection(amount, 0);
        addWinNumberForm();
      } else {
        addTicketSection(amount, 1);
      }
    }
  }
};
