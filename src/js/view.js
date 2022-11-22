import {LOTTO} from "./constants/index.js";
import {Selector} from "./constants/selector.js";
import {randomLotto} from "./utils/index.js";

const lottoAndNumberView = (randomList) =>
  `
<div class="lotto-packet">
<span class="mx-1 text-4xl">🎟️ </span>
<span class="lotto-container-hidden lotto-number">${randomList}</span>
</div>
`;

const generateRandomList = () =>
  [...Array(LOTTO.LENGTH)].map(() => randomLotto());

export const issueLotto = (number) =>
  [...Array(number)].map(() =>
    Selector.lottoContainer.insertAdjacentHTML(
      "beforeend",
      lottoAndNumberView(generateRandomList())
    )
  );

export const countLotto = (number) =>
  (Selector.lottoCounter.innerText = number);
