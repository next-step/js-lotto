import { ErrorPurchase, PurchaseInfo } from '../common/enum.js';
import NumberUtil from '../../utils/number.util.js';
import ArrayUtil from '../../utils/array.util.js';

export default class PurchaseService {
  #value;

  isValidAmount(value) {
    this.#value = Number(value);

    if (this.noValue()) {
      return ErrorPurchase.NO_VALUE;
    }

    if (this.outOfRange()) {
      return `${PurchaseInfo.MIN} ~ ${PurchaseInfo.MAX} ${ErrorPurchase.OUT_OF_RANGE}`;
    }

    if (this.wrongUnit()) {
      return `${PurchaseInfo.UNIT} ${ErrorPurchase.WRONG_UNIT}`;
    }

    return null;
  }

  noValue() {
    return !this.#value;
  }

  outOfRange() {
    return PurchaseInfo.MIN > this.#value || PurchaseInfo.MAX < this.#value;
  }

  wrongUnit() {
    return this.#value % PurchaseInfo.UNIT !== 0;
  }

  getLotto(number) {
    return Array.from({ length: number }, () => this.generateLotto());
  }

  generateLotto() {
    const numberSet = new Set();

    while (numberSet.size < 6) {
      numberSet.add(NumberUtil.randomNumber(1, 45));
    }

    return ArrayUtil.toAscending(Array.from(numberSet));
  }
}
