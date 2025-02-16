import Lotto from "../src/domain/Lotto";

describe("로또 발급 번호 테스트", () => {
  test("로또 번호는 6개의 숫자이다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.numbers.length).toBe(6);
  });

  test("로또 번호가 6개 이하면 에러를 발생시킨다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow(
      "로또 번호는 6개여야 합니다."
    );
  });

  test("로또 번호에 숫자가 아닌 타입이 들어오면 에러를 발생시킨다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, "6"])).toThrow(
      "로또 번호는 숫자만 가능합니다."
    );
  });

  test.each([[[0, 1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 46]]])(
    "로또 번호가 1~45 사이의 숫자가 아니면 에러를 발생시킨다.",
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(
        "로또 번호는 1부터 45사이의 숫자여야 합니다."
      );
    }
  );

  test("로또 번호가 서로 중복되면 에러를 발생시킨다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(
      "로또 번호는 중복될 수 없습니다."
    );
  });
});
