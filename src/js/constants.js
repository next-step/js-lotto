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

export const MONEY_TYPE_ERROR_MESSAGE = "금액은 숫자 타입이어야 합니다.";
export const MONEY_RANGE_ERROR_MESSAGE = `금액은 ${LOTTO_TICKET_PRICE}원 이상이어야 합니다.`;
export const MONEY_UNIT_ERROR_MESSAGE = `금액은 ${LOTTO_TICKET_PRICE}원 단위여야 합니다.`;
export const NUMBER_TYPE_ERROR_MESSAGE = "번호는 숫자 타입이어야 합니다.";
export const NUMBER_RANGE_ERROR_MESSAGE = `번호는 ${LOTTO_MIN_NUM} 이상 ${LOTTO_MAX_NUM} 이하 숫자여야 합니다.`;
export const WINNING_NUMBERS_LENGTH_ERROR_MESSAGE = "당첨 번호는 6개의 숫자여야 합니다.";
export const DUPLICATE_WINNING_NUMBERS_ERROR_MESSAGE = "당첨 번호는 중복되면 안됩니다.";
export const DUPLICATE_BONUS_NUMBER_ERROR_MESSAGE = "보너스 번호는 당첨 번호와 중복되면 안됩니다.";
