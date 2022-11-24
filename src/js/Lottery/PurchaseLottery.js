import Lottery from './Lottery';

export default class PurchaseLottery extends Lottery {
 constructor() {
  super();
  this.generateLotteriesNumbers();
 }

 generateLotteriesNumbers() {
  Array.from({ length: this.lotteryCount }, () => {
   while (true) {
    // TODO 무한루프 방지하기 위한 방어로직
    const number = Math.ceil(Math.random() * 45);
    if (!this.isIncludes(number)) {
     this.setLottery(number);
     return;
    }
   }
  });
 }
}
