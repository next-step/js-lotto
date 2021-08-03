export const KEY = {
  MONEY: "money",
  LOTTO_LIST: "lottoList",
  RESULT: "result",
  SHOWING_NUMBER: "showingNumber",
  SHOWING_RESULT: "showingResult",
};

export const INIT_STATE = {
  [KEY.MONEY]: "",
  [KEY.LOTTO_LIST]: [],
  [KEY.SHOWING_NUMBER]: false,
  [KEY.SHOWING_RESULT]: false,
  [KEY.RESULT]: {},
};

export const ERROR_MESSAGE = {
  MONEY_UNDER_FLOW: "값은 1000 이상이어야 합니다.",
  MONEY_OVER_FLOW: "값은 100000 이하여야 합니다.",
  EMPTY_VALUE: "이 입력란을 작성하세요.",
  WINNING_NUMBER_UNDER_FLOW: "값은 1 이상이어야 합니다.",
  WINNING_NUMBER_OVER_FLOW: "값은 45 이하여야 합니다.",
};
