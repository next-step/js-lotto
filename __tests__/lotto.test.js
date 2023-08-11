describe('로또 테스트', () => {
  it('로또는 여섯개의 숫자로 이루어진 배열을 매개변수로 받으며 그 값을 필드에 소유한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.numbers.length).toBe(6);
  });
});
