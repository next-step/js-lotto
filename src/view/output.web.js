import { LOTTO_RANK } from "../domain/lotto-rank.js";

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

  container.style.display = "block";
}

/**
 *
 * @param {LOTTO_RANK[]} rankList
 * @param {number} rateOfReturn
 */
export function showWinningStatistics(rankList, rateOfReturn) {
  const modal = document.createElement("div");
  modal.className = "modal";
  Object.assign(modal.style, {
    display: "flex",
    position: "fixed",
    zIndex: "1",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  });

  const container = document.createElement("div");
  Object.assign(container.style, {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
    position: "relative",
  });

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  Object.assign(closeButton.style, {
    position: "absolute",
    top: "10px",
    right: "20px",
    fontSize: "24px",
    cursor: "pointer",
  });

  const title = document.createElement("h2");
  title.textContent = "🏆 당첨 통계 🏆";

  const statisticsContainer = document.createElement("table");
  Object.assign(statisticsContainer.style, {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginBottom: "20px",
  });
  const thead = document.createElement("thead");
  const theaderRow = document.createElement("tr");
  ["일치 개수", "당첨 금액", "당첨 개수"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    theaderRow.appendChild(th);
  });
  thead.appendChild(theaderRow);

  const tbody = document.createElement("tbody");

  const rankListForPrint = [
    LOTTO_RANK.FIFTH,
    LOTTO_RANK.FOURTH,
    LOTTO_RANK.THIRD,
    LOTTO_RANK.SECOND,
    LOTTO_RANK.FIRST,
  ];

  rankListForPrint.forEach((rank) => {
    const tr = document.createElement("tr");
    const tdMatch = document.createElement("td");
    tdMatch.textContent = `${rank.match}개${
      rank.hasBonus ? " + 보너스볼" : ""
    }`;
    tdMatch.style.textAlign = "center";

    const tdPrize = document.createElement("td");
    tdPrize.textContent = `${rank.prize.toLocaleString()}원`;
    tdPrize.style.textAlign = "center";

    const count = rankList.filter(
      (r) => r.match === rank.match && r.hasBonus === rank.hasBonus
    ).length;
    const tdCount = document.createElement("td");
    tdCount.textContent = `${count}개`;
    tdCount.style.textAlign = "center";

    [tdMatch, tdPrize, tdCount].forEach((td) => {
      td.style.padding = "8px";
      td.style.borderBottom = "1px solid #ddd";
    });

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

  closeButton.addEventListener("click", () => {
    modal.remove();
    window.location.reload();
  });

  resetButton.addEventListener("click", () => {
    modal.remove();
    window.location.reload();
  });
}
