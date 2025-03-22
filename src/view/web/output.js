import { createModal } from "./components/modal";

export function showPurchaseResultStep() {
  const section = document.querySelector(".purchase-result-step");
  section.style.visibility = "visible";
}

export function hidePurchaseResultStep() {
  const section = document.querySelector(".purchase-result-step");
  section.style.visibility = "hidden";
}

export function removePurchaseResult() {
  const resultSection = document.querySelector(".result-section");
  resultSection.replaceChildren();
}

function createResultText(quantity) {
  const resultText = document.createElement("p");
  resultText.textContent = `총 ${quantity}개를 구매하였습니다.`;
  return resultText;
}

function createResultLottoList(purchasedLottos) {
  const resultLottoList = document.createElement("ul");
  const resultLottos = purchasedLottos.map((lotto) => {
    const lottoText = document.createElement("li");
    lottoText.textContent = lotto.join(", ");
    return lottoText;
  });

  resultLottoList.append(...resultLottos);
  return resultLottoList;
}

export function printPurchaseResult(quantity, purchasedLottos) {
  const resultSection = document.querySelector(".result-section");
  const resultText = createResultText(quantity);
  const resultLottoList = createResultLottoList(purchasedLottos);

  resultSection.append(resultText, resultLottoList);
}

export function showResultModal({ text, onClick, rows }) {
  const modal = createModal({
    title: "🏆 당첨 통계 🏆",
    text,
    buttonText: "다시 시작하기",
    onClick,
    columns: ["일치 갯수", "당첨금", "당첨 갯수"],
    rows,
  });

  document.body.appendChild(modal);
}
