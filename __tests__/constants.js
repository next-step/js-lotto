export const LOTTO_TICKET_CASES = [
  [1, 2, 3, 4, 5, 6], // 6개 일치
  [1, 2, 3, 4, 5, 7], // 5개 일치, 보너스 o
  [1, 2, 3, 4, 5, 16], // 5개 일치
  [1, 2, 3, 4, 15, 16], // 4개 일치
  [1, 2, 3, 14, 15, 16], // 3개 일치
  [1, 2, 13, 14, 15, 16], // 2개 일치
  [1, 12, 13, 14, 15, 16], // 1개 일치
  [11, 12, 13, 14, 15, 16], // 0개 일치
];


export const LOTTO_WINNING_NUMBERS = {
    lottoWinningNumbers: [1, 2, 3, 4, 5, 6],
    lottoBonusNumber: 7,
  };