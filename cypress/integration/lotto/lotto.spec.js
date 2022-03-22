describe('로또 미션 Cypress', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.makeAlias();
  });

  context('START', () => {
    it('초기화면 상태 테스트', () => {
      cy.beforePurchaseView();
    });
  });

  context('STEP1 - 가격 입력 Test', () => {
    context('1. 구매 불가능한 가격 입력 테스트', () => {
      it('(1) 가격 미입력', () => {
        cy.get('@purchaseButton').click();
        cy.testProperMessage('금액을 입력해 주세요!');
      });

      it('(2) 1000원 미만으로 입력', () => {
        cy.purchaseLotto(500)
          .invoke('val')
          .then((price) => {
            expect(Number(price)).to.be.lessThan(1000);
          });
        cy.testProperMessage('금액을 1000원 이상으로 입력해주세요!');
      });

      it('(3) 100000원 초과하여 입력', () => {
        cy.purchaseLotto(110000)
          .invoke('val')
          .then((price) => {
            expect(Number(price)).to.be.greaterThan(100000);
          });
        cy.testProperMessage('금액을 100000원 미만으로 입력해주세요!');
      });

      it('(4) 가격을 1000원 단위-(구매가능 단위)-로 입력하지 않음 ', () => {
        cy.purchaseLotto(3300)
          .invoke('val')
          .then((price) => {
            expect(Number(price) % 1000).to.not.equal(0);
          });
        cy.testProperMessage('금액을 1000원 단위로 입력해주세요!');
      });
    });

    context.only('2. 구매 가능한 가격 입력 테스트', () => {
      const mockData = {
        typedPrice: 5000,
        tickets: 5,
      };

      beforeEach(() => {
        cy.purchaseLotto(mockData.typedPrice);
      });

      it('(1) 로또 구매 결과와 당첨번호 입력 칸이 노출된다.', () => {
        cy.afterPurchaseView();
      });

      it('(2) 구매 수량을 노출된다.', () => {
        cy.get('.lotto-section')
          .find('.lotto-section__label')
          .should(($label) => {
            expect($label, 'text content').to.have.text(`총 ${mockData.tickets}개를 구매하였습니다.`);
          });
      });

      it('(3) 구매 수량만큼 로또 티켓이 발급한다.', () => {
        cy.get('.lotto-section')
          .find('.lotto-section-tickets')
          .find('.lotto-section__ticket')
          .should(($span) => {
            expect($span).to.have.length(mockData.tickets);
          });
      });

      it('(4) 로또 티켓 번호는 미노출 상태이다.', () => {
        cy.get('.lotto-section')
          .find('.lotto-section-tickets')
          .find('.lotto-section__ticket__numbers')
          .each(($span) => {
            expect($span).not.to.be.visible;
          });
      });

      it('(5) 로또 티켓 구매 이후 입력 금액을 초기화 된다.', () => {
        cy.get('@priceInput').should('have.value', ''); //
      });

      it('(6) 로또 티켓 구매 이후, 재구매시 로또는 누적된다.', () => {
        //beforeEach 1 time, and 2 times in here
        cy.purchaseLotto(mockData.typedPrice);
        cy.purchaseLotto(mockData.typedPrice);

        cy.get('.lotto-section')
          .find('.lotto-section__label')
          .should(($label) => {
            expect($label, 'text content').to.have.text(`총 ${mockData.tickets * 3}개를 구매하였습니다.`);
          });

        cy.get('.lotto-section')
          .find('.lotto-section-tickets')
          .find('.lotto-section__ticket')
          .should(($span) => {
            expect($span).to.have.length(mockData.tickets * 3);
          });
      });

      it('(7) 토글 버튼 클릭하면 로또 번호가 노출 상태가 토글된다.', () => {
        cy.testToggle(($span) => {
          expect($span).to.be.visible;
        });
        cy.testToggle(($span) => {
          expect($span).not.to.be.visible;
        });
      });
    });
  });
});
