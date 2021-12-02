export const STATUS_MESSAGE = {
  LOTTO_PURCHASE: (ticketCount, changes) =>
    `총 ${ticketCount}개를 구매하였습니다. (남은 금액: ${changes.toLocaleString()}원)`,
};

export const ALERT_MESSAGE = {
  NO_LOTTO_TICKET: "아직 로또를 구입하지 않았습니다.",
  EMPTY_NUMBERS: "모든 번호를 입력해주세요.",
  DUPLICATED_NUMBERS: "중복된 숫자가 있습니다.",
  INVAILD_NUMBER_RANGE: (min, max) => `${min}와(과) ${max}사이의 숫자만 입력할 수 있습니다.`,
};
