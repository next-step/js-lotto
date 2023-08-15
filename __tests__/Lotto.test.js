import Lotto from "../src/js/Lotto";

const ERROR_MESSAGE = Lotto.ERROR_MESSAGE;

describe("로또 객체 생성 테스트", () => {
  describe("생성자 유효성 검사 테스트", () => {
    it.each([1, "erica", true, null, undefined, function () {}, {}])(
      "배열 형태가 아니면, 에러를 발생시킨다.",
      (input) => {
        expect(() => new Lotto(input)).toThrow(ERROR_MESSAGE.NOT_ARRAY);
      }
    );
    it.each([[], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7]])(
      "배열 길이가 6이 아니라면, 에러를 발생시킨다.",
      (...input) => {
        expect(() => new Lotto(input)).toThrow(ERROR_MESSAGE.NOT_LENGTH_SIX);
      }
    );

    it.each([
      ["erica", 1, 1, 1, 1, 1],
      [" ", 1, 1, 1, 1, 1],
      ["", 1, 1, 1, 1, 1],
      ["1", 1, 1, 1, 1, 1],
      [true, 1, 1, 1, 1, 1],
      [null, 1, 1, 1, 1, 1],
      [undefined, 1, 1, 1, 1, 1],
      [function () {}, 1, 1, 1, 1, 1],
      [{}, 1, 1, 1, 1, 1],
    ])("배열 요소가 숫자가 아니면 에러를 발생시킨다.", (...input) => {
      expect(() => new Lotto(input)).toThrow(ERROR_MESSAGE.ELEMENT_NOT_NUMBER);
    });

    it.each([
      [-1, 2, 3, 4, 5, 6],
      [0, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 46],
    ])(
      "배열 요소 중 [1, 45]를 벗어난 숫자가 있다면, 에러를 발생시킨다.",
      (...input) => {
        expect(() => new Lotto(input)).toThrow(
          ERROR_MESSAGE.ELEMENT_OUT_OF_RANGE
        );
      }
    );

    it.each([
      [1, 1, 1, 1, 1, 1],
      [1, 2, 3, 4, 5, 5],
      [1, 2, 3, 4, 5, 1],
    ])("배열 요소 중 중복된 숫자가 있다면, 에러를 발생시킨다.", (...input) => {
      expect(() => new Lotto(input)).toThrow(ERROR_MESSAGE.ELEMENT_DUPLICATED);
    });

    it.each([
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 45],
    ])("유효한 입력값이면, 에러를 발생시키지 않는다.", (...input) => {
      expect(() => new Lotto(input)).not.toThrow();
    });
  });

  describe("생성자 내부 로직 테스트", () => {
    it("유효한 입력값이면, lotto 인스턴스의 lottoNumbers에 저장한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("lotto 인스턴스 생성시 matchCount와 matchBonus를 null로 초기화한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.getMatchCount()).toBe(null);
      expect(lotto.getMatchBonus()).toBe(null);
    });
  });

  describe("생성자 반환값 테스트", () => {
    it("생성자는 로또 객체를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });

  describe("from 메소드 테스트", () => {
    it("from 메소드는 lotto 객체를 생성해 반환한다.", () => {
      const lotto = Lotto.from([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });
});
