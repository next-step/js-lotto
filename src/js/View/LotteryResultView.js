import LotteriesView from './LotteriesView';
import View from './View';

export default class LotteryResultView extends View {
 constructor(model) {
  super('[data-view="purchase-view"]');
  this.purchaseModel = model;
  this.purchaseModel.subscribe(this.reRender.bind(this));
  this.init();

  this.lotteriesView = new LotteriesView(
   '[data-view="lotteries-view"]',
   this.$target,
   this.purchaseModel
  );
 }

 render() {
  this.$target.insertAdjacentHTML('beforeend', this.getTemplate());
  if (this.lotteriesView)
   this.lotteriesView = new LotteriesView(
    '[data-view="lotteries-view"]',
    this.$target,
    this.purchaseModel
   );
 }

 setEvent() {
  this.addEvent('submit', '#winning-lottery-form', (event) => {
   event.preventDefault();

   for (const input of event.target) {
    if (input.tagName !== 'INPUT') continue;
    this.purchaseModel.winningLottery.setLottery = +input.value;
   }
  });

  this.addEvent('change', '.lotto-numbers-toggle-button', (event) => {
   this.lotteriesView.setToggle(event.target.checked);
   this.lotteriesView.reRender();
  });
 }

 getTemplate() {
  if (this.purchaseModel.lotteriesLength === 0)
   return ' <div data-view="lotteries-view" class="d-flex flex-wrap"></div>';
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
      <div>
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
       <input type="number" class="winning-number mx-1 text-center" />
      </div>
     </div>
     <div class="bonus-number-container flex-grow">
      <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
      <div class="d-flex justify-center">
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
