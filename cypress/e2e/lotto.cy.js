import { ERROR_MSSAGE, LOTTO, SELECTOR } from '../../src/js/utils/constants.js';

const $purchaseInputSelector = '[data-cy="purchase-amount"]';

describe('LOTTO APLICATION을 테스트한다.', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('input 태그가 존재한다.', () => {
    const purchaseInputTag = cy.get($purchaseInputSelector);
    purchaseInputTag.should('exist');
  });

  context('Input 태그에 입력된 값을 테스트한다.', () => {
    it('Input 태그에 숫자가 입력되면 입력된 숫자가 표시된다.', () => {
      const purchaseInputTag = cy.get($purchaseInputSelector);
      purchaseInputTag.type(1000);
      purchaseInputTag.should('have.value', 1000);
    });

    it('Input 태그에 String은 적을 수 없다.', () => {
      const purchaseInputTag = cy.get($purchaseInputSelector);
      purchaseInputTag.type('1000a');
      purchaseInputTag.should('have.value', 1000);
    });
  });

  context('올바른 금액이 제출되었는지 테스트한다.', () => {
    it('금액이 1000원 단위가 아니면 alert를 띄운다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.purchaseLotto(1234).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MSSAGE.AMOUNT);
      });
    });

    it('1000원 단위의 금액이 입력되면 templates이 보여진다.', () => {
      cy.purchaseLotto(7000).then(() => {
        cy.get('#purchased-lottos').should('be.visible');
        cy.get('#input-lotto-nums').should('be.visible');
      });
    });
  });

  context('로또 구매 결과를 확인한다.', () => {
    it('로또를 구매한 만큼 로또가 발급 되었는지 확인한다.', () => {
      cy.purchaseLotto(7000);
      cy.get('#total-purchased').contains('7');
    });

    it('로또 구매한 만큼 로또의 이미지가 발급되었는지 확인한다.', () => {
      cy.purchaseLotto(7000);
      cy.get('.lotto-image').should('have.length', 7);
    });
  });

  context('로또의 숫자를 확인하는 토글 버튼을 테스트한다.', () => {
    it('토글을 클릭하면 토글이 On 되어야한다.', () => {
      cy.purchaseLotto(9000);
      cy.onToggleLottoNumbers().should('be.checked');
    });

    it('토글이 on 되면 로또 숫자가 표시된다.', () => {
      cy.purchaseLotto(8000);
      cy.onToggleLottoNumbers();
      cy.get('.lotto-numbers').should('be.visible');
    });
  });

  context('로또 번호가 정상적으로 발급되었는지 확인한다.', () => {
    it('로또 숫자는 6개여야한다.', () => {
      cy.purchaseLotto(7000);
      cy.onToggleLottoNumbers();
      cy.get('.lotto-numbers')
        .first()
        .then(($element) => {
          const lottoNumberText = $element.text();
          const lottoNumbers = lottoNumberText.split(',');
          expect(lottoNumbers.length).to.equal(LOTTO.LENGTH);
        });
    });
  });
});
