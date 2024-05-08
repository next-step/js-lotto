describe('로또 입출력에 관한 테스트 케이스', () => {
  test('구매 금액을 입력받는다.', async () => {
    //given
    const lottoIO = new LottoIO();

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const purchasePrice = await lottoIO.inputPurchasePrice();

    //then
    expect(purchasePrice).toBe('7000');
  });
});
