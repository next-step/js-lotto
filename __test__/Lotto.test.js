import Lotto from "../src/domain/Lotto";

describe("Lotto", () => {
  describe("로또의 번호는 6개이다.", () => {
    test.each([
      [5, [1, 2, 3, 4, 5]],
      [7, [1, 2, 3, 4, 5, 6, 7]],
    ])("당첨 번호가 %s개이면 에러를 던진다.", (_, numbers) => {
      expect(() => new Lotto(numbers)).toThrow(Error);
    });
  });

  describe("로또의 번호는 1부터 45까지의 자연수이다.", () => {
    test.each([-1, 0, 46, 1.3])(
      "당첨번호에 %s가 있는 경우 에러를 던진다.",
      (number) => {
        expect(() => new Lotto([1, 2, 3, 4, 5, number])).toThrow(Error);
      }
    );
  });

  describe("로또의 번호는 중복되지 않는다.", () => {
    test("당첨번호에 중복된 번호가 있는 경우 에러를 던진다.", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(Error);
    });
  });
});
