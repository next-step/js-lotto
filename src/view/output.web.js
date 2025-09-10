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
