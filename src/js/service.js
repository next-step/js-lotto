import {LOTTO} from "./constants/index.js";
import {Selector} from "./constants/selector.js";
import {generateRandomList} from "./utils/index.js";
import {lottoAndNumberView, countLotto} from "./view.js";

export const issueLotto = (number) => {
  Selector.lottoContainer.innerHTML = null;

  return [...Array(number)].map(() =>
    Selector.lottoContainer.insertAdjacentHTML(
      "beforeend",
      lottoAndNumberView(generateRandomList())
    )
  );
};

export const buyLotto = (payment) => {
  const numberOfLotto = Math.floor(payment / LOTTO.PRICE);

  if (!numberOfLotto) return;

  issueLotto(numberOfLotto);
  countLotto(numberOfLotto);
};
