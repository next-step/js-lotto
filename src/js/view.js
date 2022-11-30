import {$} from "./utils/index.js";

export const lottoAndNumberView = (randomList) =>
  `
<div class="lotto-packet">
<span class="mx-1 text-4xl">🎟️ </span>
<span class="lotto-container-hidden lotto-number">${randomList}</span>
</div>
`;

export const paintRankLotto = (rankLotto) => {
  const {first, second, third, fourth, fifth} = rankLotto;

  $(".winning-count-3").textContent = fifth;
  $(".winning-count-4").textContent = fourth;
  $(".winning-count-5").textContent = third;
  $(".winning-count-5-bonus").textContent = second;
  $(".winning-count-6").textContent = first;
};

export const paintRevenue = (result) => {
  $(".profit").textContent = result;
};
