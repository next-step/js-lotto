// 당첨번호 + 보너스 번호,
// 3, 4, 5, 5+보너스, 6개

import { LOTTO } from "../constants.js";

const lottoWinningNumberCounter = ({
  lottoNumberArrays,
  lottoWinningsNumberArray,
  lottoBonusNumber,
}) => {
  const winNumberMap = {
    [LOTTO.LOTTO_WINNING_CNT.TREE]: 0,
    [LOTTO.LOTTO_WINNING_CNT.TOUR]: 0,
    [LOTTO.LOTTO_WINNING_CNT.FIVE]: 0,
    [LOTTO.LOTTO_WINNING_CNT.FIVEPLUS]: 0,
    [LOTTO.LOTTO_WINNING_CNT.SIX]: 0,
  };
  Array.from(lottoNumberArrays).forEach((lottoArray) => {
    const matchedCnt = lottoArray
      .filter((lottoNum) => lottoWinningsNumberArray.includes(lottoNum))
      .reduce((cnt) => cnt + 1, 0);

    if (matchedCnt == 5 && lottoArray.includes(lottoBonusNumber)) {
      winNumberMap[LOTTO.LOTTO_WINNING_CNT.FIVEPLUS] += 1;
    } else {
      winNumberMap[LOTTO.LOTTO_WINNING_CNT[matchedCnt]] += 1;
    }
  });

  return Object.freeze(winNumberMap);
};

export { lottoWinningNumberCounter };
