// 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// 로또 1장의 가격은 1,000원이다.
// 소비자는 자동 구매를 할 수 있어야 한다.
// 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

const priceInput = () => cy.get('.price-input');
const purchaseButton = () => cy.get('.confirm');
const numberShowingToggleButton = () => cy.get('.switch');
const lottoTicketList = () => cy.get('.lotto-result-list-item');
const lottoNumberList = () => cy.get('.lotto-result-number-list');

describe('로또 구입 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    priceInput().type('7000');
    purchaseButton().click();
    lottoTicketList().its('length').should('eq', 7);
  });

  it('로또 1장의 가격은 1,000원이다.(1,000원 이하로 금액을 입력할 경우)', () => {
    priceInput().type('900');
    purchaseButton().click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('1,000원부터 입력이 가능합니다.');
    });
    cy.on('window:confirm', () => true);
  });

  it('로또 1장의 가격은 1,000원이다.(1,000이상, 1,000원 단위가 아닌 금액으로 입력한 경우)', () => {
    priceInput().type('1200');
    purchaseButton().click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    });
    cy.on('window:confirm', () => true);
  });

  it('복권 번호는 번호 보기 토글 버튼을 클릭하면 볼 수 있어야 한다.', () => {
    priceInput().type('10000');
    purchaseButton().click();
    lottoNumberList().each((item) =>
      expect(item).to.have.css('display', 'none')
    );

    numberShowingToggleButton().click();

    lottoTicketList().its('length').should('eq', 10);
    lottoNumberList().its('length').should('eq', 10);
    lottoNumberList().each((item) =>
      expect(item).to.have.css('display', 'block')
    );

    numberShowingToggleButton().click();

    lottoNumberList().each((item) =>
      expect(item).to.have.css('display', 'none')
    );
  });
});
