import ALERT_MESSAGE from '../../src/js/constants';

describe('로또 테스트', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });
  describe('로또 구입 금액의 단위는 1000원이다.', () => {
    const alertInput = () => {
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_ONE_THOUSAND_UNIT);
      });
    };
    it('10000 입력한 상태에서 확인 버튼을 클릭한다.', () => {
      cy.clickPurchaseBtn(10000);
    });
    it('2000 입력한 상태에서 enter를 누른다.', () => {
      cy.pressEnter(2000);
    });
    it('1234 입력한 상태에서 확인 버튼을 클릭했을 때 alert 창이 뜬다.', () => {
      cy.clickPurchaseBtn(1234);
      alertInput();
    });
    it('2500 입력한 상태에서 enter를 눌렀을 때 alert 창이 뜬다.', () => {
      cy.pressEnter(2500);
      alertInput();
    });
  });
});
