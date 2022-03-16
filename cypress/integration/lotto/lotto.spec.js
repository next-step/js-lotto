describe('로또 미션 Cypress', () => {
  before(() => {
    cy.visit('/');
  });

  context.only('START', () => {
    it('초기화면 상태 테스트', () => {
      cy.get('.price-form').should('be.visible');
      cy.get('.lotto-section').should('not.be.visible');
      cy.get('.lotto-form').should('not.be.visible');
    });
  });

  context('STEP1 - 가격 입력 Test', () => {
    beforeEach(() => {
      cy.visit('/');
      // alias
      cy.get('.price-form').find('.price-form__input').as('priceInput');
      cy.get('.price-form').find('.price-form__button').as('purchaseButton');
    });

    context('1. 구매 불가능한 가격 입력 테스트', () => {
      it('(1) 가격 미입력', () => {
        cy.get('@purchaseButton').click();
        cy.on('window:alert', (text) => {
          expect(text).to.contains('금액을 입력해 주세요!');
        });
      });

      it('(2) 1000원 미만으로 입력', () => {
        cy.get('@priceInput')
          .type(500)
          .invoke('val')
          .then((price) => {
            expect(Number(price)).to.be.lessThan(1000);
          });
        cy.get('@purchaseButton').click();
        cy.on('window:alert', (text) => {
          expect(text).to.contains('금액을 1000원 이상으로 입력해주세요!');
        });
      });

      it('(3) 100000원 초과하여 입력', () => {
        cy.get('@priceInput')
          .type(110000)
          .invoke('val')
          .then((price) => {
            expect(Number(price)).to.be.greaterThan(100000);
          });
        cy.get('@purchaseButton').click();
        cy.on('window:alert', (text) => {
          expect(text).to.contains('금액을 100000원 미만으로 입력해주세요!');
        });
      });

      it('(4) 가격을 1000원 단위-(구매가능 단위)-로 입력하지 않음 ', () => {
        cy.get('@priceInput')
          .type(33333)
          .invoke('val')
          .then((price) => {
            expect(Number(price) % 1000).to.not.equal(0);
          });
        cy.get('@purchaseButton').click();
        cy.on('window:alert', (text) => {
          expect(text).to.contains('금액을 1000원 단위로 입력해주세요!');
        });
      });
    });

    context('2. 구매 가능한 가격 입력 테스트', () => {});
  });
});
