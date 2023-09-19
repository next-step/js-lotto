import ValidationError from "../ValidationError.js";

export class RetryError extends ValidationError {
  static ERROR_TYPE = " [Retry Error] ";
  static MESSAGE = "Retry 입력값은 y나 n 중 하나여야합니다.";

  constructor() {
    super(RetryError.ERROR_TYPE + RetryError.MESSAGE);
  }
}
