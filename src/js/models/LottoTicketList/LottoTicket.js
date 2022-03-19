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
    let numberCount = LOTTO_NUMBER_COUNT;

    while (numberCount > 0) {
      const selectedNumber = this.numberGenerator.getNumber();
      this.numbers.push(selectedNumber);
      numberCount--;
    }
  }

  getNumbers() {
    return this.numbers;
  }
}

export default LottoTicket;
