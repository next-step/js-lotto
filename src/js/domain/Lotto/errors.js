import RuntimeError from "../../RuntimeError";

export class NotArrayError extends RuntimeError {
  message = "로또 번호는 배열 형태여야합니다.";
  constructor(message) {
    super(message);
  }
}

export class LengthNotSixError extends RuntimeError {
  message = "로또 번호는 길이가 6인 배열 형태여야합니다.";
  constructor(message) {
    super(message);
  }
}

export class ElementNotNumberError extends RuntimeError {
  message = "로또 번호는 모두 숫자여야합니다.";
  constructor(message) {
    super(message);
  }
}

export class ElementOutOfRangeError extends RuntimeError {
  message = "로또 번호는 모두 [1, 45] 사이의 숫자여야합니다.";
  constructor(message) {
    super(message);
  }
}

export class ElementDuplicatedError extends RuntimeError {
  message = "로또 번호는 모두 중복되지 않아야합니다.";
  constructor(message) {
    super(message);
  }
}
