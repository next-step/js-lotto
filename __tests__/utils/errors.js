import RuntimeError from "../../src/js/RuntimeError";

export class FixedNumberNotArrayError extends RuntimeError {
  static MESSAGE = "고정 숫자는 배열이어야합니다.";

  constructor() {
    super(FixedNumberNotArrayError.MESSAGE);
  }
}

export class FixedNumberLengthNotSixError extends RuntimeError {
  static MESSAGE = "고정 숫자는 6개여야합니다.";

  constructor() {
    super(FixedNumberLengthNotSixError.MESSAGE);
  }
}

export class FixedNumberElementNotNumberError extends RuntimeError {
  static MESSAGE = "고정 숫자의 요소는 숫자여야합니다.";

  constructor() {
    super(FixedNumberElementNotNumberError.MESSAGE);
  }
}

export class FixedNumberElementOutOfRangeError extends RuntimeError {
  static MESSAGE = "고정 숫자의 요소는 1부터 45 사이여야합니다.";

  constructor() {
    super(FixedNumberElementOutOfRangeError.MESSAGE);
  }
}

export class FixedNumberElementDuplicatedError extends RuntimeError {
  static MESSAGE = "고정 숫자의 요소는 중복되지 않아야합니다.";

  constructor() {
    super(FixedNumberElementDuplicatedError.MESSAGE);
  }
}
