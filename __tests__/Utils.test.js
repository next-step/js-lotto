import { calcROI, comma } from '../src/js/utils';

const context = describe;
const INVALID_COMMA_PARAMETER = [
  ['10000000'],
  [[]],
  [{}],
  [null],
  [Number.MAX_SAFE_INTEGER + 1],
  [Infinity],
];

describe('유틸 기능 테스트', () => {
  describe('투자 대비 수익률(ROI) 계산 테스트', () => {
    context('5_000 과 8_000을 받는다.', () => {
      it('62.5를 리턴한다.', () => {
        // given
        const profit = 5_000;
        const investmentCost = 8_000;

        // when
        const rateOfReturn = calcROI(profit, investmentCost);

        // then
        expect(rateOfReturn).toBe(62.5);
      });
    });

    describe('숫자에 금액 단위로 콤마(,)를 추가한다.', () => {
      context('1_000_000 을 받으면', () => {
        it('문자열 1,000,000 반환한다.', () => {
          // given
          const money = 1_000_000;

          // when
          const output = comma(money);

          // then
          expect(output).toBe('1,000,000');
        });
      });

      context.each(INVALID_COMMA_PARAMETER)('%s 을 받으면', (money) => {
        it('에러를 발생시킨다.', () => {
          expect(() => comma(money)).toThrow();
        });
      });
    });
  });
});
