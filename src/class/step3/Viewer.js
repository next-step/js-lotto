import HTML_FORMAT from "./HtmlFormat";

import { handleClickModalDimmedArea } from "./EventListener";

export const printWinningNumberInputs = (length) => {
  const winningNumberBox = document.querySelector("div.winning-number-box");

  winningNumberBox.innerHTML = HTML_FORMAT.WINNING_NUMBER_INPUTS(length);
};

export const openResultModal = () => {
  document.querySelector(".modal").classList.add("open");

  document.body.addEventListener("click", handleClickModalDimmedArea);
};

export const closeResultModal = () => {
  document.querySelector(".modal").classList.remove("open");

  document.body.removeEventListener("click", handleClickModalDimmedArea);
};

export const printPurchaseInfoAndPrizeInfo = (amount, tickets) => {
  const purchaseSection = document.createElement("section");
  const prizeInfoForm = document.querySelector("form.prize-info");
  const lottoContainer = document.querySelector(".lotto-container");

  purchaseSection.classList.add("mt-9", "purchase");
  purchaseSection.innerHTML = HTML_FORMAT.PURCHASE_INFO(amount);
  purchaseSection.innerHTML += HTML_FORMAT.LOTTO_BOX(tickets);

  lottoContainer.insertBefore(purchaseSection, prizeInfoForm);

  document.querySelector(".switch-box").addEventListener("change", () => {
    const lottoBox = document.querySelector(".lotto-box");

    if (lottoBox.classList.contains("d-flex")) {
      lottoBox.classList.replace("d-flex", "d-none");
    } else {
      lottoBox.classList.replace("d-none", "d-flex");
    }
  });

  document
    .querySelector(".modal-close")
    .addEventListener("click", closeResultModal);

  prizeInfoForm.classList.remove("d-none");
};

export const printPrizeInfo = (totalPrize, profitRatio) => {
  const resultTableTbody = document.querySelector("table.result-table tbody");

  const profitRatioElement = document.querySelector("div.modal-inner p");

  resultTableTbody.innerHTML = HTML_FORMAT.PRIZE_FORMAT(totalPrize);

  profitRatioElement.textContent = HTML_FORMAT.PROFIT_RATIO(profitRatio);
};

export const resetPrizeInfo = () => {
  const resultTableTbody = document.querySelector("table.result-table tbody");

  const profitRatioElement = document.querySelector("div.modal-inner p");

  const prizeInfoForm = document.querySelector("form.prize-info");

  resultTableTbody.innerHTML = "";

  profitRatioElement.textContent = "";

  prizeInfoForm.classList.add("d-none");

  prizeInfoForm.reset();

  document.removeEventListener("click", closeResultModal);
};

export const removePurchaseInfo = () => {
  document.querySelector("section.purchase").remove();

  document.querySelector("form.purchase").reset();
};
