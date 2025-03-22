import {
  showPurchaseResultStep,
  hidePurchaseResultStep,
  removePurchaseResult,
  printPurchaseResult,
  showResultModal,
} from "./output";

export function updatePurchasedResultView(quantity, purchasedLottos) {
  removePurchaseResult();
  showPurchaseResultStep();
  printPurchaseResult(quantity, purchasedLottos);
}

export function updateDrawResultView(rate, results) {
  showResultStep();
  printDrawResult(rate, results);
}

export function openResultModal({ rate, results, onClick }) {
  const convertedResults = results.map((result) => {
    return [
      `${result.requiredMatchCount}개 일치${
        result.bonusMatched ? " + 보너스볼" : ""
      }`,
      result.prizeMoney.toLocaleString(),
      result.matchCount,
    ];
  });

  showResultModal({
    text: `당신의 총 수익률은 ${rate}%입니다.`,
    onClick,
    rows: convertedResults,
  });
}

export function resetPurchaseResult() {
  removePurchaseResult();
  hidePurchaseResultStep();
}
