import {
  FixedIssueStrategy,
  RandomIssueStrategy,
} from "../src/js/domain/LotteryMachine/IssueStrategy";
import {
  FixedNumberElementDuplicatedError,
  FixedNumberElementNotNumberError,
  FixedNumberElementOutOfRangeError,
  FixedNumberLengthNotSixError,
  FixedNumberNotArrayError,
} from "../src/js/domain/LotteryMachine/errors";

describe("RandomIssueStrategy	테스트", () => {
  describe("getNumber() 테스트", () => {
    it("lowerBound, upperBound 없이 생성하면, [1, 45] 사이 숫자를 반환한다.", () => {
      const randomIssueStrategy = new RandomIssueStrategy();
      expect(randomIssueStrategy.getNumber()).toBeGreaterThanOrEqual(1);
      expect(randomIssueStrategy.getNumber()).toBeLessThanOrEqual(45);
    });

    it("lowerBound, upperBound가 주어진 경우, [lowerBound, upperBound] 사이 숫자를 반환한다.", () => {
      const randomIssueStrategy = new RandomIssueStrategy(0, 100);
      expect(randomIssueStrategy.getNumber()).toBeGreaterThanOrEqual(1);
      expect(randomIssueStrategy.getNumber()).toBeLessThanOrEqual(100);
    });
  });

  describe("getLottoNumbers()	테스트", () => {
    const randomIssueStrategy = new RandomIssueStrategy();
    const lottoNumbers = randomIssueStrategy.getLottoNumbers();
    it("배열을 반환한다.", () => {
      expect(lottoNumbers).toBeInstanceOf(Array);
    });
    it("배열 길이는 6이다.", () => {
      expect(lottoNumbers.length).toBe(6);
    });

    it("배열의 모든 요소는 숫자이다.", () => {
      lottoNumbers.forEach((number) => {
        expect(typeof number === "number").toBe(true);
      });
    });

    it("배열의 모든 요소는 1 이상 45 이하이다.", () => {
      lottoNumbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
    it("배열의 모든 요소는 중복되지 않는다.", () => {
      const lottoNumbersSet = new Set(lottoNumbers);
      expect(lottoNumbersSet.size).toBe(6);
    });
  });
});

describe("FixedIssueStrategy	테스트", () => {
  describe("생성자 유효성 검사 테스트", () => {
    describe("생성자가 배열 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each([1, "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (fixedNumbers) => {
          expect(() => new FixedIssueStrategy(fixedNumbers)).toThrow(
            FixedNumberNotArrayError
          );
        }
      );
    });

    describe("배열의 길이가 6이 아니면, 에러를 발생시킨다.", () => {
      it.each([
        { fixedNumbers: [] },
        { fixedNumbers: [1, 2, 3, 4, 5] },
        { fixedNumbers: [1, 2, 3, 4, 5, 6, 7] },
      ])("$fixedNumbers", ({ fixedNumbers }) => {
        expect(() => new FixedIssueStrategy(fixedNumbers)).toThrow(
          FixedNumberLengthNotSixError
        );
      });
    });

    describe("요소 중 숫자가 아닌 값이 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { fixedNumbers: ["erica", 1, 1, 1, 1, 1] },
        { fixedNumbers: [" ", 1, 1, 1, 1, 1] },
        { fixedNumbers: ["", 1, 1, 1, 1, 1] },
        { fixedNumbers: ["1", 1, 1, 1, 1, 1] },
        { fixedNumbers: [true, 1, 1, 1, 1, 1] },
        { fixedNumbers: [null, 1, 1, 1, 1, 1] },
        { fixedNumbers: [undefined, 1, 1, 1, 1, 1] },
        { fixedNumbers: [function () {}, 1, 1, 1, 1, 1] },
        { fixedNumbers: [{}, 1, 1, 1, 1, 1] },
      ])("$fixedNumbers", ({ fixedNumbers }) => {
        expect(() => new FixedIssueStrategy(fixedNumbers)).toThrow(
          FixedNumberElementNotNumberError
        );
      });
    });

    describe("요소 중 [1, 45]를 벗어난 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { fixedNumbers: [-1, 2, 3, 4, 5, 6] },
        { fixedNumbers: [0, 2, 3, 4, 5, 6] },
        { fixedNumbers: [1, 2, 3, 4, 5, 46] },
      ])("$fixedNumbers", ({ fixedNumbers }) => {
        expect(() => new FixedIssueStrategy(fixedNumbers)).toThrow(
          FixedNumberElementOutOfRangeError
        );
      });
    });

    describe("요소 중 중복된 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { fixedNumbers: [1, 1, 1, 1, 1, 1] },
        { fixedNumbers: [1, 2, 3, 4, 5, 5] },
        { fixedNumbers: [1, 2, 3, 4, 5, 1] },
      ])("$fixedNumbers", ({ fixedNumbers }) => {
        expect(() => new FixedIssueStrategy(fixedNumbers)).toThrow(
          FixedNumberElementDuplicatedError
        );
      });
    });

    describe("유효하면, 에러를 발생시키지 않는다.", () => {
      it.each([
        { fixedNumbers: [1, 2, 3, 4, 5, 6] },
        { fixedNumbers: [1, 2, 3, 4, 5, 45] },
      ])("$fixedNumbers", ({ fixedNumbers }) => {
        expect(() => new FixedIssueStrategy(fixedNumbers)).not.toThrow();
      });
    });
  });

  describe("getNumber() 테스트", () => {
    const fixedIssueStrategy = new FixedIssueStrategy([1, 2, 3, 4, 5, 6]);
    it("고정 숫자를 순서대로 반환한다.", () => {
      expect(fixedIssueStrategy.getNumber()).toBe(1);
      expect(fixedIssueStrategy.getNumber()).toBe(2);
      expect(fixedIssueStrategy.getNumber()).toBe(3);
      expect(fixedIssueStrategy.getNumber()).toBe(4);
      expect(fixedIssueStrategy.getNumber()).toBe(5);
      expect(fixedIssueStrategy.getNumber()).toBe(6);
    });
  });

  describe("getLottoNumbers() 테스트", () => {
    const fixedIssueStrategy = new FixedIssueStrategy([1, 2, 3, 4, 5, 6]);
    const lottoNumbers = fixedIssueStrategy.getLottoNumbers();

    it("배열을 반환한다.", () => {
      expect(lottoNumbers).toBeInstanceOf(Array);
    });

    it("배열 길이는 6이다.", () => {
      expect(lottoNumbers.length).toBe(6);
    });

    it("배열의 모든 요소는 숫자이다.", () => {
      lottoNumbers.forEach((number) => {
        expect(typeof number === "number").toBe(true);
      });
    });

    it("배열의 모든 요소는 1 이상 45 이하이다.", () => {
      lottoNumbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });

    it("배열의 모든 요소는 중복되지 않는다.", () => {
      const lottoNumbersSet = new Set(lottoNumbers);
      expect(lottoNumbersSet.size).toBe(6);
    });

    it("배열은 고정 숫자로 구성되어 있다.", () => {
      expect(lottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
