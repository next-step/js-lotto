import { NUMBER } from './number';
import { LOTTO_PRIZE_BOARD } from './lotto';

const ERROR = Object.freeze({
  EMPTY_STRING: '빈 공백은 입력이 불가능합니다.',
  IS_NOT_POSITIVE_NUMBER: '0 이상의 정수만 입력이 가능합니다.',
  PRODUCT_NOT_FOUND: '제품을 찾을 수 없습니다.',
  INSUFFICIENT_PURCHASE_AMOUNT: '구입 금액보다 상품의 가격이 높습니다.',
  INVALID_RESTART_INPUT: '"y" 또는 "n"만 입력해주세요.',

  INVALID_LOTTO_LENGTH: (length) => `로또는 ${length}자리 숫자입니다.`,
  INVALID_LOTTO_RANGE: (min, max) =>
    `로또 번호는 ${min}~${max} 사이의 숫자만 가능합니다.`,
  DUPLICATE_LOTTO_NUMBERS: '로또 번호에 중복된 숫자가 있습니다.',
  INVALID_BONUS_NUMBER_RANGE: (min, max) =>
    `보너스 번호는 ${min}~${max} 사이의 숫자만 가능합니다.`,
  DUPLICATE_BONUS_NUMBER: '보너스 번호는 로또 번호와 중복될 수 없습니다.',
  OVERFLOW_LOTTO_LENGTH: '로또는 최대 6자리 수입니다.',
});

const READ = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
  LOTTO_NUMBERS: '당첨 번호를 입력해 주세요.',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
  RESTART: '다시 시작하시겠습니까? (y/n)',
});

const PRINT = Object.freeze({
  PURCHASED_AMOUNT: (amount) => `${amount}개를 구매했습니다.`,
  PROFIT: (profitRate) =>
    `총 수익률은 ${profitRate.toFixed(NUMBER.LOTTO_PROFIT_FIXED)}%입니다.`,
  PRIZE: (prizes) =>
    `당첨 통계\n--------------------\n3개 일치 (${LOTTO_PRIZE_BOARD[3]}원) - ${
      prizes.filter((prize) => prize.matchingCount === 3).length
    }개\n4개 일치 (${LOTTO_PRIZE_BOARD[4]}원) - ${
      prizes.filter((prize) => prize.matchingCount === 4).length
    }개\n5개 일치 (${LOTTO_PRIZE_BOARD[5].withoutBonus}원) - ${
      prizes.filter(
        (prize) => prize.matchingCount === 5 && !prize.isBonusMatched
      ).length
    }개\n5개 일치, 보너스 볼 일치 (${LOTTO_PRIZE_BOARD[5].withBonus}원) - ${
      prizes.filter(
        (prize) => prize.matchingCount === 5 && prize.isBonusMatched
      ).length
    }개\n6개 일치 (${LOTTO_PRIZE_BOARD[6]}원) - ${
      prizes.filter((prize) => prize.matchingCount === 6).length
    }개`,
});

export const MESSAGE = Object.freeze({
  PREFIX: (message) => `> ${message}`,
  READ,
  PRINT,
  ERROR,
});
