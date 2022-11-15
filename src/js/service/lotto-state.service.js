import NumberUtil from '../../utils/number.util.js';
import ArrayUtil from '../../utils/array.util.js';

export default class LottoStateService {
  observers;
  lottos;

  constructor() {
    this.observers = new Set();
    this.lottos = [];
  }

  subscribe(subscriber) {
    this.observers.add(subscriber);
  }

  publish() {
    this.observers.forEach(fn => fn(this.lottos));
  }

  set lotto(number) {
    this.lottos = [];

    while (this.lottos.length < number) {
      this.lottos.push(this.generateLotto());
    }

    this.publish();
  }

  get lotto() {
    return this.lottos;
  }

  generateLotto() {
    const numberSet = new Set();

    while (numberSet.size < 6) {
      numberSet.add(NumberUtil.random(1, 45));
    }

    return ArrayUtil.toAscending(Array.from(numberSet));
  }
}
