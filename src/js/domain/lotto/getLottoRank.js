const FAIL = 'FAIL';

const NO_BONUS = 'NO_BONUS';
const BONUS = 'BONUS';

const RANK_CONDITION_MAP = {
  NO_BONUS_3: 'FIFTH',
  NO_BONUS_4: 'FOURTH',
  NO_BONUS_5: 'THRID',
  BONUS_5: 'SECOND',
  NO_BONUS_6: 'FIRST',
};

const makeRankCondtionMapKey = ({ count, hasBonusNumber }) =>
  `${hasBonusNumber ? BONUS : NO_BONUS}_${count}`;

export default function getLottoRank({ count, hasBonusNumber }) {
  const rankCondtionMapKey = makeRankCondtionMapKey({ count, hasBonusNumber });

  return RANK_CONDITION_MAP[rankCondtionMapKey] || FAIL;
}
