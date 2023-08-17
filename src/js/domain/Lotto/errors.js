import RuntimeError from "../../RuntimeError";

export class NotArrayError extends RuntimeError {
  static MESSAGE = "로또 번호는 배열 형태여야합니다.";

  constructor() {
    super(NotArrayError.MESSAGE);
  }
}

export class LengthNotSixError extends RuntimeError {
  static MESSAGE = "로또 번호는 길이가 6인 배열 형태여야합니다.";

  constructor() {
    super(LengthNotSixError.MESSAGE);
  }
}

export class ElementNotNumberError extends RuntimeError {
  static MESSAGE = "로또 번호는 모두 숫자여야합니다.";

  constructor() {
    super(ElementNotNumberError.MESSAGE);
  }
}

export class ElementOutOfRangeError extends RuntimeError {
  static MESSAGE = "로또 번호는 모두 [1, 45] 사이의 숫자여야합니다.";

  constructor() {
    super(ElementOutOfRangeError.MESSAGE);
  }
}

export class ElementDuplicatedError extends RuntimeError {
  static MESSAGE = "로또 번호는 모두 중복되지 않아야합니다.";

  constructor() {
    super(ElementDuplicatedError.MESSAGE);
  }
}
