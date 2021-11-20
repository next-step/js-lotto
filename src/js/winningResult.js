import { $ } from "../utils/selector.js";

export const lottoResultCount = {
  "rank-5": 0,
  "rank-4": 0,
  "rank-3": 0,
  "rank-2": 0,
  "rank-1": 0,
};

export const lottoResult = {
  "final-price": 0,
  rate: 0,
};

const onModalShow = () => {
  $(".modal").classList.add("open");
};
const onModalClose = () => {
  $(".modal").classList.remove("open");
};

export const activateModal = () => {
  $(".open-result-modal-button").addEventListener("click", onModalShow);
  $(".modal-close").addEventListener("click", onModalClose);
};

export const countSameNumbers = (purchaseNumbers, winningSet, bonusNumber) => {
  console.log(`🏆 ${[...winningSet]}`);
  console.log(`🙏 ${bonusNumber}`);
  purchaseNumbers.map((purchaseNumber) => {
    console.log(purchaseNumber);
    let count = 0;
    let isBonus = false;

    purchaseNumber.map((number) => {
      [...winningSet].forEach((winningNumber) => {
        if (number === Number(winningNumber)) {
          count += 1;
        }
      });

      if (number === Number(bonusNumber)) {
        isBonus = true;
      }
    });

    if (count === 3) {
      lottoResultCount["rank-5"] += 1;
    } else if (count === 4) {
      lottoResultCount["rank-4"] += 1;
    } else if (count === 5) {
      lottoResultCount["rank-3"] += 1;
    } else if (count === 5 && isBonus) {
      lottoResultCount["rank-2"] += 1;
    } else if (count === 6) {
      lottoResultCount["rank-1"] += 1;
    }
  });
  console.log(lottoResultCount);
};

export const calculateResult = (size) => {
  lottoResult["final-price"] += lottoResultCount["rank-5"] * 5000;
  lottoResult["final-price"] += lottoResultCount["rank-4"] * 50000;
  lottoResult["final-price"] += lottoResultCount["rank-3"] * 1500000;
  lottoResult["final-price"] += lottoResultCount["rank-2"] * 30000000;
  lottoResult["final-price"] += lottoResultCount["rank-1"] * 2000000000;

  const buyPrice = size * 1000;
  lottoResult.rate = ((lottoResult["final-price"] - buyPrice) / buyPrice) * 100;
};

export const updateResult = () => {
  $(".rank-5").innerText = `${lottoResultCount["rank-5"]}개`;
  $(".rank-4").innerText = `${lottoResultCount["rank-4"]}개`;
  $(".rank-3").innerText = `${lottoResultCount["rank-3"]}개`;
  $(".rank-2").innerText = `${lottoResultCount["rank-2"]}개`;
  $(".rank-1").innerText = `${lottoResultCount["rank-1"]}개`;
  $(
    ".winning-rate"
  ).innerText = `당신의 총 수익률은 ${lottoResult.rate}%입니다.`;
};

export const getWinningNumbers = (arr) => {
  const numberList = [];
  const winningNumbers = document.querySelectorAll(".winning-number");
  const bonusNumber = $(".bonus-number");
  let isEmptyNumber = false;
  let isEmptyBonusNumber = false;
  let isDuplicatedNumber = false;
  let isOutOfRange = false;

  winningNumbers.forEach((number) => {
    numberList.push(number.value);
  });

  numberList.forEach((number) => {
    if (number === "") {
      isEmptyNumber = true;
    }
    if (number < 1 || 99 < number) {
      isOutOfRange = true;
    }
  });

  if (bonusNumber.value === "") {
    isEmptyBonusNumber = true;
  }
  if (bonusNumber.value < 1 || 99 < bonusNumber.value) {
    isOutOfRange = true;
  }

  if (isEmptyNumber) {
    alert("당첨 번호를 모두 입력해주세요");
    return;
  } else if (isEmptyBonusNumber) {
    alert("보너스 번호를 입력해주세요");
    return;
  } else if (isOutOfRange) {
    alert("번호는 1부터 99까지 입력해야합니다.");
    return;
  }

  const winningSet = new Set(numberList);

  if (winningSet.size !== numberList.length) {
    alert("중복된 당첨번호가 있습니다.");
    isDuplicatedNumber = true;
    return;
  }

  if (
    !isEmptyNumber &&
    !isEmptyBonusNumber &&
    !isDuplicatedNumber &&
    !isOutOfRange
  ) {
    countSameNumbers(arr, winningSet, bonusNumber.value);
    calculateResult(arr.length);
    updateResult();
    activateModal();
  }
};

export const winningResult = (arr) => {
  const $showResultButton = $(".open-result-modal-button");
  $showResultButton.addEventListener("click", () => getWinningNumbers(arr));
};
