import { RANK, RANK_AMOUNT } from '../domain/lotto/constants.js';

const RANK_CONDITION = {
  [RANK.FIFTH]: {
    matchConditionCount: 3,
    isNeedBonus: false,
  },
  [RANK.FOURTH]: {
    matchConditionCount: 4,
    isNeedBonus: false,
  },
  [RANK.THRID]: {
    matchConditionCount: 5,
    isNeedBonus: false,
  },
  [RANK.SECOND]: {
    matchConditionCount: 5,
    isNeedBonus: true,
  },
  [RANK.FIRST]: {
    matchConditionCount: 6,
    isNeedBonus: false,
  },
};

export default function ResultTableRow({ rank, matchCount }) {
  const amount = RANK_AMOUNT[rank];
  const { matchConditionCount, isNeedBonus } = RANK_CONDITION[rank];
  const matchConditionText = `${matchConditionCount}${isNeedBonus ? ' + 보너스볼' : ''}`;

  return `
      <tr class="text-center">
          <td class="p-3">${matchConditionText}개</td>
          <td class="p-3">${amount.toLocaleString('ko-KR')}</td>
          <td class="p-3">${matchCount}개</td>
      </tr>
    `;
}
