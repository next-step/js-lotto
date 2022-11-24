export default class Lottery {
 #lotteryCount;
 #lotteryMax;
 #lotteryMin;
 #bonus;
 #numbers;

 constructor() {
  this.#lotteryCount = 6;
  this.#lotteryMax = 45;
  this.#lotteryMin = 1;
  this.#bonus = null;
  this.#numbers = [];
 }

 reset() {
  this.#bonus = null;
  this.#numbers = [];
 }

 isIncludes(number) {
  return this.#numbers.includes(number);
 }
 get lotteryMax() {
  return this.#lotteryMax;
 }

 get lotteryMin() {
  return this.#lotteryMin;
 }

 get lotteryCount() {
  return this.#lotteryCount;
 }

 setLottery(number) {
  this.validateLottoNumber(number);
  this.#numbers.push(number);
 }

 setBonus(number) {
  this.validateLottoNumber(number);
  this.#bonus = number;
 }

 validateLottoNumber(number) {
  if (this.isIncludes(number)) {
   throw new Error('로또 번호는 중복가능하지 않습니다. 정확히 입력해주세요');
  }
  if (this.#numbers.length >= this.#lotteryCount && this.#bonus) {
   throw new Error('로또를 모두 뽑았습니다.');
  }

  if (!Number.isInteger(number)) throw Error('로또 번호는 정수여야합니다.');
  if (number > this.#lotteryMax || number < this.#lotteryMin) {
   throw Error('1~45 중에 입력해주세요', number);
  }
 }
 get getLotteryNumber() {
  return { numbers: this.#numbers, bonus: this.#bonus };
 }
}
