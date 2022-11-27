import { SELECTOR } from '../constants';
import { $modal } from '../dom';
import LotteriesView from './LotteriesView';
import ModalView from './ModalView';
import View from './View';
export default class LotteryResultView extends View {
 constructor(target, model) {
  super(target);
  this.purchaseModel = model;
  this.purchaseModel.subscribe(this.render.bind(this));
  this.modalView = new ModalView($modal, this.purchaseModel);
  this.lotteriesView = null;
  this.init();
 }

 render() {
  if (this.$target.children.length !== 0) {
   this.$target.replaceChildren();
  }
  this.$target.insertAdjacentHTML('beforeend', this.getTemplate());
  const $lotteriesView = this.$target.querySelector(
   '[data-view="lotteries-view"]'
  );
  this.lotteriesView = new LotteriesView($lotteriesView, this.purchaseModel);
  this.lotteriesView.render();
 }

 setEvent() {
  this.addEvent('change', 'input[type="number"]', (event) => {
   event.target.value = this.purchaseModel.validateLotteryNumber(
    event.target.value
   );
  });
  this.addEvent('submit', SELECTOR.WINNING_LOTTERY_FORM, (event) => {
   event.preventDefault();
   const lotteryNumbers = [];
   const bonus = [];
   this.purchaseModel.resetWinningLottery();

   for (const input of event.target) {
    if (input.classList.value.includes('winning-number') && input.value) {
     lotteryNumbers.push(+input.value);
    }

    if (input.classList.value.includes('bonus-number') && input.value) {
     bonus.push(+input.value);
    }
   }
   this.purchaseModel.setWinningLottery({
    numbers: lotteryNumbers,
    bonus: bonus[0],
   });
   this.modalView.onModalShow();
  });

  this.addEvent('change', SELECTOR.LOTTO_NUMBER_TOGGLE, (event) => {
   this.lotteriesView.setToggle(event.target.checked);
   this.lotteriesView.render();
  });
 }

 getTemplate() {
  console.log(this.purchaseModel.lotteriesLength);
  if (this.purchaseModel.lotteriesLength === 0) {
   return ' <div data-view="lotteries-view" class="d-flex flex-wrap"></div>';
  }
  return (
   this.generateLotteriesTemplate(this.purchaseModel.lotteries) +
   this.generateWinningLotteriesInput()
  );
 }

 generateWinningLotteriesInput() {
  return `<form id="winning-lottery-form" class="mt-9">
    <label class="flex-auto d-inline-block mb-3">
     지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
    </label>
    <div class="d-flex">
     <div>
      <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
      <div data-cy="winning-numbers">
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
      </div>
     </div>
     <div class="flex-grow">
      <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
      <div data-cy="bonus-numbers" class="d-flex justify-center">
       <input type="number" class="bonus-number text-center" />
      </div>
     </div>
    </div>
    <button
     type="submit"
     class="open-result-modal-button mt-5 btn btn-cyan w-100"
    >
     결과 확인하기
    </button>
   </form>`;
 }

 generateLotteriesTemplate(lotteries) {
  return `<section class="mt-9">
  <div class="d-flex">
    <label data-cy="lotto-announcement" class="flex-auto my-0">총 ${lotteries.length}개를 구매하였습니다.</label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" />
        <span class="text-base font-normal">번호보기</span>
      </label>
    </div>
  </div>
  <div data-view="lotteries-view" class="d-flex flex-wrap"></div>
  </section>`;
 }
}
