const purchaseInputSelector = '[data-cy="purchase-amount-input"]';
const purchaseButtonSelector = '[data-cy="purchase-button"]';
const lottoIconSelector = '[data-cy="lotto-icon"]';
const lottoAnnouncementSelector = '[data-cy="lotto-announcement"]';
describe('로또 구입 금액을 입력한다.', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');
 });
 it('입력할 input 태그가 있다.', () => {
  cy.get(purchaseInputSelector).should('exist');
 });
 it('로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여져야 한다.', () => {
  cy.get(purchaseInputSelector).type('123').should('have.value', '123');
 });
 it('금액은 숫자만 입력할 수 있다.', () => {
  cy.get(purchaseInputSelector).type('123ab').should('have.value', '123');
 });
 it('금액은 100000 이상으로 입력할 수 없다.', () => {
  cy.get(purchaseInputSelector).type('100001').should('have.value', '100000');
 });
});

describe('금액에 해당하는 로또를 발급해야 한다.', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');
 });
 it('발급을 위해 클릭할 "확인"버튼이 존재한다.', () => {
  cy.get(purchaseButtonSelector).should('exist');
 });
 it('확인 버튼을 클릭할 수 있어야 한다.', () => {
  cy.get(purchaseButtonSelector).click();
 });
 it('1,000원 단위로 입력이 되지 않았을 경우 alert를 띄워준다.', () => {
  cy.get(purchaseInputSelector).type('1001');
  cy.get(purchaseButtonSelector).click();
  cy.on('window:alert', (t) => {
   expect(t).to.contains('1,000원 단위로 입력해주세요!');
  });
 });
 it('금액이 1,000원 보다 적은 경우 alert를 띄워준다.', () => {
  cy.get(purchaseInputSelector).type('1001');
  cy.get(purchaseButtonSelector).click();
  cy.on('window:alert', (t) => {
   expect(t).to.contains('로또는 한 장 이상 구매해야합니다.');
  });
 });

 it('확인 버튼을 클릭했을 때, 입력한 금액에 맞는 로또 개수가 발급되어야 한다.', () => {
  cy.get(purchaseInputSelector).type('3000');
  cy.get(purchaseButtonSelector).click();
  cy.get(lottoIconSelector).should('have.length', 3);
 });

 it(`확인 버튼을 클릭했을 때, '총 N개를 구매하였습니다.'의 문구를 보여준다.`, () => {
  cy.get(purchaseInputSelector).type('5000');
  cy.get(purchaseButtonSelector).click();
  cy.get(lottoAnnouncementSelector).contains('총 5개를 구매하였습니다.');
 });
});
