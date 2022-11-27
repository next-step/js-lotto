import { LOTTO_PRICE } from '../constants';
import PurchaseLottery from '../Lottery/PurchaseLottery';
import WinningLottery from '../Lottery/WinningLottery';
import Observer from './Observer';

export default class PurchaseModel extends Observer {
 #lotteries;
 constructor() {
  super();
  this.#lotteries = [];
  this.winningLottery = new WinningLottery();
 }
 get lotteries() {
  return this.#lotteries;
 }

 get lotteriesLength() {
  return this.#lotteries.length;
  this.notify();
 }
 reset() {
  this.#lotteries = [];
  this.resetWinningLottery();
  this.notify();
 }

 getWinningResult() {
  if (!this.#lotteries || this.#lotteries.length === 0) {
   return { rate: 0, result: [] };
  }

  const result = this.#lotteries.map((lottery) =>
   this.winningLottery.matchWinningLottery(lottery)
  );

  const price = this.#lotteries.length * 1000;
  const winningPrice = result.reduce((acc, type) => {
   if (type === 5) return acc;
   return acc + LOTTO_PRICE[type];
  }, 0);
  const rate = winningPrice / price;

  return { rate, result };
 }

 resetWinningLottery() {
  this.winningLottery = new WinningLottery();
 }

 setWinningLottery({ numbers, bonus }) {
  try {
   this.winningLottery.setWinningLottery({ numbers, bonus });
  } catch (e) {
   this.winningLottery.reset();
   alert(e.message);
  }
 }

 validateLotteryNumber(number) {
  if (number > this.winningLottery.lotteryMax) {
   return this.winningLottery.lotteryMax;
  }
  if (number < this.winningLottery.lotteryMin) {
   return this.winningLottery.lotteryMin;
  }
  return number;
 }

 buy(money) {
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
