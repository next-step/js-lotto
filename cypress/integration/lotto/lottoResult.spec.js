describe('로또 미션 Cypress', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.makeAlias();
  });

  context('STEP2 - 결과 확인 Test', () => {
    const mockData = {
      typedPrice: 5000,
      duplicatedNumbers: [[1, 1, 12, 5, 4, 2], 10],
      overRangeNumbers: [[47, 1, 12, 30, 23, 2], 10],
      emptyRangeNumbers: [[1, 12, 30, 23, 2, ' '], 14],
      validWinningNumbers: [[1, 3, 12, 5, 4, 2], 23],
    };

    beforeEach(() => {
      cy.purchaseLotto(mockData.typedPrice);
    });

    context.only('1. 결과를 확인 할 수 없는 입력', () => {
      it('(1) 중복 로또 번호 입력 테스트', () => {
        cy.typeWinningNumbers(mockData.duplicatedNumbers);
        cy.get('.open-result-modal-button').click();
        cy.testProperMessage('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
        cy.get('.modal').should('not.be.visible');
      });

      it('(2) 로또 범위 1 ~ 45 범위를 벗어난 숫자 입력 테스트', () => {
        cy.typeWinningNumbers(mockData.overRangeNumbers);
        cy.get('.open-result-modal-button').click();
        cy.get('.modal').should('not.be.visible');
      });

      it('(3) 빈 값이 존재하는 입력 테스트', () => {
        cy.typeWinningNumbers(mockData.emptyRangeNumbers);
        cy.get('.open-result-modal-button').click();
        cy.get('.modal').should('not.be.visible');
      });
    });
  });
});
