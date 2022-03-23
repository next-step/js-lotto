import LottoNumberGenerator from "../LottoNumberGenerator.js";
class LottoTicket {
  constructor() {
    this.numberGenerator = new LottoNumberGenerator();
    this.numbers = [];
    this.winningCount = 0;
    this.generateAutomaticNumbers();
  }

  generateAutomaticNumbers = () => {
    this.numbers = this.numberGenerator.getNumber();
  };

  getNumbers = () => {
    return this.numbers;
  };
}

export default LottoTicket;
