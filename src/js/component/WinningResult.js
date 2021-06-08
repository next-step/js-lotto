import SETTINGS from '../settings.js';
import { $ } from '../lib/utils.js';

import { getState, actionCreator } from '../store.js';

const WinningResult = (({ TAG, EVENT }) => {
  return $el => {
    const { resultTable, earningsRate } = getState();

    const bindEvent = $el => {
      $(TAG.BUTTON, $el).addEventListener(
        EVENT.CLICK,
        actionCreator.resetState,
      );
    };

    const render = $el => {
      $el.innerHTML = `
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
                <td class="p-3">${resultTable[4][1]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">4개</td>
                <td class="p-3">50,000</td>
                <td class="p-3">${resultTable[3][1]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개</td>
                <td class="p-3">1,500,000</td>
                <td class="p-3">${resultTable[2][1]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개 + 보너스볼</td>
                <td class="p-3">30,000,000</td>
                <td class="p-3">${resultTable[1][1]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">6개</td>
                <td class="p-3">2,000,000,000</td>
                <td class="p-3">${resultTable[0][1]}개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-center font-bold">당신의 총 수익률은 ${earningsRate}%입니다.</p>
        <div class="d-flex justify-center mt-5">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      `;
    };

    render($el);
    bindEvent($el);
  };
})(SETTINGS);

export default WinningResult;
