import { ERROR, LOTTO_COUNT, VALID_PRICE } from '../utils/constants';
import setAliase from '../utils/setAlise';

describe('에러 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    setAliase();
  })

  context('로또 구입', () => {
    it('빈 값 입력', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.typeToTarget('@pfInput', '{enter}').then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR.NOT_EMPTY);
      })
    })
    it('1000원 단위가 아닌 값 입력', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.typeToTarget('@pfInput', 123).type('{enter}').then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR.THOUSAND);
      })
    })
  })
})
