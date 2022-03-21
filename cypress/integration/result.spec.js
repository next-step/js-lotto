import { DOM } from '../../src/js/constants';

describe('당첨 결과 기능', () => {
  context('로또 구매 이후 당첨번호와 보너스 번호를 입력하는 form이 나타납니다.', () => {
    it('당첨 번호 DOM 확인', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`.${DOM.WINNING_NUMBER}`).should('exist');
    });

    it('보너스 번호 DOM 확인', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`.${DOM.BONUS_NUMBER}`).should('exist');
    });

    it('결과 확인 버튼 DOM 확인', () => {
      cy.get(`#${DOM.PURCHASE_FORM_INPUT}`).type(4000);
      cy.get(`#${DOM.PURCHASE_FORM_BUTTON}`).click();
      cy.get(`#${DOM.OPEN_RESULT_MODAL_BUTTON}`).should('exist');
    });
  });

  context('결과 확인하기 버튼 클릭 시 입력 값들을 검증합니다.', () => {
    it('당첨 번호는 필수값입니다.', () => {
      expect(true).to.equal(false);
    });

    it('당첨 번호는 1과 45사이의 값들입니다.', () => {
      expect(true).to.equal(false);
    });

    it('당첨 번호는 겹치지 않는 6개의 숫자입니다.', () => {
      expect(true).to.equal(false);
    });

    it('보너스 번호는 필수값입니다.', () => {
      expect(true).to.equal(false);
    });

    it('보너스 번호는 1과 45사이의 값 입니다.', () => {
      expect(true).to.equal(false);
    });
  });
});
