import RuntimeError from "../../RuntimeError.js";

export class PurchasingPriceNotNumberError extends RuntimeError {
  static MESSAGE = "구매 금액은 숫자 형태여야합니다.";

  constructor() {
    super(PurchasingPriceNotNumberError.MESSAGE);
  }
}

export class PurchasingPriceIsNegativeError extends RuntimeError {
  static MESSAGE = "구매 금액은 음수가 아니어야합니다.";

  constructor() {
    super(PurchasingPriceIsNegativeError.MESSAGE);
  }
}

export class PurchasingPriceLessLowerBoundError extends RuntimeError {
  static MESSAGE = "구매 금액은 최소 1000원 이상이어야합니다.";

  constructor() {
    super(PurchasingPriceLessLowerBoundError.MESSAGE);
  }
}

export class PurchasingPriceAboveUpperBoundError extends RuntimeError {
  static MESSAGE = "구매 금액은 100,000 초과하지않아야합니다.";

  constructor() {
    super(PurchasingPriceAboveUpperBoundError.MESSAGE);
  }
}
