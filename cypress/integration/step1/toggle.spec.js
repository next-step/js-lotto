describe('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
  before(() => {
    cy.visit('index.html');
    const price = 10000;
    cy.inputPrice(price);
    cy.purchase();
  });

  it('번호보기 토글이 off일 경우는 번호가 보이지 않는다.', () => {
    cy.unCheckToggle();
    cy.get('#lottoTickets').should('be.visible');
    cy.get('#lottoTicketsAndNumbers').should('not.be.visible');
  });

  it('번호보기 토글이 on일 경우는 번호가 보인다.', () => {
    cy.checkToggle();
    cy.get('#lottoTickets').should('not.be.visible');
    cy.get('#lottoTicketsAndNumbers').should('be.visible');
  });
});