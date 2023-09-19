import ValidationError from "../../ValidationError.js";

export class PurchasingPriceError extends ValidationError {
  static ERROR_TYPE = " [PurchasingPrice Error] ";

  constructor(message) {
    super(PurchasingPriceError.ERROR_TYPE + message);
  }
}

export class PurchasingPriceNotNumberError extends PurchasingPriceError {
  static MESSAGE = "구매 금액은 숫자 형태여야합니다.";

  constructor() {
    super(PurchasingPriceNotNumberError.MESSAGE);
  }
}

export class PurchasingPriceIsNegativeError extends PurchasingPriceError {
  static MESSAGE = "구매 금액은 음수가 아니어야합니다.";

  constructor() {
    super(PurchasingPriceIsNegativeError.MESSAGE);
  }
}

export class PurchasingPriceLessLowerBoundError extends PurchasingPriceError {
  static MESSAGE = "구매 금액은 최소 1000원 이상이어야합니다.";

  constructor() {
    super(PurchasingPriceLessLowerBoundError.MESSAGE);
  }
}

export class PurchasingPriceAboveUpperBoundError extends PurchasingPriceError {
  static MESSAGE = "구매 금액은 100,000 초과하지않아야합니다.";

  constructor() {
    super(PurchasingPriceAboveUpperBoundError.MESSAGE);
  }
}
