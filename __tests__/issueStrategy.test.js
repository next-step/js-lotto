import { RandomIssueStrategy } from "../src/js/domain/LotteryMachine/IssueStrategy";

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

describe("FixedIssueStrategy	테스트", () => {});
