import Product from '../src/js/domain/Product';
import { LOTTO } from '../src/js/constants';

const INVALID_PRODUCT_NAME = [
  ['ABCDEABCDEABCDEA'],
  [20],
  [[]],
  [{}],
  [null],
  [''],
  ['   '],
  [Infinity],
];
const INVALID_PRODUCT_PRICE = [
  ['1000'],
  [[]],
  [{}],
  [null],
  [Number.MAX_SAFE_INTEGER + 1],
  [Infinity],
];

describe('상품 기능 테스트', () => {
  it('상품명, 상품 금액을 가진다.', () => {
    // given

    // when
    const lotto = new Product(LOTTO.NAME_KR, LOTTO.PRICE);

    // then
    expect(lotto).toHaveProperty('name');
    expect(lotto).toHaveProperty('price');
  });

  describe('상품명 기능 테스트', () => {
    it.each(INVALID_PRODUCT_NAME)(
      '%s 는 상품명이 될 수 없다.',
      (invalidProductName) => {
        expect(() => new Product(invalidProductName, LOTTO.PRICE)).toThrow();
      }
    );
  });

  describe('상품 금액 기능 테스트', () => {
    it.each(INVALID_PRODUCT_PRICE)(
      '%s 는 상품 금액이 될 수 없다.',
      (invalidProductPrice) => {
        expect(() => new Product(LOTTO.NAME_KR, invalidProductPrice)).toThrow();
      }
    );
  });
});
