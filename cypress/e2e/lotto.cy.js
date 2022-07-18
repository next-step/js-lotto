before(() => {
  cy.visit('/');
});

describe('로또 구매 테스트', () => {
  afterEach(() => cy.get('[data-cy="price-input"]').clear());

  it('구입 금액에 4900원을 입력 시, 로또 4개가 자동으로 구입되어야 한다.', () => {
    cy.purchaseLotto(4000);
    cy.get('[data-cy="lotto-result"]').should('have.text', '총 4개를 구매하였습니다.');
    cy.get('.lotto-ul').children().should('have.length', 4);
  });

  it('구입 금액에 3000원을 입력 시, 로또 3개가 자동으로 구입되야 한다.', () => {
    cy.purchaseLotto(3000);
    cy.get('[data-cy="lotto-result"]').should('have.text', '총 3개를 구매하였습니다.');
    cy.get('.lotto-ul').children().should('have.length', 3);
  });
});

describe('복권 번호는 토글 버튼을 클릭하면 볼 수 있어야 한다.', () => {
  before(() => cy.purchaseLotto(2000));
  afterEach(() => cy.get('[data-cy="lotto-numbers-toggle"]').uncheck({ force: true }));

  it('토글 버튼 클릭시, 구매한 로또의 번호를 볼 수 있다.', () => {
    cy.clickToggle();
    cy.get('.lotto-numbers').should('be.visible');
  });

  it('토글 버튼을 두번 클릭시, 로또의 번호를 볼 수 없다', () => {
    cy.clickToggle();
    cy.clickToggle();
    cy.get('.lotto-numbers').should('not.exist');
  });
});
