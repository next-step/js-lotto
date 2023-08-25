import {
  LOTTO_FIFTH_PRIZE,
  LOTTO_FIRST_PRIZE,
  LOTTO_FOURTH_PRIZE,
  LOTTO_SECOND_PRIZE,
  LOTTO_THIRD_PRIZE,
} from '../src/js/constants/lotto';
import { Lotto } from '../src/js/domain/Lotto';
import { LottoMachine } from '../src/js/domain/LottoMachine';
import { WinningLotto } from '../src/js/domain/WinningLotto';

describe('LottoMachine', () => {
  describe('로또 발급', () => {
    it('로또는 천원 단위로 구매 가능하다', () => {
      const lottoMachine = new LottoMachine();

      const lottos = lottoMachine.issueLotto(1000);

      lottos.forEach((lotto) => {
        expect(lotto).not.toBeNull();
      });
    });

    describe('천원 단위가 아닐 경우 에러가 발생한다.', () => {
      test.each([1111, -1, 0, 2134])('.issueLotto(%i)', (amount) => {
        const lottoMachine = new LottoMachine();

        expect(() => lottoMachine.issueLotto(amount)).toThrowError();
      });
    });

    describe('구매 금액 만큼 로또를 발행한다', () => {
      test.each([
        [1000, 1],
        [3000, 3],
        [10000, 10],
        [13000, 13],
        [100000, 100],
      ])('.issueLotto(%i)', (amount, numberOfLotto) => {
        const lottoMachine = new LottoMachine();
        const lottos = lottoMachine.issueLotto(amount);

        expect(numberOfLotto).toBe(lottos.length);
      });
    });
  });

  describe('로또 당첨', () => {
    describe('구매한 로또와 당첨 로또를 비교해서 맞춘 숫자를 계산한다.', () => {
      test.each([
        [[2, 4, 10, 23, 43, 45], [2, 4, 10, 23, 43, 45], 6],
        [[1, 2, 4, 10, 23, 43], [2, 4, 10, 23, 43, 45], 5],
        [[3, 5, 10, 23, 43, 4], [2, 4, 10, 23, 43, 45], 4],
        [[3, 5, 11, 23, 43, 4], [2, 4, 10, 23, 43, 45], 3],
        [[3, 5, 11, 24, 43, 4], [2, 4, 10, 23, 43, 45], 2],
        [[3, 5, 11, 24, 44, 4], [2, 4, 10, 23, 43, 45], 1],
      ])(
        '.getNumberOfMatchNumber(%p, %p)',
        (lottoNumbers, winningNumbers, matchNumber) => {
          const lottoMachine = new LottoMachine();
          const lotto = new Lotto(lottoNumbers);
          const winningLotto = new WinningLotto(new Lotto(winningNumbers), 1);

          const numberOfMatchNumber = lottoMachine.getNumberOfMatchNumber(
            lotto,
            winningLotto
          );

          expect(numberOfMatchNumber).toBe(matchNumber);
        }
      );
    });

    it('구매한 로또와 당첨번호, 보너스 번호를 입력하면 각 등수에 해당하는 로또를 반환한다', () => {
      const lottoMachine = new LottoMachine();

      const lotto1 = new Lotto([2, 4, 10, 23, 43, 45]);
      const lotto2 = new Lotto([1, 2, 4, 10, 23, 43]);
      const lotto3 = new Lotto([2, 4, 10, 23, 43, 44]);
      const lotto4 = new Lotto([3, 5, 10, 23, 43, 45]);
      const lotto5 = new Lotto([3, 5, 11, 23, 43, 45]);
      const lotto6 = new Lotto([3, 5, 11, 24, 44, 45]);

      const winningLotto = new WinningLotto(
        new Lotto([2, 4, 10, 23, 43, 45]),
        1
      );

      const result = lottoMachine.checkWinningLotto(
        [lotto1, lotto2, lotto3, lotto4, lotto5, lotto6],
        winningLotto
      );

      expect(result.FIRST.length).toBe(1);
      expect(result.SECOND.length).toBe(1);
      expect(result.THIRD.length).toBe(1);
      expect(result.FOURTH.length).toBe(1);
      expect(result.FIFTH.length).toBe(1);
    });

    describe('총 당첨금을 반환한다.', () => {
      test.each([
        [
          [[2, 4, 10, 23, 43, 45]],
          [2, 4, 10, 23, 43, 45],
          1,
          LOTTO_FIRST_PRIZE,
        ],
        [
          [[1, 2, 4, 10, 23, 43]],
          [2, 4, 10, 23, 43, 45],
          1,
          LOTTO_SECOND_PRIZE,
        ],
        [
          [[2, 4, 10, 23, 43, 44]],
          [2, 4, 10, 23, 43, 45],
          1,
          LOTTO_THIRD_PRIZE,
        ],
        [
          [[3, 5, 10, 23, 43, 45]],
          [2, 4, 10, 23, 43, 45],
          1,
          LOTTO_FOURTH_PRIZE,
        ],
        [
          [[3, 5, 11, 23, 43, 45]],
          [2, 4, 10, 23, 43, 45],
          1,
          LOTTO_FIFTH_PRIZE,
        ],
        [[[3, 5, 11, 24, 44, 4]], [2, 4, 10, 23, 43, 45], 1, 0],
        [
          [
            [2, 4, 10, 23, 43, 45],
            [1, 2, 4, 10, 23, 43],
          ],
          [2, 4, 10, 23, 43, 45],
          1,
          LOTTO_FIRST_PRIZE + LOTTO_SECOND_PRIZE,
        ],
      ])(
        '.checkWinningLotto(%p, %p)',
        (lottoNumbers, winningNumbers, bonusNumber, winningPrize) => {
          const lottoMachine = new LottoMachine();
          const lottos = lottoNumbers.map((numbers) => new Lotto(numbers));
          const winningLotto = new WinningLotto(
            new Lotto(winningNumbers),
            bonusNumber
          );

          const result = lottoMachine.checkWinningLotto(lottos, winningLotto);

          expect(result.TOTAL_WINNING_PRIZE).toBe(winningPrize);
        }
      );
    });
  });
});
