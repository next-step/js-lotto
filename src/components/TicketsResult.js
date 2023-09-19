import { countWinningTicket } from '../utils';

export const WinningPrize = (ticketResults) => {
  const { prizes, profitRate } = ticketResults;

  return `
    <div class="modal-inner p-10">
      <div id="modal-close" class="modal-close">
        <svg id="modal-close" viewbox="0 0 40 40">
          <path id="modal-close" class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </div>
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
            <tr class="text-center">
              <td class="p-3">3개</td>
              <td class="p-3">5,000</td>
              <td class="p-3">${countWinningTicket(3, prizes)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">4개</td>
              <td class="p-3">50,000</td>
              <td class="p-3">${countWinningTicket(4, prizes)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">5개</td>
              <td class="p-3">1,500,000</td>
              <td class="p-3">${countWinningTicket(5, prizes)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">5개 + 보너스볼</td>
              <td class="p-3">30,000,000</td>
              <td class="p-3">${countWinningTicket(5, prizes, true)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">6개</td>
              <td class="p-3">2,000,000,000</td>
              <td class="p-3">${countWinningTicket(6, prizes)}개</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center font-bold">당신의 총 수익률은 ${profitRate.toFixed(
        2
      )}%입니다.</p>
      <div class="d-flex justify-center mt-5">
        <button id="restart-button" type="button" class="btn btn-cyan">
          다시 시작하기
        </button>
      </div>
    </div>
  `;
};
