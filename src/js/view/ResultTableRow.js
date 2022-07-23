import { RANK_AMOUNT, RANK_CONDITION } from '../domain/lotto/constants';

export default function ResultTableRow({ rank, matchCount }) {
  const amount = RANK_AMOUNT[rank];
  const { matchConditionCount, isNeedBonuce } = RANK_CONDITION[rank];
  const matchConditionText = `${matchConditionCount}${isNeedBonuce ? ' + 보너스볼' : ''}`;

  return `
      <tr class="text-center">
          <td class="p-3">${matchConditionText}개</td>
          <td class="p-3">${amount.toLocaleString('ko-KR')}</td>
          <td class="p-3">${matchCount}개</td>
      </tr>
    `;
}
