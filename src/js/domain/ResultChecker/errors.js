import RuntimeError from "../../RuntimeError.js";

export class PurchasedShouldPositiveError extends RuntimeError {
  static MESSAGE = "구매 금액은 0 이상의 양수여야합니다.";

  constructor() {
    super(PurchasedShouldPositiveError.MESSAGE);
  }
}

export class PurchasedShouldMultipleOfThousandError extends RuntimeError {
  static MESSAGE = "구매 금액은 0 이상의 양수여야합니다.";

  constructor() {
    super(PurchasedShouldMultipleOfThousandError.MESSAGE);
  }
}
