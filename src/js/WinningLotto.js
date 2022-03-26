export default class WinningLotto {
  // todo : 당첨 번호 6개와 보너스 번호 1개
  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  get winningNumbers() {
    return this._winningNumbers;
  }

  set winningNumbers(newWinningNumbers) {
    this._winningNumbers = newWinningNumbers;
  }

  get bonusNumber() {
    return this._bonusNumber;
  }

  set bonusNumber(newBonusNumber) {
    this._bonusNumber = newBonusNumber;
  }

  // todo : 당첨 번호 6개와 구입한 로또 번호를 비교하는 함수가 필요하다.
}
