import { LOTTO_WINNIG_PRIZE } from '../constants/index.js';
import { sortNumberArray } from '../../util/index.js';

export const LottoOutput = {
  LOTTO_TICKET(lotto) {
    return `
    <div class="lotto-ticket d-flex items-center">
      <div class="mx-2 text-4xl">🎟️ </div>
      <span  data-test-id="lotto-ticket" class="text-base hidden">${sortNumberArray(lotto).join(', ')}</span>
    <div>`;
  },

  LOTTO_RESULT(RESULT, PROFIT) {
    return `
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
          <td class="p-3">${LOTTO_WINNIG_PRIZE[0]}</td>
          <td class="p-3">${RESULT[0]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">4개</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[1]}</td>
          <td class="p-3">${RESULT[1]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">5개</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[2]}</td>
          <td class="p-3">${RESULT[2]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">5개 + 보너스볼</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[3]}</td>
          <td class="p-3">${RESULT[3]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">6개</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[4]}</td>
          <td class="p-3">${RESULT[4]}개</td>
        </tr>
      </tbody>
    </table>
    </div>
    <p class="text-center font-bold">당신의 총 수익률은 ${PROFIT}%입니다.</p>`;
  },
};
