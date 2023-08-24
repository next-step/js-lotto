import RuntimeError from "../../RuntimeError.js";

export class LottoNumbersNotArrayError extends RuntimeError {
  static MESSAGE = "로또 번호는 배열 형태여야합니다.";

  constructor() {
    super(LottoNumbersNotArrayError.MESSAGE);
  }
}

export class LottoNumbersLengthNotSixError extends RuntimeError {
  static MESSAGE = "로또 번호는 길이가 6인 배열 형태여야합니다.";

  constructor() {
    super(LottoNumbersLengthNotSixError.MESSAGE);
  }
}

export class LottoNumbersElementNotNumberError extends RuntimeError {
  static MESSAGE = "로또 번호는 모두 숫자여야합니다.";

  constructor() {
    super(LottoNumbersElementNotNumberError.MESSAGE);
  }
}

export class LottoNumbersElementOutOfRangeError extends RuntimeError {
  static MESSAGE = "로또 번호는 모두 [1, 45] 사이의 숫자여야합니다.";

  constructor() {
    super(LottoNumbersElementOutOfRangeError.MESSAGE);
  }
}

export class LottoNumbersElementDuplicatedError extends RuntimeError {
  static MESSAGE = "로또 번호는 모두 중복되지 않아야합니다.";

  constructor() {
    super(LottoNumbersElementDuplicatedError.MESSAGE);
  }
}

export class LottoMatchResultNotSetError extends RuntimeError {
  static MESSAGE = "로또 매치 결과가 설정되지 않았습니다.";

  constructor() {
    super(LottoMatchResultNotSetError.MESSAGE);
  }
}
