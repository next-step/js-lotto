import { setupPurchaseForm, setupDrawNumbersForm, resetForm } from "./input";
import {
  showPurchaseResultStep,
  hidePurchaseResultStep,
  resetPurchaseResultStep,
  printPurchaseResult,
  showResultModal,
} from "./output";

export function getPurchaseAmount(handlePurchase) {
  setupPurchaseForm((value) => {
    const purchasedAmount = Number(value);

    const purchasedLottos = handlePurchase(purchasedAmount);
    const quantity = purchasedLottos.length;

    showPurchaseResultStep();
    printPurchaseResult(quantity, purchasedLottos);
  });
}

export function getDrawNumbers(handleDraw) {
  setupDrawNumbersForm((winningNumbersInput, bonusNumberInput) => {
    const winningNumbers = winningNumbersInput.map((value) => Number(value));
    const bonusNumbers = bonusNumberInput.map((value) => Number(value));

    handleDraw(winningNumbers, bonusNumbers);
  });
}

export function showResult({ rate, result, onClick }) {
  const convertedResult = result.map(
    ({ bonusMatched, matchCount, prizeMoney, requiredMatchCount }) => {
      return [
        `${requiredMatchCount}개${bonusMatched ? " + 보너스볼" : ""}`,
        prizeMoney.toLocaleString(),
        `${matchCount}개`,
      ];
    }
  );

  showResultModal({
    text: `당신의 총 수익률은 ${rate}%입니다.`,
    onClick,
    columns: ["일치 갯수", "당첨금", "당첨 갯수"],
    rows: convertedResult,
  });
}

export function resetPurchase() {
  resetForm();
  hidePurchaseResultStep();
  resetPurchaseResultStep();
}
