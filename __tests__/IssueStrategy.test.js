import {
  IssueStrategy,
  RandomIssueStrategy,
} from "../src/js/domain/LotteryMachine/IssueStrategy";
import { EmptyIssueStrategy } from "./utils/EmptyIssueStrategy";
import {
  IssueStrategyIsAbstractClassError,
  GetNumberNotImplementedError,
} from "../src/js/domain/LotteryMachine/errors";

describe("IssueStrategy 테스트", () => {
  it("new 키워드로 IssueStrategy 생성한 경우, 에러를 발생시킨다.", () => {
    expect(() => new IssueStrategy()).toThrow(
      IssueStrategyIsAbstractClassError
    );
  });

  it("IssueStrategy 상속 클래스에서 getNumber를 구현하지 않고 바로 호출한 경우, 에러를 발생시킨다.", () => {
    const emptyStrategy = new EmptyIssueStrategy();
    expect(() => emptyStrategy.getNumber()).toThrow(
      GetNumberNotImplementedError
    );
  });
});

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
