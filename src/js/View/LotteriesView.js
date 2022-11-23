import View from './View';

export default class LotteriesView extends View {
 constructor(target, model) {
  super(target);
  this.lotteries = model;
  this.lotteries.subscribe(this.render.bind(this));
  this.show = false;
 }
 getTemplate() {
  return this.lotteries.lotteries
   .map((lottery) => {
    return (
     '<span data-cy="lotto-icon" class="d-flex items-center mx-1 text-4xl">🎟️' +
     `<span class="${
      this.show ? '' : 'hide'
     } text-base ml-2">${lottery.getLotteryNumber.numbers.join(
      ','
     )}</span></span>`
    );
   })
   .join('');
 }

 setToggle(newToggle) {
  this.show = newToggle;
  this.reRender();
 }
}
