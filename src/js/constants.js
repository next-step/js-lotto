export const LOTTO_TICKET_PRICE = 1000;
export const LOTTO_MIN_NUM = 1;
export const LOTTO_MAX_NUM = 45;

export const FIRST_PLACE_WINNING_AMOUNT = 2_000_000_000;
export const SECOND_PLACE_WINNING_AMOUNT = 30_000_000;
export const THIRD_PLACE_WINNING_AMOUNT = 1_500_000;
export const FOURTH_PLACE_WINNING_AMOUNT = 50_000;
export const FIFTH_PLACE_WINNING_AMOUNT = 5_000;

export const MATCH_MESSAGE = (criteria, countOfWin) =>
  `${criteria.winningCount}개 일치${criteria.hasToWinBonus ? ", 보너스 볼 일치" : ""} (${
    criteria.winningAmount
  }원) - ${countOfWin}개`;
