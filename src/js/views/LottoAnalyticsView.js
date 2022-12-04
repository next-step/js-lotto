class LottoAnalyticsView {
  constructor() {
    this.$initButton = document.getElementById("init-button"); //TODO
  }

  /**
   * @param analytics
   * @param analytics.correctCount
   * @param analytics.winningPrice
   * @param analytics.winningCount
   * @param winningRates
   * @returns {string}
   */
  templateAnalyticsModal(analytics, winningRates) {
    return `<div>
      <h2 class="text-center">🏆 당첨 통계 🏆</h2>
      <div class="d-flex justify-center">
        <table class="result-table border-collapse border border-black">
          <thead>
            <tr class="text-center">
              <th class="p-3">일치 갯수</th>
              <th class="p-3">당첨금</th>
              <th class="p-3">당첨 갯수</th>
            </tr>
          </thead>
          <tbody>
          ${analytics
            .map(
              (analytic) =>
                `<tr class="text-center">
                <td class="p-3">${analytic.correctCount}</td>
                <td class="p-3">${analytic.winningPrice}</td>
                <td class="p-3">${analytic.winningCount}</td>
              </tr>`
            )
            .join("")}
          </tbody>
        </table>
      </div>
      <p class="text-center font-bold">당신의 총 수익률은 ${winningRates}%입니다.</p>
      <div class="d-flex justify-center mt-5">
        <button id="init-button" type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>`;
  }
}

export default LottoAnalyticsView;
