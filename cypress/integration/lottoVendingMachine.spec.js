const APP_URL = '../../index.html';

Cypress.Commands.add('$purchaseLottoForm', () =>
  cy.get('#purchase-lotto-form')
);
Cypress.Commands.add('$purchaseLottoInput', () =>
  cy.get('#purchase-lotto-input')
);
Cypress.Commands.add('$purchasedLottoSection', () =>
  cy.get('#purchased-lotto-section')
);
Cypress.Commands.add('$winningResultForm', () =>
  cy.get('#winning-result-form')
);
Cypress.Commands.add('$purchasedLottoNumbers', () => {
  cy.$purchasedLottoSection().get('.mx-1.text-4xl span');
});
Cypress.Commands.add('inputMoney', (money) => {
  cy.$purchaseLottoInput().type(money);
});
Cypress.Commands.add('isEqualMoney', (money) => {
  cy.$purchaseLottoInput().should('have.value', money);
});
Cypress.Commands.add('clickPurchase', () => {
  cy.$purchaseLottoForm().submit();
});
Cypress.Commands.add('isEqualPurchaseAmount', (value) => {
  cy.$purchasedLottoSection().get('.my-0 span').should('have.text', value);
});
Cypress.Commands.add('togglePurchasedLottoNumbers', () =>
  cy.get('.lotto-numbers-toggle-button').click()
);

Cypress.Commands.add('showWinningResult', () => cy.get('form.mt-9').submit());

Cypress.Commands.add('isShowPurchaseHistory', () =>
  cy.get('section.mt-9').should('be.visible')
);

Cypress.Commands.add('isHidePurchaseHistory', () =>
  cy.get('section.mt-9').should('not.be.visible')
);

Cypress.Commands.add('isShowWinningResultModal', () =>
  cy.get('div.modal').should('have.class', 'open')
);

Cypress.Commands.add('isHideWinningResultModal', () =>
  cy.get('div.modal').should('not.have.class', 'open')
);

describe('로또 자판기', () => {
  beforeEach(() => {
    cy.visit(APP_URL);
  });

  describe('화면 테스트', () => {
    it('처음에 로또 구입금액을 입력할수 있는 화면이 보인다.', () => {
      cy.$purchaseLottoForm().should('be.visible');
    });
    it('처음에 구매한 로또 내역이 보이지 않는다.', () => {
      cy.$purchasedLottoSection().should('not.be.visible');
    });
    it('처음에 지난 주 당첨번호를 입력 할 수 있는 화면이 보이지 않는다.', () => {
      cy.$winningResultForm().should('not.be.visible');
    });
  });

  describe('로또 구매를 위한 입력', () => {
    it('숫자 대신 영문자를 입력할 경우, 입력되지 않음', () => {
      cy.inputMoney('ABC');
      cy.isEqualMoney('');
    });

    it('숫자를 넣은경우, 정상적으로 입력됨', () => {
      cy.inputMoney(12300);
      cy.isEqualMoney(12300);
    });
  });

  describe('로또 구매', () => {
    beforeEach(() => {
      cy.$purchaseLottoInput().clear();
    });

    it('구매 입력을하지 않은상태에서 확인을 클릭시 구매내역이 보이지않음', () => {
      cy.clickPurchase().then(() => {
        cy.$purchasedLottoSection().should('not.be.visible');
      });
    });

    it('구매 입력을하지 않은상태에서 확인을 클릭시 당첨번호 입력이 보이지않음', () => {
      cy.clickPurchase().then(() => {
        cy.$winningResultForm().should('not.be.visible');
      });
    });

    it('1000단위의 숫자를 입력하지 않은상태에서 확인을 클릭시 구매내역이 보이지않음', () => {
      cy.inputMoney(12300);
      cy.clickPurchase().then(() => {
        cy.$purchasedLottoSection().should('not.be.visible');
      });
    });

    it('1000단위의 숫자를 입력한 상태에서 확인을 클릭시 구매내역이 보임', () => {
      cy.inputMoney(12000);
      cy.clickPurchase().then(() => {
        cy.$purchasedLottoSection().should('be.visible');
      });
    });

    it('1000단위의 숫자를 입력한 상태에서 확인을 클릭시 당첨번호 입력이 보임', () => {
      cy.inputMoney(12000);
      cy.clickPurchase().then(() => {
        cy.$winningResultForm().should('be.visible');
      });
    });

    it('10000 입력시 구매한 로또 갯수는 10', () => {
      cy.inputMoney(10000);
      cy.clickPurchase().then(() => {
        cy.$purchasedLottoSection().should('be.visible');
        cy.isEqualPurchaseAmount(10);
      });
    });

    it('구매 후 로또번호가 보이지 않음', () => {
      cy.inputMoney(2000);
      cy.clickPurchase().then(() => {
        cy.$purchasedLottoNumbers().should('not.be.visible');
      });
    });

    it('구매 후 토글을 클릭시 로또번호가 보임', () => {
      cy.inputMoney(2000);
      cy.clickPurchase().then(() => {
        cy.$purchasedLottoNumbers().should('not.be.visible');
        cy.togglePurchasedLottoNumbers().then(() => {
          cy.$purchasedLottoNumbers().should('be.visible');
        });
      });
    });
  });

  //   it('로또 구매후 당첨 결과를 입력하지 않은채 결과보기시 화면이 나타나지 않음', () => {
  //     cy.inputMoney(3000);
  //     cy.purchase();
  //     cy.isShowPurchaseHistory();
  //     cy.showWinningResult();
  //     cy.isHideWinningResultModal();
  //   });
  //
  //   it('로또 구매후 당첨 결과를 모두 입력하지 않은 경우 결과보기시 화면이 나타나지 않음', () => {
  //     cy.inputMoney(3000);
  //     cy.purchase();
  //     cy.isShowPurchaseHistory();
  //     cy.get('input.winning-number').then((els) => {
  //       [...els].forEach((el) => {
  //         cy.wrap(el).type('1');
  //       });
  //       cy.showWinningResult();
  //       cy.isHideWinningResultModal();
  //     });
  //   });
  //
  //   it('로또 구매후 당첨 결과를 중복되게 입력된 경우 결과보기시 화면이 나타나지 않음', () => {
  //     cy.inputMoney(3000);
  //     cy.purchase();
  //     cy.isShowPurchaseHistory();
  //     cy.get('input.winning-number, input.bonus-number').then((els) => {
  //       [...els].forEach((el) => {
  //         cy.wrap(el).type('1');
  //       });
  //       cy.showWinningResult();
  //       cy.isHideWinningResultModal();
  //     });
  //   });
  //
  //   it('로또 구매후 당첨 결과를 제대로 입력된 경우 결과보기시 화면이 나타남', () => {
  //     cy.inputMoney(3000);
  //     cy.purchase();
  //     cy.isShowPurchaseHistory();
  //     cy.get('input.winning-number, input.bonus-number').then((els) => {
  //       let value = 1;
  //       [...els].forEach((el) => {
  //         cy.wrap(el).type(value++);
  //       });
  //       cy.showWinningResult();
  //       cy.isShowWinningResultModal();
  //     });
  //   });
  // });
});
