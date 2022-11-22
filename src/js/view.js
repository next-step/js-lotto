import {Selector} from "./constants/selector.js";

export const lottoAndNumberView = (randomList) =>
  `
<div class="lotto-packet">
<span class="mx-1 text-4xl">🎟️ </span>
<span class="lotto-container-hidden lotto-number">${randomList}</span>
</div>
`;

export const countLotto = (number) =>
  (Selector.lottoCounter.innerText = number);
