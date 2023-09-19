import ValidationError from "../../ValidationError.js";

export class RankNotNumberError extends ValidationError {
  static MESSAGE = "순위는 숫자여야합니다.";

  constructor() {
    super(RankNotNumberError.MESSAGE);
  }
}

export class RankOutOfRangeError extends ValidationError {
  static MESSAGE = "순위는 [1, 6] 사이 범위여야합니다.";

  constructor() {
    super(RankOutOfRangeError.MESSAGE);
  }
}
