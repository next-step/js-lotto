class Lotto {
  // todo : 로또 티켓이 가져야 할 프로퍼티는? : 로또 번호 6개
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    return this._lottoNumbers;
  }

  set lottoNumbers(newLottoNumbers) {
    this._lottoNumbers = newLottoNumbers;
  }
}
