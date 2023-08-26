import { LOTTO_WINNIG_PRIZE } from '../../constants/index.js';

export const ResultModal = (result, profit) => 
    `
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
          <td class="p-3">${result[0]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">4개</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[1]}</td>
          <td class="p-3">${result[1]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">5개</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[2]}</td>
          <td class="p-3">${result[2]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">5개 + 보너스볼</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[3]}</td>
          <td class="p-3">${result[3]}개</td>
        </tr>
        <tr class="text-center">
          <td class="p-3">6개</td>
          <td class="p-3">${LOTTO_WINNIG_PRIZE[4]}</td>
          <td class="p-3">${result[4]}개</td>
        </tr>
      </tbody>
    </table>
    </div>
    <p class="text-center font-bold">당신의 총 수익률은 ${profit}%입니다.</p>`;