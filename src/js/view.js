import { createRandomNums } from "./lottoService.js";

const $lottoTicketsUl = document.querySelector(".lotto-section__tickets");
const $lottoSectionLabel = document.querySelector(".lotto-section__label");

export const toggleNumberDisplay = () => {
  const details = $lottoTicketsUl.querySelectorAll("span.lotto-detail");
  details.forEach((d) => d.classList.toggle("hidden"));
};

export const createTicketsHTML = (amountOfLottos) => {
  const createTicketTemplate = () => `
      <li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️ </span>
        <span class="lotto-detail text-3xl hidden">${[
          ...createRandomNums(),
        ].join(", ")}</span>
      </li>
    `;

  return Array.from({ length: amountOfLottos }, createTicketTemplate).join("");
};

export const displayLottoSection = (priceInput) => {
  const amountOfLottos = priceInput / 1000;
  // 1. <label> 결과 렌더링: n개의 복권 구매
  $lottoSectionLabel.innerText = `총 ${amountOfLottos}개의 복권을 구입했습니다.`;
  // 2. <ul> 복권 생성 및 렌더링
  $lottoTicketsUl.innerHTML = createTicketsHTML(amountOfLottos);
};
