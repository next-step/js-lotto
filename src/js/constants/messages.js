export const STATUS_MESSAGE = {
  LOTTO_PURCHASE: (ticketCount, changes) =>
    `총 ${ticketCount}개를 구매하였습니다. (남은 금액: ${changes.toLocaleString()}원)`,
};

export const ALERT_MESSAGE = {
  EMPTY_NUMBERS: "모든 번호를 입력해주세요.",
  DUPLICATED_NUMBERS: "중복된 숫자가 있습니다.",
};
