import { generateRandomNumbersToArray } from '../../src/js/utils/index.js';
import { LOTTO } from '../../src/js/constants';

describe('로또 번호를 생성하는 함수를 테스트한다.', () => {
  it('로또 번호는 1~45의 범위안에 존재해야 한다.', () => {
    const MIN_INDEX = 0;
    const MAX_INDEX = 5;
    const randomNumbersArray = Array.from({ length: 1000 }, () =>
      generateRandomNumbersToArray(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_AMOUNT),
    );

    cy.wrap(randomNumbersArray).each((elem) => {
      expect(elem[MIN_INDEX]).to.gte(LOTTO.MIN_NUMBER);
      expect(elem[MAX_INDEX]).to.lte(LOTTO.MAX_NUMBER);
    });
  });

  it('로또 번호는 6개가 존재해야 한다.', () => {
    const randomNumbersArray = Array.from({ length: 1000 }, () =>
      generateRandomNumbersToArray(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_AMOUNT),
    );

    cy.wrap(randomNumbersArray).each((elem) => {
      expect(elem.length).to.eq(LOTTO.NUMBER_AMOUNT);
    });
  });
});
