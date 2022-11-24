import {
 winningLotteryBonusSelector,
 winningLotteryNumberSelector,
} from '../support/commands';

describe('당첨 번호를 입력후, 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');
  cy.purchaseLotto(5);
 });
 it('당첨 번호는 1~45 사이의 숫자들만 입력 가능하다.', () => {
  cy.setWinningLotto([0, 111, 10, -1, 5, 6], 46);
  cy.get(winningLotteryBonusSelector).each((element) => {
   const val = +element.val();
   expect(val).to.lessThan(46);
   expect(val).to.greaterThan(0);
  });

  cy.get(winningLotteryNumberSelector).each((element) => {
   const val = +element.val();
   expect(val).to.lessThan(46);
   expect(val).to.greaterThan(0);
  });
 });

 it('결과 확인하기 버튼이 존재한다.');

 it('당첨 번호를 잘못 입력하여 확인 버튼을 클릭하면 alert 으로 알려준다.');

 it('당첨 번호를 입력한 후 결과 확인하기 버튼을 클릭하면 모달이 보인다.');

 it('모달에는 당첨 통계, 수익률이 보인다.');
});

describe('당첨 번호를 입력후, 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
 it('모달에 다시 시작하기 버튼이 존재한다.');

 it('다시 시작하기 버튼을 클릭하면 모달이 모달이 사라지고 앱이 다시 시작된다.');
});
