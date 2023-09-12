export const LOTTO_TICKET_PRICE = 1000;
export const LOTTO_MIN_NUM = 1;
export const LOTTO_MAX_NUM = 45;

export const MATCH_MESSAGE = (criteria, countOfWin) =>
  `${criteria.winningCount}개 일치${criteria.hasToWinBonus ? ", 보너스 볼 일치" : ""} (${
    criteria.winningAmount
  }원) - ${countOfWin}개`;
