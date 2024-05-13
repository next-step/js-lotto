import Lotto from "./Lotto.js";

class LottoMachine {
  static LOTTO_LENGTH = 6; // TODO 중복된 것 같은데...
  static LOTTO_PRICE = 1000;

  constructor() {}

  generateLottoNumber(amount) {
    // 로또 구매 가능한 갯수
    const count = this.#calculateLottoCount(amount);
    const lottoList = [];

    for (let i = 0; i < count; i++) {
      let lottoNumbers = [];
      for (let j = 0; j < LOTTO_LENGTH; j++) {
        const randomNumber = this.#generateRandomNumbers();
        lottoNumbers.push(randomNumber);
      }

      const newLotto = new Lotto(lottoNumbers); // 로또 객체 생성
      lottoList.push(newLotto); // 생성된 로또 객체를 리스트에 추가
    }

    return lottoList; // 생성된 로또 리스트 반환
  }

  #generateRandomNumbers() {
    return Math.floor(Math.random() * 45) + 1;
  }

  #calculateLottoCount(amount) {
    return amount / LottoMachine.LOTTO_PRICE;
  }
}

export default LottoMachine;
