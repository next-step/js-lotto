const PRIZE_MAPPING = new Map([
  [5000, "match-3"],
  [50000, "match-4"],
  [1500000, "match-5"],
  [30000000, "match-5b"],
  [2000000000, "match-6"],
]);

function showMatchedCount(matchedElement, count) {
  if (matchedElement) {
    document.getElementById(matchedElement).textContent = `${count}개`;
  }
}

export function initializeLottoPurchase(buyLotto) {
  const buyButton = document.getElementById("buyButton");
  const amountInput = document.getElementById("amountInput");

  buyButton.addEventListener("click", () => {
    const amount = amountInput.value;
    buyLotto(amount);
  });
}

export function renderLottoList(lottos) {
  const lottoList = document.getElementById("lottos");
  lottoList.innerHTML = "";

  const $countMessage = document.createElement("p");
  $countMessage.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
  $countMessage.classList.add("lotto-count");
  lottoList.appendChild($countMessage);

  lottos.forEach((lotto) => {
    const $lottoTicket = document.createElement("div");
    $lottoTicket.classList.add("lotto-ticket");

    const $lottoIcon = document.createElement("span");
    $lottoIcon.textContent = "🎟";

    const lottoNumbers = document.createElement("span");
    lottoNumbers.textContent = lotto
      .getLottoNumbers()
      .map((lottoNumber) => lottoNumber.getValue())
      .join(", ");

    $lottoTicket.appendChild($lottoIcon);
    $lottoTicket.appendChild(lottoNumbers);
    lottoList.appendChild($lottoTicket);
  });
}

export function renderLottoResult(statistics, profit) {
  const modal = document.getElementById("resultModal");
  const closeButton = document.querySelector(".close-button");

  closeButton.addEventListener("click", () => modal.close());

  for (const [prize, count] of statistics.entries()) {
    const matchedElement = PRIZE_MAPPING.get(prize.prizeAmount);
    showMatchedCount(matchedElement, count);
  }

  document.getElementById("profit-rate").textContent =
    `당신의 총 수익률은 ${profit}%입니다.`;

  modal.showModal();
} 
