import ArrayUtil from '../../utils/array.util.js';
import { LottoStats } from '../common/const.js';
import { PurchaseInfo } from '../common/enum.js';

export default class WinningNumberService {
  #lottoState;
  #lottoStats;

  constructor(lottoState) {
    this.#lottoState = lottoState;
    this.#lottoStats = LottoStats;
  }

  isValidValue(value) {
    const arr = [...value.numbers, value.bonus];

    return this.#inRange(arr)
      && !this.#checkEmpty(arr)
      && !ArrayUtil.checkDuplicateExists(arr);
  }

  #checkEmpty(arr = []) {
    return !arr.length || arr.some(i => !i.length);
  }

  #inRange(arr = []) {
    return arr.every(i => 1 <= i && 45 >= i);
  }

  getMatchResult() {
    const { list } = this.#lottoState;
    const target = [...this.#lottoState.winningNumber.numbers];
    const bonusNum = this.#lottoState.winningNumber.bonus;

    list.forEach(item => {
      const numberOfMatches = item.filter(num => target.some(t => Number(t) === num)).length;
      const isBonus = item.some(num => num === Number(bonusNum));

      if (numberOfMatches <= 3) {
        return;
      }

      this.#countUp(numberOfMatches, isBonus);
    });

    return this.#lottoStats;
  }

  #countUp(numberOfMatches, isBonus) {
    const item = this.#lottoStats.find(el => (
      el.numberOfMatches === numberOfMatches && el.allowBonus === isBonus
    ));

    if (!item) {
      return;
    }

    item.count += 1;
  }

  getRateOfReturn() {
    const prize = this.#lottoStats.reduce((acc, curr) => curr.prize * curr.count, 0);
    const paid = this.#lottoState.list.length * PurchaseInfo.UNIT;
    return ((prize - paid) / paid) * 100;
  }
}
