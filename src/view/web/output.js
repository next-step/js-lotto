import { createModal } from "./components/modal";

export function showPurchaseResultStep() {
  const section = document.querySelector(".purchase-result-step");
  section.style.visibility = "visible";
}

export function hidePurchaseResultStep() {
  const section = document.querySelector(".purchase-result-step");
  section.style.visibility = "hidden";
}

export function resetPurchaseResultStep() {
  const resultSection = document.querySelector(".result-section");
  resultSection.replaceChildren();
}

export function printPurchaseResult(quantity, purchasedLottos) {
  const resultSection = document.querySelector(".result-section");

  const resultWrapper = document.createElement("div");

  const resultText = document.createElement("p");
  resultText.textContent = `총 ${quantity}개를 구매하였습니다.`;

  const resultLottoList = document.createElement("ul");
  const resultLottos = purchasedLottos.map((lotto) => {
    const lottoText = document.createElement("li");
    lottoText.textContent = lotto.join(", ");
    return lottoText;
  });

  resultLottoList.append(...resultLottos);
  resultWrapper.append(resultText, resultLottoList);
  resultSection.appendChild(resultWrapper);
}

export function showResultModal({ text, onClick, columns, rows }) {
  const modal = createModal({
    title: "🏆 당첨 통계 🏆",
    text,
    buttonText: "다시 시작하기",
    onClick,
    columns,
    rows,
  });

  document.body.appendChild(modal);
}
