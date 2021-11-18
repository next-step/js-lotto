import {LOTTO_LENGTH, LOTTO_PRICE} from './constants.js';

export default class Model {
  constructor() {
    this.data = {
      amount: 0,
      lottos: [],
    };
  }

  setAmount(money) {
    if (money / LOTTO_PRICE) throw Error('1000단위로 구입해야합니다');
    if (money < LOTTO_PRICE) throw Error('금액이 부족합니다');
    this.data.amount = Math.floor(money / LOTTO_PRICE);
    return this.data.amount;
  }

  setLottos() {
    console.log('model.setLottos');
    for (let i = 0; i < this.data.amount; i++) {
      this.data.lottos.push(this.createOneLotto());
    }
    return this.data.lottos;
  }

  createOneLotto() {
    console.log('model.createOneLotto');
    return Array.from(Array(LOTTO_LENGTH)).map(x => Math.random());
  }
}