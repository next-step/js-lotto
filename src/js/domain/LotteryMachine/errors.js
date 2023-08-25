import RuntimeError from "../../RuntimeError.js";

export class PurchasingPriceNotNumberError extends RuntimeError {
  static MESSAGE = "구매 금액은 숫자여야합니다.";

  constructor() {
    super(PurchasingPriceNotNumberError.MESSAGE);
  }
}

export class PurchasingPriceShouldAboveZeroError extends RuntimeError {
  static MESSAGE = "구매 금액은 0 이상이어야합니다.";

  constructor() {
    super(PurchasingPriceShouldAboveZeroError.MESSAGE);
  }
}

export class PurchasingPriceNotIntegerError extends RuntimeError {
  static MESSAGE = "구매 금액은 정수여야합니다.";

  constructor() {
    super(PurchasingPriceNotIntegerError.MESSAGE);
  }
}

export class PurchasingPriceUpperLimitError extends RuntimeError {
  static MESSAGE = "한 회차의 구매 금액은 10만원을 넘을 수 없습니다.";

  constructor() {
    super(PurchasingPriceUpperLimitError.MESSAGE);
  }
}

export class IssueStrategyIsAbstractClassError extends RuntimeError {
  static MESSAGE = "new 키워드로 IssueStrategy를 생성해서는 안됩니다.";

  constructor() {
    super(IssueStrategyIsAbstractClassError.MESSAGE);
  }
}

export class GetNumberNotImplementedError extends RuntimeError {
  static MESSAGE =
    "IssueStrategy를 상속하는 클래스는 _getNumber()를 구현해야합니다.";

  constructor() {
    super(GetNumberNotImplementedError.MESSAGE);
  }
}
