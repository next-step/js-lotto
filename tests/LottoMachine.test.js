describe('LottoMachine', () => {
  describe('first', () => {
    test('로또는 천원 단위로 구매 가능하다', () => {
      const lottoMachine = new LottoMachine();

      const lotto = lottoMachine.issueLotto(1000);

      expect(lotto).toBeDefined();
    });

    test.each([1111, -1, 0, 2134])('.issueLotto(%i)', (amount) => {
      const lottoMachine = new LottoMachine();
      expect(() => lottoMachine.issueLotto(amount)).toThrowError();
    });
  });
});
