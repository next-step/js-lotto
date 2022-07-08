describe('lotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('로또 1장의 가격은 1,000원이다.', () => {
    cy.get('input.w-100').type(1000);
    cy.get('input.w-100 + .btn').click();

    cy.get('span.mx-1').should('have.length', 1)
  });
    
  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    cy.get('input.w-100').type(3000);
    cy.get('input.w-100 + .btn').click();

    cy.get('span.mx-1').should('have.length', 3)
  });

  it('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    cy.get('input.w-100').type(3000);
    cy.get('input.w-100 + .btn').click();

    cy.get('span.mx-1').should('have.length', 3)
    cy.get('span.mx-1').invoke('text').then((text) => {
      expect(text).to.include('🎟️')
    })
  });

  it('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    cy.get('input.w-100').type(3000);
    cy.get('input.w-100 + .btn').click();

    cy.get('span.mx-1').should('have.length', 3)

    cy.get('input[type=checkbox]').check({ force: true });

    cy.get('span.mx-1').invoke('text').its('length').should('be.gte', 3);
  });
});