export const STATUS_MESSAGE = {
  LOTTO_PURCHASE: (ticketCount, changes) =>
    `총 ${ticketCount}개를 구매하였습니다. (남은 금액: ${changes.toLocaleString()}원)`,
};
