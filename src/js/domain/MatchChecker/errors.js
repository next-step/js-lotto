import RuntimeError from "../../RuntimeError.js";

export class BonusNumberNotNumberError extends RuntimeError {
  static MESSAGE = "보너스 번호는 숫자여야합니다.";

  constructor() {
    super(BonusNumberNotNumberError.MESSAGE);
  }
}

export class BonusNumberOutOfRangeError extends RuntimeError {
  static MESSAGE = "보너스 번호는 [1, 45] 사이의 숫자여야합니다.";

  constructor() {
    super(BonusNumberOutOfRangeError.MESSAGE);
  }
}

export class BonusNumberDuplicatedError extends RuntimeError {
  static MESSAGE = "보너스 번호는 당첨 번호와 중복되지 않아야합니다.";

  constructor() {
    super(BonusNumberDuplicatedError.MESSAGE);
  }
}

export class WinningLottoNotDefinedError extends RuntimeError {
  static MESSAGE = "당첨 로또가 설정되지 않았습니다.";

  constructor() {
    super(WinningLottoNotDefinedError.MESSAGE);
  }
}
