const mockData = {
  typedPrice: 5000,
  tickets: 5,
};

describe('로또 미션 Cypress', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.visit('/');
    // alias
    cy.get('.price-form').find('.price-form__input').as('priceInput');
    cy.get('.price-form').find('.price-form__button').as('purchaseButton');
  });

  context('START', () => {
    it('초기화면 상태 테스트', () => {
      cy.get('.price-form').should('be.visible');
      cy.get('.lotto-section').should('not.be.visible');
      cy.get('.lotto-form').should('not.be.visible');
    });
  });

  context('STEP1 - 가격 입력 Test', () => {
    context('0. 기본 입력 테스트', () => {
      it('(1) 엔터 동작 테스트', () => {
        cy.get('@priceInput').type(3000).type('{enter}');
        cy.get('.lotto-form').should('be.visible');
      });

      it('(2) 클릭 동작 테스트', () => {
        cy.get('@priceInput').type(3000).type('{enter}');
        cy.get('.lotto-form').should('be.visible');
      });

      it('(3) 연속 동작 수행시, input 값 기준으로 티켓 생성 확인 ', () => {
        cy.get('@priceInput').type(3000).type('{enter}').type('{enter}');
        cy.get('@purchaseButton').click().click();

        cy.get('.lotto-section')
          .should('be.visible')
          .find('.lotto-section-tickets')
          .find('.lotto-section-ticket')
          .should(($span) => {
            expect($span).to.have.length(3);
          });
      });
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

    context('2. 구매 가능한 가격 입력 테스트', () => {
      const mockData = {
        typedPrice: 5000,
        tickets: 5,
      };

      beforeEach(() => {
        cy.get('@priceInput').type(mockData.typedPrice);
        cy.get('@purchaseButton').click();
      });

      it('(1) 로또 구매 결과와 당첨번호 입력 칸이 노출된다.', () => {
        cy.get('.lotto-section').should('be.visible');
        cy.get('.lotto-form').should('be.visible');
      });

      it('(2) 구매 수량을 노출된다.', () => {
        cy.get('.lotto-section')
          .should('be.visible')
          .find('.lotto-section__label')
          .should(($label) => {
            expect($label, 'text content').to.have.text(`총 ${mockData.tickets}개를 구매하였습니다.`);
          });
      });

      it('(3) 구매 수량만큼 로또 티켓이 발급한다.', () => {
        cy.get('.lotto-section')
          .should('be.visible')
          .find('.lotto-section-tickets')
          .find('.lotto-section-ticket')
          .should(($span) => {
            expect($span).to.have.length(mockData.tickets);
          });
      });

      it('(4) 로또 티켓 번호는 미노출 상태이다.', () => {
        cy.get('.lotto-section')
          .should('be.visible')
          .find('.lotto-section-tickets')
          .find('.lotto-section-ticket__numbers')
          .each(($span) => {
            expect($span).not.to.be.visible;
          });
      });

      it('(5) 로또 티켓 구매 이후 입력 금액을 초기화 된다.', () => {
        cy.get('@priceInput').should('have.value', ''); //
      });

      it('(6) 로또 티켓 구매 이후, 재구매시 로또는 누적된다.', () => {
        //purchase 3 time
        cy.get('@priceInput').type(mockData.typedPrice);
        cy.get('@purchaseButton').click();
        cy.get('@priceInput').type(mockData.typedPrice);
        cy.get('@purchaseButton').click();

        cy.get('.lotto-section')
          .should('be.visible')
          .find('.lotto-section__label')
          .should(($label) => {
            expect($label, 'text content').to.have.text(`총 ${mockData.tickets * 3}개를 구매하였습니다.`);
          });

        cy.get('.lotto-section')
          .should('be.visible')
          .find('.lotto-section-tickets')
          .find('.lotto-section-ticket')
          .should(($span) => {
            expect($span).to.have.length(mockData.tickets * 3);
          });
      });

      it.only('(7) 토글 버튼 클릭하면 로또 번호가 노출 상태가 토글된다.', () => {
        cy.get('.lotto-numbers-toggle__label').click();
        cy.get('.lotto-section-ticket__numbers').each(($span) => {
          expect($span).to.be.visible;
        });
        cy.get('.lotto-numbers-toggle__label').click();
        cy.get('.lotto-section-ticket__numbers').each(($span) => {
          expect($span).not.to.be.visible;
        });
        cy.get('.lotto-numbers-toggle__label').click();
        cy.get('.lotto-section-ticket__numbers').each(($span) => {
          expect($span).to.be.visible;
        });
      });
    });
  });
});
