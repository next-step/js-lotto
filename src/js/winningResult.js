import { $ } from "../utils/selector.js";
import { WINNING_PRICE } from "../utils/constants.js";
import { isValidWinningNumber } from "../utils/utilFunc.js";
import { updateResult } from "../utils/renderer.js";

let lottoResultCount = {
  "rank-5": 0,
  "rank-4": 0,
  "rank-3": 0,
  "rank-2": 0,
  "rank-1": 0,
};

const resetLottoResultCount = () => {
  lottoResultCount = {
    "rank-5": 0,
    "rank-4": 0,
    "rank-3": 0,
    "rank-2": 0,
    "rank-1": 0,
  };
};

const lottoResult = {
  "final-price": 0,
  rate: 0,
};

const updateResultCount = (count, isBonus) => {
  switch (count) {
    case 3:
      lottoResultCount["rank-5"] += 1;
      break;
    case 4:
      lottoResultCount["rank-4"] += 1;
      break;
    case 5:
      isBonus
        ? (lottoResultCount["rank-2"] += 1)
        : (lottoResultCount["rank-3"] += 1);
      break;
    case 6:
      lottoResultCount["rank-1"] += 1;
      break;
    default:
      break;
  }
};

export const countSameNumbers = (purchaseNumbers, winningSet, bonusNumber) => {
  resetLottoResultCount();

  purchaseNumbers.forEach((purchaseNumber) => {
    let count = 0;
    let isBonus = false;

    purchaseNumber.forEach((number) => {
      if (winningSet.has(number)) {
        count += 1;
      }

      if (number === Number(bonusNumber)) {
        isBonus = true;
      }
    });

    updateResultCount(count, isBonus);
  });
};

export const calculateResult = (size) => {
  lottoResult["final-price"] +=
    lottoResultCount["rank-5"] * WINNING_PRICE.RANK_5;
  lottoResult["final-price"] +=
    lottoResultCount["rank-4"] * WINNING_PRICE.RANK_4;
  lottoResult["final-price"] +=
    lottoResultCount["rank-3"] * WINNING_PRICE.RANK_3;
  lottoResult["final-price"] +=
    lottoResultCount["rank-2"] * WINNING_PRICE.RANK_2;
  lottoResult["final-price"] +=
    lottoResultCount["rank-1"] * WINNING_PRICE.RANK_1;

  const buyPrice = size * 1000;
  lottoResult.rate = ((lottoResult["final-price"] - buyPrice) / buyPrice) * 100;
};

export const getLottoResult = (lottoTicketsList) => {
  const numberList = [];
  const winningNumbers = document.querySelectorAll(".winning-number");
  const bonusNumber = $(".bonus-number");

  winningNumbers.forEach((number) => {
    numberList.push(Number(number.value));
  });

  const winningSet = new Set(numberList);

  if (isValidWinningNumber(numberList, bonusNumber, winningSet)) {
    countSameNumbers(lottoTicketsList, winningSet, bonusNumber.value);
    calculateResult(lottoTicketsList.length);
    updateResult(lottoResultCount, lottoResult);
    onModalShow();
  }
};

const onModalShow = () => {
  $(".modal").classList.add("open");
};

export const onModalClose = () => {
  $(".modal").classList.remove("open");
};

export const handleLottoResult = (lottoTicketsList) => {
  const $showResultButton = $(".open-result-modal-button");
  $showResultButton.addEventListener("click", () =>
    getLottoResult(lottoTicketsList)
  );
  $(".modal-close").addEventListener("click", onModalClose);
};
