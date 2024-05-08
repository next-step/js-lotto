describe("Util", () => {
  test("돈의 단위는 자연수이다.", () => {
    // given
    const money = 1000;

    // when
    const isNaturalNumber = Util.isNaturalNumber(money);

    // then
    expect(isNaturalNumber).toBe(true);
  });
});
