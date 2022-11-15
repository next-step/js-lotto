import Observer from './Observer';

export default class PurchaseModel extends Observer {
 #lotteries;
 constructor() {
  super();
  this.#lotteries = [];
 }
 get lotteries() {
  return this.#lotteries;
 }

 get lotteriesLength() {
  return this.#lotteries.length;
 }

 set buy(money) {
  const lotteryAmount = this.#getLotteryAmount(money);
  this.#lotteries = Array.from({ length: lotteryAmount }, () => 'lottery');
  this.notify();
 }

 #getLotteryAmount(money) {
  const lotteryPrice = 1000;
  if (money % lotteryPrice !== 0) {
   throw new Error('에러 메세지');
  }

  if (lotteryPrice === 0) {
   throw new Error('에러 메세지2');
  }
  return money / lotteryPrice;
 }
}
