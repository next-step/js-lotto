export default class Lottery {
 #lotteryCount;
 #lotteryMax;
 #bonus;
 #numbers;

 constructor() {
  this.#lotteryCount = 6;
  this.#lotteryMax = 45;
  this.#bonus = null;
  this.#numbers = [];
 }

 isIncludes(number) {
  return this.#numbers.includes(number);
 }
 get lotteryMax() {
  return this.#lotteryMax;
 }

 get lotteryCount() {
  return this.#lotteryCount;
 }

 set setLottery(number) {
  if (this.isIncludes(number)) {
   throw new Error('로또 번호는 중복가능하지 않습니다. 정확히 입력해주세요');
  }
  if (this.#numbers.length >= this.#lotteryCount && this.#bonus) {
   throw new Error('로또를 모두 뽑았습니다.');
  }

  this.validateLottoNumber(number);

  if (this.#numbers >= this.#lotteryCount) {
   this.#bonus = number;
   return;
  }
  this.#numbers.push(number);
 }

 validateLottoNumber(number) {
  if (!Number.isInteger(number)) throw Error('로또 번호는 정수여야합니다.');
  if (number > 45 || number <= 1) {
   throw Error('1~45 중에 입력해주세요');
  }
 }
 get getLotteryNumber() {
  return { numbers: this.#numbers, bonus: this.#bonus };
 }
}
