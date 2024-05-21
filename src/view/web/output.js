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
};
