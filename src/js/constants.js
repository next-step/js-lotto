export const MESSAGE_ABOUT_UNIT_OF_AMOUNT =
  "로또 구입 금액을 1,000원 단위로 입력해 주세요.";
export const MESSAGE_ABOUT_DUPLICATION_NUMBER =
  "로또 번호에는 중복된 숫자를 입력할 수 없습니다.";
export const MESSAGE_ABOUT_NOT_DEFINED_TYPE =
  "해당하는 타입에 대한 정의가 존재하지 않습니다.";

export const LOTTO_GAME_COUNT = 6;
export const MAXIMUM_NUMBER = 45;
export const PERCENT = 100;

const RANK = {
  RANK_5: "3",
  RANK_4: "4",
  RANK_3: "5",
  RANK_2: "bonus",
  RANK_1: "6",
};

export const RANK_BY_MATCHED_NUMBERS = {
  [RANK.RANK_5]: "rank-5",
  [RANK.RANK_4]: "rank-4",
  [RANK.RANK_3]: "rank-3",
  [RANK.RANK_2]: "rank-2",
  [RANK.RANK_1]: "rank-1",
};

export const PRICE_BY_RANK = {
  [RANK.RANK_5]: 5_000,
  [RANK.RANK_4]: 50_000,
  [RANK.RANK_3]: 1_500_000,
  [RANK.RANK_2]: 30_000_000,
  [RANK.RANK_1]: 2_000_000_000,
};
