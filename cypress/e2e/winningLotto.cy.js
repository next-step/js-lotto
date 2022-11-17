import { errorMessages } from '../../src/js/constants';

describe('winningLotto', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.pay(5000);
  });

  it('6개의 당첨 번호와 1개 보너스 번호를 입력할 수 있다.', () => {
    cy.get('.winning-number').should('have.lengthOf', 6);
    cy.get('.bonus-number').should('have.lengthOf', 1);
  });

  it('당첨 번호 서로 다른 숫자로 구성된다.', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal(errorMessages.DUPLICATE_NUMBERS_ERROR);
    });

    cy.submitWinningLotto([1, 1, 1, 1, 1, 1], 1);
  });

  describe('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
    beforeEach(() => {
      cy.submitWinningLotto([1, 2, 3, 4, 5, 6], 7);
    });

    it('모달이 열려야 한다.', () => {
      cy.get('.modal').should('be.visible');
    });

    it('당첨 통계를 확인할 수 있다.', () => {
      cy.get('.rank').each((el) => {
        expect(Number(el.text())).to.be.a('number');
      });
    });

    it('수익률을 확인할 수 있다.', () => {
      cy.get('#earnings-rate')
        .invoke('text')
        .then((text) => {
          expect(Number(text)).to.be.a('number');
        });
    });
  });

  describe('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
    beforeEach(() => {
      cy.submitWinningLotto([1, 2, 3, 4, 5, 6], 7);
      cy.get('#reset-btn').click();
    });

    it('모달이 닫혀야 한다.', () => {
      cy.get('.modal').should('not.be.visible');
    });

    it('입력한 금액이 초기화되어야 한다.', () => {
      cy.get('#checkout').should('not.have.value');
    });

    it('로또 리스트가 보이지 않아야 한다.', () => {
      cy.get('#orders').should('not.be.visible');
    });

    it('당청 번호 입력란이 보이지 않아야 한다.', () => {
      cy.get('#winning-number-form').should('not.be.visible');
    });
  });
});
