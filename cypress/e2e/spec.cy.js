describe('로또', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('최초 화면에는 입력창을 제외한 다른 요소들은 표시되지 않는다.', () => {
    cy.get('.mt-9').should('be.not.visible');
  });

  it('사용자의 편의성을 위해 화면 최초 진입 시 입력창에 포커싱 시켜준다.', () => {
    cy.get('.input-purchase').should('have.attr', 'placeholder', '구입 금액').focus();
  });

  it('입력창에 1,000 이하의 숫자가 입력될 시 경고 표시된다.', () => {
    cy.purchaseInput(500);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('값은 1000이상이어야 합니다.');
    });
  });

  it('구입 금액에 맞게 1,000원 단위로 쿠폰이 생성된다.', () => {
    cy.purchaseInput(2000);
    cy.get('.mt-9').should('have.css', 'display', 'block');
    cy.get('.my-0').contains('총 2개를 구매하였습니다.');
    cy.get('#lotto-list').find('li').should('have.length', 2);
  });

  it('번호확인 토글 버튼을 클릭하면 로또의 번호가 보인다.', () => {
    cy.purchaseInput(3000);
    cy.get('.text-base').click();
    cy.get('.lotto-detail').should('have.css', 'display', 'inline');
  });
});
