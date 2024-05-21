import { OUTPUT_MESSAGE } from "../../constants/message";
import $ from "../../utils/querySelector";

export const output = {
  lottoResult: (lottos) => {
    lottos.forEach((lotto) => {
      const $span = document.createElement("span");
      $span.setAttribute("class", "mx-1 text-4xl");
      $span.textContent = `🎟️ ${lotto.join(", ")}`;
      $("#lotto_result_box").appendChild($span);
    });
  },

  lottosCount: (count) => {
    $("#lottos_count").textContent = OUTPUT_MESSAGE.PURCHASE_RESULT_COUNT(count);
  },
};
