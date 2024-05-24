export const TEST_WHITESPACE_MONEY = "    ";

export const TEST_STRING_MONEY = "돈이 아닙니다.";

export const TEST_ZERO_MONEY = "-1000";

export const TEST_MONEY = 8000;

export const TEST_INVALID_LOTTO_RANGE = [100, 23, 12, 1, 34];

export const TEST_INVALID_LOTTO_LENGTH = [15, 23, 12, 1, 34];

export const TEST_LOTTO = [15, 23, 12, 1, 34, 26];

export const TEST_LOTTO_STRINGS = ["15", "23", "12", "1", "34", "26"];

export const TEST_DUPLICATED_LOTTO = [15, 43, 12, 1, 34, 15];

export const TEST_DUPLICATED_BONUS_NUMBER = 15;

export const TEST_LOTTOS = [
  [15, 23, 12, 1, 34, 26],
  [1, 8, 23, 10, 11, 12],
];

export const TEST_LOTTOS_RESULT = [
  { text: null, if: null, rank: "FAIL", prize: null, count: 0 },
  { text: "3개 일치", if: 3, rank: "FIFTH", prize: 5_000, count: 1 },
  { text: "4개 일치", if: 4, rank: "FOURTH", prize: 50_000, count: 0 },
  { text: "5개 일치", if: 5, rank: "THIRD", prize: 1_500_000, count: 0 },
  { text: "5개 일치, 보너스 볼 일치", if: 5, rank: "SECOND", prize: 30_000_000, count: 0 },
  { text: "6개 일치", if: 6, rank: "FIRST", prize: 2_000_000_000, count: 1 },
];

export const TEST_LOTTOS_RESULT_OUTPUT = [
  "3개 일치 (5,000원)- 1개",
  "4개 일치 (50,000원)- 0개",
  "5개 일치 (1,500,000원)- 0개",
  "5개 일치, 보너스 볼 일치 (30,000,000원)- 0개",
  "6개 일치 (2,000,000,000원)- 1개",
];

export const TEST_LOTTOS_RETURN = 100;

export const TEST_LOTTO_PLAYABLE_STATE = "y";

export const TEST_INVALIDE_LOTTO_PLAYABLE_STATE = "Y";
