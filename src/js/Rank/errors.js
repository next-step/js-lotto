import RuntimeError from "../RuntimeError";

export class RankNotNumberError extends RuntimeError {
  static MESSAGE = "순위는 숫자여야합니다.";

  constructor() {
    super(RankNotNumberError.MESSAGE);
  }
}

export class RankOutOfRangeError extends RuntimeError {
  static MESSAGE = "순위는 [1, 6] 사이 범위여야합니다.";

  constructor() {
    super(RankOutOfRangeError.MESSAGE);
  }
}
