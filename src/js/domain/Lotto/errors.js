import RuntimeError from "../../RuntimeError";

export class LottoMatchResultNotSetError extends RuntimeError {
  static MESSAGE = "로또 매치 결과가 설정되지 않았습니다.";

  constructor() {
    super(LottoMatchResultNotSetError.MESSAGE);
  }
}
