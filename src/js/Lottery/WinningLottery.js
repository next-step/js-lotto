import Lottery from './Lottery';

export default class WinningLottery extends Lottery {
 constructor() {
  super();
 }

 setWinningLottery({ numbers, bonus }) {
  if (numbers.length < this.lotteryCount) {
   throw new Error('로또 번호를 정확하게 입력해주세요.');
  }

  if (!bonus) {
   throw new Error('보너스 번호를 입력해주세요.');
  }
  numbers.forEach((number) => {
   this.setLottery(number);
  });

  this.setLottery(bonus);
 }

 matchWinningLottery(lottery) {
  const { numbers, bonus } = lottery.getLotteryNumber;
  const correctNumbers = numbers.filter((number) => this.isIncludes(number));
  if (correctNumbers.length === this.lotteryCount) {
   return 0;
  }
  if (
   correctNumbers.length === this.lotteryCount - 1 &&
   this.getLotteryNumber.bonus === bonus
  ) {
   return 1;
  }
  if (correctNumbers.length === this.lotteryCount - 1) {
   return 2;
  }

  if (correctNumbers.length === this.lotteryCount - 2) {
   return 3;
  }
  if (correctNumbers.length === this.lotteryCount - 3) {
   return 4;
  }
  return 5;
 }
}
