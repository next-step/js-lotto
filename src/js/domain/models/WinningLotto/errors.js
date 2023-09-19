import ValidationError from "../../ValidationError.js";

export class LottoIsNotLottoInstanceError extends ValidationError {
  static ERROR_TYPE = " [WinningLotto Error] ";
  static MESSAGE = "Lotto 인스턴스 형태가 아닙니다.";

  constructor() {
    super(
      LottoIsNotLottoInstanceError.ERROR_TYPE +
        LottoIsNotLottoInstanceError.MESSAGE
    );
  }
}

export class BonusNumberError extends ValidationError {
  static ERROR_TYPE = " [BonusNumber Error] ";

  constructor(message) {
    super(BonusNumberError.ERROR_TYPE + message);
  }
}

export class BonusNumberNotNumberError extends BonusNumberError {
  static MESSAGE = "보너스 번호는 숫자여야합니다.";

  constructor() {
    super(BonusNumberNotNumberError.MESSAGE);
  }
}

export class BonusNumberOutOfRangeError extends BonusNumberError {
  static MESSAGE = "보너스 번호는 [1, 45] 사이의 숫자여야합니다.";

  constructor() {
    super(BonusNumberOutOfRangeError.MESSAGE);
  }
}

export class BonusNumberDuplicatedError extends BonusNumberError {
  static MESSAGE = "보너스 번호는 당첨 번호와 중복되지 않아야합니다.";

  constructor() {
    super(BonusNumberDuplicatedError.MESSAGE);
  }
}
