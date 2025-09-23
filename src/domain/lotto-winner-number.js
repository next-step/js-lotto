export class LottoWinnerNumber {

  constructor(numbers, bonusNumber) {
    this.numbers = numbers;
    this.bonusNumber = bonusNumber;
  }

  matchedCount(lotto) {
    let winnerNumber = this.numbers.slice();
    let result = 0;
    for (let expectedNumber of lotto.expectedNumbers) {
      const idx = winnerNumber.findIndex(n => n === expectedNumber);
      if (idx === -1) {
        continue;
      }

      winnerNumber.splice(idx, 1);
      result += 1;
    }

    return result;
  }
}
