import LottoCalculator from '../src/js/domain/LottoCalculator';

const context = describe;
const DUPLICATE_BONUS_NUMBERS = [[1], [2], [3], [4], [5], [6]];

describe('LottoCalculator 생성자 테스트', () => {
  context('당첨번호:[1, 2, 3, 4, 5, 6], 보너스번호:8가 주어질 때', () => {
    it('winningNumbers(당첨번호), bonusWinningNumber(보너스번호)를 프로퍼티로 가진다.', () => {
      const lottoCalc = new LottoCalculator([1, 2, 3, 4, 5, 6], 8);

      expect(lottoCalc).toHaveProperty('winningNumbers');
      expect(lottoCalc).toHaveProperty('bonusWinningNumber');
    });
  });

  context(
    '당첨번호로 [0, 0, 0, 45, 45, 46]와 같이 중복된 값이 주어질 때',
    () => {
      it('TypeError를 Throw 한다.', () => {
        expect(() => {
          new LottoCalculator([0, 0, 0, 45, 45, 46], 7);
        }).toThrow();
      });
    }
  );

  context.each(DUPLICATE_BONUS_NUMBERS)(
    'winningNumbers가 [1,2,3,4,5,6]이고 bonusWinningNumber가 %s 일때',
    (bonusNumber) => {
      it('번호가 중복되므로 TypeError를 Throw한다.', () => {
        expect(
          () => new LottoCalculator([1, 2, 3, 4, 5, 6], bonusNumber)
        ).toThrow();
      });
    }
  );
});
