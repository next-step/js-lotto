import {LOTTO} from "./constants/index.js";
import {Selector} from "./constants/selector.js";
import {randomLotto} from "./utils/index.js";

export const issueLotto = (number) => {
  Selector.lottoContainer.innerHTML = null;
  if (!number) return;

  Array(number)
    .fill(0)
    .forEach((_) => {
      Selector.lottoContainer.innerHTML += `
        <div>
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="lotto-number">${Array.from(
            {length: LOTTO.MAX_LENGTH},
            (_) => randomLotto()
          )}</span>
        </div>
        `;
    });
};

export const countLotto = (number) => {
  Selector.lottoCounter.innerText = 0;
  if (!number) return;

  Selector.lottoCounter.innerText = number;
};
