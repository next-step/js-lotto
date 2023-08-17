import { LottoMachine } from '../src/js/domain/LottoMachine';

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
});
