import RuntimeError from "../../RuntimeError";

export class IssueStrategyIsAbstractClassError extends RuntimeError {
  static MESSAGE = "new 키워드로 IssueStrategy를 생성해서는 안됩니다.";

  constructor() {
    super(IssueStrategyIsAbstractClassError.MESSAGE);
  }
}

export class getNumberNotImplementedError extends RuntimeError {
  static MESSAGE =
    "IssueStrategy를 상속하는 클래스는 getNumber()를 구현해야합니다.";

  constructor() {
    super(getNumberNotImplementedError.MESSAGE);
  }
}
