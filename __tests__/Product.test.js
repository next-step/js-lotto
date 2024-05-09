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
const INVALID_BUY_PARAMETERS = [
  ['1000'],
  [Infinity],
  [Number.MAX_SAFE_INTEGER + 1],
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
  it.each(INVALID_PRODUCT_NAME)(
    '%s 는 상품명이 될 수 없다.',
    (invalidProductName) => {
      expect(() => new Product(invalidProductName, LOTTO.PRICE)).toThrow();
    }
  );
  it.each(INVALID_PRODUCT_PRICE)(
    '%s 는 상품 금액이 될 수 없다.',
    (invalidProductPrice) => {
      expect(() => new Product(LOTTO.NAME_KR, invalidProductPrice)).toThrow();
    }
  );

  describe('상품 구매', () => {
    it('지불할 금액이 상품금액보다 적다면 에러를 발생한다.', () => {
      const lotto = new Product(LOTTO.NAME_KR, LOTTO.PRICE);

      expect(() => lotto.buy(800)).toThrow();
    });

    it('지불할 금액이 상품금액보다 많다면 잔돈을 반환한다.', () => {
      // given
      const lotto = new Product(LOTTO.NAME_KR, LOTTO.PRICE);

      // when
      const change = lotto.buy(2_000);

      // then
      expect(change).toBe(1_000);
    });

    it.each(INVALID_BUY_PARAMETERS)(
      '"%s" 는 buy() 매개변수로 전달될 수 없습니다.',
      (invalidValue) => {
        const lotto = new Product(LOTTO.NAME_KR, LOTTO.PRICE);
        expect(() => lotto.buy(invalidValue)).toThrow();
      }
    );
  });
});
