import Product from '../src/js/domain/Product';
import { LOTTO } from '../src/js/constants';

const context = describe;
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
  describe('Product 생성자 테스트', () => {
    context(
      `상품명: ${LOTTO.NAME_KR}, 상품 금액: ${LOTTO.PRICE}을 인자로 가질 때`,
      () => {
        it('name, price 프로퍼티를 가진다.', () => {
          const lotto = new Product(LOTTO.NAME_KR, LOTTO.PRICE);

          expect(lotto).toHaveProperty('name');
          expect(lotto).toHaveProperty('price');
        });
      }
    );
  });

  describe('상품명 기능 테스트', () => {
    context.each(INVALID_PRODUCT_NAME)(
      '상품명으로 %s 가 주어질 때',
      (invalidProductName) => {
        it('에러를 TypeError를 Throw 한다.', () => {
          expect(() => new Product(invalidProductName, LOTTO.PRICE)).toThrow();
        });
      }
    );
  });

  describe('상품 금액 기능 테스트', () => {
    context.each(INVALID_PRODUCT_PRICE)(
      '상품금액으로 %s 는가 주어질 때',
      (invalidProductPrice) => {
        it('에러를 TypeError를 Throw 한다.', () => {
          expect(
            () => new Product(LOTTO.NAME_KR, invalidProductPrice)
          ).toThrow();
        });
      }
    );
  });
});
