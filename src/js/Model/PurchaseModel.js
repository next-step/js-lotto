import PurchaseLottery from '../Lottery/PurchaseLottery';
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
  this.#lotteries = Array.from(
   { length: lotteryAmount },
   () => new PurchaseLottery()
  );
  this.notify();
 }

 #getLotteryAmount(money) {
  const lotteryPrice = 1000;
  if (money < lotteryPrice) {
   throw new Error('로또는 한 장 이상 구매해야합니다.');
  }
  if (money % lotteryPrice !== 0) {
   throw new Error('1,000원 단위로 입력해주세요!');
  }

  return money / lotteryPrice;
 }
}
