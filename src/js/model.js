import {
  winningTypes,
  winningMoney,
  PRICE_OF_LOTTO,
  NUM_OF_LOTTO_NUMBERS,
  MIN_LOTTO_NUM,
  MAX_LOTTO_NUM,
} from "../js/util/constants.js";

function setInitialState() {
  return {
    paidMoney: 0,
    earnedMoney: 0,
    curLotties: [],
    winningInfo: Object.keys(winningTypes).reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {}),
    winningLottoDigits: Array.from({ length: NUM_OF_LOTTO_NUMBERS + 1 }, () => 0),
  };
}

class Model {
  constructor() {
    this.initLottiesModel();
  }

  initLottiesModel() {
    const { paidMoney, earnedMoney, curLotties, winningInfo, winningLottoDigits } = setInitialState();

    this.paidMoney = paidMoney;
    this.earnedMoney = earnedMoney;
    this.curLotties = curLotties;
    this.winningInfo = winningInfo;
    this.winningLottoDigits = winningLottoDigits;
  }

  resetWinningInfo() {
    const { earnedMoney, winningInfo } = setInitialState();
    this.earnedMoney = earnedMoney;
    this.winningInfo = winningInfo;
  }

  buyLotties(paidMoney) {
    this.paidMoney = paidMoney;
    this.curLotties = [];

    const numOfLotties = Math.floor(paidMoney / PRICE_OF_LOTTO);

    Array.from({ length: numOfLotties }, () => {
      this.curLotties.push(this._autoGenerateNumber());
    });
  }

  _autoGenerateNumber() {
    const randomLottoNumber = new Set();

    while (randomLottoNumber.size <= NUM_OF_LOTTO_NUMBERS) {
      const curRandomNum = Math.floor(Math.random() * (MAX_LOTTO_NUM - MIN_LOTTO_NUM + 1)) + MIN_LOTTO_NUM;

      if (randomLottoNumber.has(curRandomNum)) {
        continue;
      }
      randomLottoNumber.add(curRandomNum);
    }

    return [...randomLottoNumber];
  }

  setWinningLottoDigits(order, digit) {
    const idx = Number(order);
    this.winningLottoDigits[idx] = digit === "" ? 0 : Number(digit);
  }

  addEarnedMoney(type) {
    this.earnedMoney += winningMoney[type];
    this.winningInfo[type] += 1;
  }
}

export default new Model();
