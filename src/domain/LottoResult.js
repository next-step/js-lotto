import Lotto from "./Lotto.js";

class LottoResult {
  #resultNumbers;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    if (this.#validateLottoResult(lotto, bonusNumber)) {
      this.#resultNumbers = lotto.numbers;
      this.#bonusNumber = bonusNumber;
    }
  }

  get resultNumbers() {
    return this.#resultNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  matchResultNumbers(lottoNumber) {
    return lottoNumber.filter((number) => this.#resultNumbers.includes(number));
  }

  matchBonusNumber(lottoNumber) {
    return lottoNumber.includes(this.#bonusNumber);
  }

  #validateLottoResult(lotto, bonusNumber) {
    if (!(lotto instanceof Lotto)) {
      throw new Error("lotto는 Lotto클래스의 인스턴스가 아닙니다.");
    }

    if (lotto.numbers.includes(bonusNumber)) {
      throw new Error("보너스 번호는 당첨번호와 중복될 수 없습니다.");
    }

    return true;
  }
}

export default LottoResult;
