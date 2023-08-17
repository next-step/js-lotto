import { NUMBER } from './number';
import { LOTTO_PRIZE_BOARD } from './lotto';

const ERROR = Object.freeze({
  EMPTY_STRING: '빈 공백은 입력이 불가능합니다.',
  IS_NOT_POSITIVE_NUMBER: '0 이상의 정수만 입력이 가능합니다.',
  PRODUCT_NOT_FOUND: '제품을 찾을 수 없습니다.',
  INSUFFICIENT_PURCHASE_AMOUNT: '구입 금액보다 상품의 가격이 높습니다.',
});

const READ = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
  LOTTO_NUMBERS: '당첨 번호를 입력해 주세요.',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
});

const PRINT = Object.freeze({
  PURCHASED_AMOUNT: (amount) => `${amount}개를 구매했습니다.`,
  PROFIT: (profitRate) =>
    `총 수익률은 ${profitRate.toFixed(NUMBER.LOTTO_PROFIT_FIXED)}%입니다.`,
  PRIZE: (prizeCount) =>
    `당첨 통계\n--------------------\n3개 일치 (${LOTTO_PRIZE_BOARD[3]}원) - ${prizeCount[3]}개\n4개 일치 (${LOTTO_PRIZE_BOARD[4]}원) - ${prizeCount[4]}개\n5개 일치 (${LOTTO_PRIZE_BOARD[5].withoutBonus}원) - ${prizeCount[5].withoutBonus}개\n5개 일치, 보너스 볼 일치 (${LOTTO_PRIZE_BOARD[5].withBonus}원) - ${prizeCount[5].withBonus}개\n6개 일치 (${LOTTO_PRIZE_BOARD[6]}원) - ${prizeCount[6]}개`,
});

export const MESSAGE = Object.freeze({
  PREFIX: (message) => `> ${message}`,
  READ,
  PRINT,
  ERROR,
});
