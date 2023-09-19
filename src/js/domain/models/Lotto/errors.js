import ValidationError from "../../ValidationError.js";

export class LottoNumbersError extends ValidationError {
  static ERROR_TYPE = " [LottoNumbers Error] ";

  constructor(message) {
    super(LottoNumbersError.ERROR_TYPE + message);
  }
}

export class LottoNumbersNotArrayError extends LottoNumbersError {
  static MESSAGE = "로또 번호는 배열 형태여야합니다.";

  constructor() {
    super(LottoNumbersNotArrayError.MESSAGE);
  }
}

export class LottoNumbersLengthNotSixError extends LottoNumbersError {
  static MESSAGE = "로또 번호는 길이가 6인 배열 형태여야합니다.";

  constructor() {
    super(LottoNumbersLengthNotSixError.MESSAGE);
  }
}

export class LottoNumberNotNumberError extends LottoNumbersError {
  static MESSAGE = "로또 번호는 모두 숫자여야합니다.";

  constructor() {
    super(LottoNumberNotNumberError.MESSAGE);
  }
}

export class LottoNumberOutOfRangeError extends LottoNumbersError {
  static MESSAGE = "로또 번호는 모두 [1, 45] 사이의 숫자여야합니다.";

  constructor() {
    super(LottoNumberOutOfRangeError.MESSAGE);
  }
}

export class LottoNumberDuplicatedError extends LottoNumbersError {
  static MESSAGE = "로또 번호는 모두 중복되지 않아야합니다.";

  constructor() {
    super(LottoNumberDuplicatedError.MESSAGE);
  }
}
