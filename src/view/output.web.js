import {
  findLottoRankCount,
  LOTTO_RANK,
  summarizeRank,
} from "../domain/lotto-rank.js";

function restart() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();
  }
  window.location.reload();
}

export function printLottoWeb(lottoList) {
  const container = document.querySelector(".lotto-result");
  const count = container.querySelector(".lotto-count");
  const list = container.querySelector(".lotto-list");

  list.innerHTML = "";
  count.textContent = `${lottoList.length}개를 구매했습니다.`;
  lottoList.forEach((lotto) => {
    const item = document.createElement("li");
    item.textContent = `🎟️ ${lotto.text().join(", ")}`;
    list.appendChild(item);
  });

  list.classList.toggle("show");

  const winningLottoContainer = document.querySelector(".winning-lotto");
  winningLottoContainer.classList.toggle("show");
}

/**
 *
 * @param {LOTTO_RANK[]} rankList
 * @param {number} rateOfReturn
 */
export function showWinningStatistics(rankList, rateOfReturn) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const container = document.createElement("div");
  container.className = "modal-container";

  const closeButton = document.createElement("span");
  closeButton.className = "modal-close-button";
  closeButton.innerHTML = "&times;";

  const title = document.createElement("h2");
  title.textContent = "🏆 당첨 통계 🏆";

  const statisticsContainer = document.createElement("table");
  statisticsContainer.className = "modal-statistics-table";
  const thead = document.createElement("thead");
  const theaderRow = document.createElement("tr");
  ["일치 개수", "당첨 금액", "당첨 개수"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    theaderRow.appendChild(th);
  });
  thead.appendChild(theaderRow);

  const tbody = document.createElement("tbody");

  const rankSummary = summarizeRank(rankList);
  rankSummary.forEach(({ rank, count }) => {
    const tr = document.createElement("tr");
    const tdMatch = document.createElement("td");
    tdMatch.textContent = `${rank.match}개${
      rank.hasBonus ? " + 보너스볼" : ""
    }`;
    tdMatch.style.textAlign = "center";

    const tdPrize = document.createElement("td");
    tdPrize.textContent = `${rank.prize.toLocaleString()}원`;
    tdPrize.style.textAlign = "center";

    const tdCount = document.createElement("td");
    tdCount.textContent = `${count}개`;
    tdCount.style.textAlign = "center";

    tr.append(tdMatch, tdPrize, tdCount);
    tbody.appendChild(tr);
  });

  statisticsContainer.append(thead, tbody);

  const rate = document.createElement("h3");
  rate.textContent = `당신의 총 수익률은 ${rateOfReturn}%입니다.`;

  const resetButton = document.createElement("button");
  resetButton.textContent = "다시 시작하기";

  container.append(closeButton, title, statisticsContainer, rate, resetButton);
  modal.appendChild(container);
  document.body.appendChild(modal);

  closeButton.addEventListener("click", restart);
  resetButton.addEventListener("click", restart);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      restart();
    }
  });
}
