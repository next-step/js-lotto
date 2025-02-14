import LottoNumber from "../../src/domain/LottoNumber.js";

describe("LottoNumber 클래스는", () => {
  describe("=== 생성에 대한 테스트 ===", () => {
    describe("> 생성할 때", () => {
      test.each([[1], [10], [45]])(
        "1부터 45 사이의 값 %i 을 가지면 객체 생성이 가능하다",
        (givenNumber) => {
          const lottoNumber = new LottoNumber(givenNumber);
          expect(lottoNumber.getValue()).toBe(givenNumber);
        },
      );

      test.each([[0], [46]])(
        "1 미만 또는 45 초과의 값 %i 이면 에러를 던진다",
        (givenNumber) => {
          expect(() => new LottoNumber(givenNumber)).toThrow();
        },
      );

      test.each([[null], ["1"], [1.1]])(
        "정수가 아닌 값 %s 을 전달받으면 에러를 던진다",
        (givenNumber) => {
          expect(() => new LottoNumber(givenNumber)).toThrow();
        },
      );
    });
  });
});
