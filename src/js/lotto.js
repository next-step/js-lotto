import { isNumber } from "./util";

const ERROR_CODE = {};

export default class Lotto {
  // 로또 번호의 갯수
  #LOTTO_NUMBER_COUNT = 6;
  #lottoPrice = 1000;
  // 구입한 로또에 대한 배열
  #lottos = [];
  #winningNumber = [];
  #bonusNumber;
  #rank = [];

  get getLottoNumberCount() {
    return this.#LOTTO_NUMBER_COUNT;
  }

  getLottoQuantityByMoney(money) {
    if (!isNumber(money)) {
      return 0;
    }
    return Math.floor(money / this.#lottoPrice);
  }

  getLottoNumber() {
    return Array(this.#LOTTO_NUMBER_COUNT)
      .fill()
      .map(() => this.#getRandomNumber());
  }

  #getRandomNumber() {
    return Math.floor(Math.random() * 50);
  }

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  getWinningNumberByString(winneingNumberString) {
    const winningNumberArray = winneingNumberString.split(",");

    const isInvalidWinningNumber = winningNumberArray.some((winningNumber) => {
      return !isNumber(winningNumber);
    });

    if (isInvalidWinningNumber) {
      throw new Error();
    }

    if (winningNumberArray.length !== this.#LOTTO_NUMBER_COUNT) {
      throw new Error();
    }

    return winningNumberArray;
  }

  setWinningNumber(winningNumberArray) {
    this.#winningNumber = winningNumberArray;
  }

  setBounsNumber(bounsNumber) {
    this.#bonusNumber = bounsNumber;
  }

  checkRank() {}
}
