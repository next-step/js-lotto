import { OUTPUT_MESSAGE, PRIZE_STATISTICS } from "../../constants/message";
import { $ } from "../../utils/querySelector";

export const output = {
  lottoResult: (lottos) => {
    $("#lotto_result_box").innerHTML = "";
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

  lottoGameResult: (result) => {
    const resultArray = [...result.entries()].reverse();
    const $tbody = $("tbody");

    resultArray.forEach(([prize, resultCount]) => {
      const tr = document.createElement("tr");
      tr.setAttribute("class", "text-center");
      const { equalCount, price } = PRIZE_STATISTICS[prize];
      const tdEqualCount = document.createElement("td");
      const tdPrice = document.createElement("td");
      const tdResultCount = document.createElement("td");

      tdEqualCount.textContent = `${equalCount}개`;
      tdPrice.textContent = `${price}원`;
      tdResultCount.textContent = `${resultCount}개`;

      tr.appendChild(tdEqualCount);
      tr.appendChild(tdPrice);
      tr.appendChild(tdResultCount);

      $tbody.appendChild(tr);
    });

    const tds = document.querySelectorAll("td");

    tds.forEach((td) => {
      td.setAttribute("class", "p-3");
    });
  },

  rateOfReturn(rate) {
    $("#rate_of_return").textContent = OUTPUT_MESSAGE.TOTAL_RATE_OF_RETURN(rate);
  },
};
