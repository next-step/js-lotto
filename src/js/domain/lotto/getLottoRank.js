import { RANK, RANK_CONDITION } from './constants.js';

const FAIL = 'FAIL';

export default function getLottoRank({ count, hasBonusNumber }) {
  switch (count) {
    case RANK_CONDITION.FIFTH.matchConditionCount:
      return RANK.FIFTH;
    case RANK_CONDITION.FOURTH.matchConditionCount:
      return RANK.FOURTH;
    case RANK_CONDITION.SECOND.matchConditionCount:
      if (hasBonusNumber) {
        return RANK.SECOND;
      }
      return RANK.THRID;
    case RANK_CONDITION.FIRST.matchConditionCount:
      return RANK.FIRST;
    default:
      return FAIL;
  }
}
