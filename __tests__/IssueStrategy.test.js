import IssueStrategy from "../src/js/domain/LotteryMachine/IssueStrategy";
import EmptyIssueStrategy from "./utils/EmptyIssueStrategy";
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
    expect(() => emptyStrategy._getNumber()).toThrow(
      GetNumberNotImplementedError
    );
  });
});
