describe('로또', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('최초 화면에는 입력창을 제외한 다른 요소들은 표시되지 않는다.', () => {
    cy.get('.purchase-list-wrap').should('be.not.visible');
    cy.get('#winning-number-form').should('be.not.visible');
  });

  it('사용자의 편의성을 위해 화면 최초 진입 시 입력창에 포커싱 시켜준다.', () => {
    cy.get('.purchase-input').focus();
  });

  describe('로또 구매', () => {
    it('입력창에 1,000 이하의 숫자가 입력될 시 경고 표시된다.', () => {
      cy.purchaseInput(500);
      cy.on('window:alert', (text) => {
        expect(text).to.contains('값은 1000이상이어야 합니다.');
      });
    });

    it('구입 금액에 맞게 1,000원 단위로 쿠폰이 생성된다.', () => {
      cy.purchaseInput(2000);
      cy.get('.purchase-list-wrap').should('have.css', 'display', 'block');
      cy.get('.purchase-details-title').contains('총 2개를 구매하였습니다.');
      cy.get('#lotto-list').find('li').should('have.length', 2);
    });

    it('번호확인 토글 버튼을 클릭하면 로또의 번호가 보인다.', () => {
      cy.purchaseInput(3000);
      cy.get('.show-number-switch').click();
      cy.get('.lotto-detail').should('have.css', 'display', 'inline');
    });
  });

  describe('로또 당첨 번호 입력', () => {
    it('당첨 번호와 보너스 번호는 필수 입력 값이면서 1~45사이의 숫자이다', () => {
      cy.purchaseInput(3000);
      const lottoNumbers = [1,4,7,33,23,45,8];
      cy.get('.btn-result').click();
      lottoNumbers.forEach(($ele) => {
        if ($ele > 45 || $ele <= 0) {
          cy.get($ele).invoke('prop', 'validationMessage');
        }
      });
    });

    it('당첨 번호는 중복이 불가하다', () => {
      cy.purchaseInput(3000);
      let numbers = [23, 7, 10, 41, 17, 15, 7];
      cy.inputWinningNumbers(numbers);

      cy.get('.btn-result').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
      });
    });

    it('결과 확인 버튼을 클릭 시 모달창을 확인할 수 있다', () => {
      cy.purchaseInput(4000);
      let numbers = [23, 7, 10, 41, 17, 15, 5];
      cy.inputWinningNumbers(numbers);

      cy.get('.btn-result').click();
      cy.get('.modal').invoke('attr', 'class', 'open');
    });
  });
});
