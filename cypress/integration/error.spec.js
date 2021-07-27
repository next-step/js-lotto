import { ERROR, LOTTO_COUNT, VALID_PRICE } from '../utils/constants';
import setAliase from '../utils/setAlise';

const expectAlert = () => {
  let i = 0;
  const stub = cy.stub();
  cy.on('window:alert', stub);
  return function (msg) {
    expect(stub.getCall(i++)).to.be.calledWith(msg);
  }
}

describe('에러 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    setAliase();
    cy.wrap({ checkAlert: expectAlert() }).as('al');
  })

  context('정상적이지 않은 가격으로 로또 구입', () => {
    it('빈 값 입력', () => {
      cy.typeToTarget('@pfInput', '{enter}').then(() => {
        cy.get('@al').invoke('checkAlert', ERROR.NOT_EMPTY);
      })
    })
    it('1000원 단위가 아닌 값 입력', () => {
      cy.typeToTarget('@pfInput', 123).type('{enter}').then(() => {
        cy.get('@al').invoke('checkAlert', ERROR.THOUSAND);
      })
    })
  })
  
  context('로또 구입 성공 후 당첨 번호 입력', () => {
    beforeEach(() => {
      cy.typeToTarget('@pfInput', 5000).type('{enter}')
    })
    it('정상 범위 밖의 숫자를 입력하면 alert나 나온다.', () => {
      cy.get('@lottoList').find('.lotto-detail').each(($lotto) => {
        let num = 45;
        cy.get('@wfInputs').each(($input, index) => {
          $input.val(num++);
        })
      })
      cy.clickTarget('@wfBtn')
      cy.get('@al').invoke('checkAlert', ERROR.NOT_VALID_NUM);
    })
  })

})
