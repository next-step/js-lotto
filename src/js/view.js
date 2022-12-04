import {selector} from "./constants/selector.js";
import {$} from "./utils/index.js";

export const showModal = (element) => {
  element.classList.add("open");
};

export const hideModal = (element) => {
  element.classList.remove("open");
};

export const showElement = (element) => {
  element.classList.remove("d-none");
};

export const hideElement = (element) => {
  element.classList.add("d-none");
};

export const viewLottoCount = (number) => {
  selector.lottoCounter.innerText = number;
};

export const viewLottoAndNumber = (randomList) => `
<div class="lotto-packet">
<span class="mx-1 text-4xl">🎟️ </span>
<span class="lotto-container-hidden lotto-number">${randomList}</span>
</div>
`;

export const viewRankLotto = (rankLotto) => {
  const {first, second, third, fourth, fifth} = rankLotto;

  $(".winning-count-3").textContent = fifth;
  $(".winning-count-4").textContent = fourth;
  $(".winning-count-5").textContent = third;
  $(".winning-count-5-bonus").textContent = second;
  $(".winning-count-6").textContent = first;
};

export const viewRevenue = (result) => {
  $(".profit").textContent = result;
};
