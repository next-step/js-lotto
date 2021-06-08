import { resetLottoTicket } from "./addTicketSection.js";
import { $topDiv } from "./constant.js";
import { $ } from "./dom.js";

export const restartLottoGame = () => {
  resetLottoTicket();
  $(".modal").classList.remove("open");
  $topDiv.removeChild($(".inputnum-section"));
  $topDiv.removeChild($(".lotto-section"));
  $("input", $("form.mt-5")).value = 0;
};
