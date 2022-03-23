import LottoNumberGenerator from "../LottoNumberGenerator.js";
import { LOTTO_NUMBER_COUNT } from "../../constant/index.js";
class LottoTicket {
  constructor() {
    this.numberGenerator = new LottoNumberGenerator();
    this.numbers = [];
    this.winningCount = 0;
    this.generateAutomaticNumbers();
  }

  generateAutomaticNumbers() {
    this.numbers = Array.from({ length: LOTTO_NUMBER_COUNT }).map(_ =>
      this.numberGenerator.getNumber()
    );
  }

  getNumbers() {
    return this.numbers;
  }
}

export default LottoTicket;
