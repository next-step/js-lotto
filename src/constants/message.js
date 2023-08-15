const ERROR = Object.freeze({
  EMPTY_STRING: '빈 공백은 입력이 불가능합니다.',
  IS_NOT_POSITIVE_NUMBER: '0 이상의 정수만 입력이 가능합니다.',
  PRODUCT_NOT_FOUND: '제품을 찾을 수 없습니다.',
  INSUFFICIENT_PURCHASE_AMOUNT: '구입 금액보다 상품의 가격이 높습니다.',
});

const READ = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
});

export const MESSAGE = Object.freeze({
  PREFIX: (message) => `> ${message}`,
  READ,
  ERROR,
});
