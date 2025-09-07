export class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    if (!Array.isArray(lottoNumbers)) {
      throw new Error("배열만 값으로 받을 수 있습니다.");
    }

    const numbersSet = new Set(lottoNumbers);
    if (numbersSet.size !== 6) {
      throw new Error("로또 번호는 총 6개여야 합니다.");
    }

    this.#lottoNumbers = lottoNumbers;
  }

  static of(lottoNumbers) {
    return new Lotto(lottoNumbers);
  }

  get value() {
    return this.#lottoNumbers;
  }

  compare(lotto) {
    let matchCount = 0;

    this.#lottoNumbers.forEach((lottoNumber) => {
      if (lotto.contains(lottoNumber)) {
        matchCount += 1;
      }
    });

    return matchCount;
  }

  contains(lottoNumber) {
    return this.#lottoNumbers.find((it) => it.equals(lottoNumber));
  }
}
