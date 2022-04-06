import { ERROR_INPUT_PRICE_UNIT } from '../../src/js/constants/message';

describe('Lotto Cypress', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  describe('첫 렌더링 시', () => {
    it('로뚜 구입 금액 입력폼만 화면에 렌더링 되어야 한다.', () => {
      cy.get('.input-purchase-form').should('be.visible');
      cy.get('.result-container').should('not.be.visible');
    });
  });

  describe('STEP 1', () => {
    context('로또 구입 금액이 유효한 값일 경우', () => {
      it('1,000원 당 로또 한 장을 구입할수 있다.', () => {
        cy.get('#input-price').type(4000);
        cy.get('.input-purchase-form')
          .submit()
          .then(() => {
            cy.get('.lotto-content').should('have.length', 4);
          });
      });

      it('번호 보기가 활성화(toggle on) 되어 있어야 번호를 볼 수 있다.', () => {
        cy.get('#input-price').type(4000);
        cy.get('.input-purchase-form')
          .submit()
          .then(() => {
            cy.get('.lotto-numbers').should('not.be.visible');

            cy.get('#lotto-numbers-toggle').check({ force: true });
            cy.get('.lotto-numbers').should('be.visible');
          });
      });
    });

    context('로또 구입 금액이 유효하지 않은 값일 경우', () => {
      it('로또 구입 금액은 1000 단위로 입력 되어야 한다', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);
        cy.get('#input-price').type(12345);

        cy.get('.input-purchase-form')
          .submit()
          .then(() => {
            expect(alertStub).to.be.calledWith(ERROR_INPUT_PRICE_UNIT);
          });
      });
    });

    context('로또를 구입한 상태에서 새롭게 로또를 구입했을 경우', () => {
      // it('기존 로또 티켓과 숫자들은 화면에서 지워져야 한다.', () => {
      //   cy.get('#input-price').type(4000);
      //   cy.get('.input-purchase-form')
      //     .submit()
      //     .then(() => {
      //       cy.get('#input-price').clear();
      //       cy.get('#input-price').type(7000);
      //       cy.get('.input-purchase-form')
      //         .submit()
      //         .then(() => {
      //           cy.get('.lotto-content').should('not.be.visible');
      //         });
      //     });
      // });

      it('번호 보기가 비활성화(toggle off) 되어 있어야 한다', () => {
        cy.get('#input-price').type(4000);
        cy.get('.input-purchase-form')
          .submit()
          .then(() => {
            cy.get('#input-price').clear();
            cy.get('#input-price').type(7000);
            cy.get('.input-purchase-form')
              .submit()
              .then(() => {
                cy.get('#lotto-numbers-toggle').should('not.be.checked');
                cy.get('.lotto-numbers').should('not.be.visible');
              });
          });
      });

      it('새로 구입한 로또는 이전 티켓과 중복되어 렌더링 되지 않는다', () => {
        cy.get('#input-price').type(4000);
        cy.get('.input-purchase-form')
          .submit()
          .then(() => {
            cy.get('#input-price').clear();
            cy.get('#input-price').type(7000);
            cy.get('.input-purchase-form')
              .submit()
              .then(() => {
                cy.get('.lotto-content').should('have.length', 7);
              });
          });
      });
    });
  });
});
