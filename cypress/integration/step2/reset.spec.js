import {getRandomIntInclusive, getTestRandomArray} from "../../support/utils";

describe('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
  const price = 100000;
  const pickingNumbers = [...getTestRandomArray(1, 45, 7)];
  const bonusNumber = pickingNumbers.splice(getRandomIntInclusive(0, 5), 1)[0];

  before(() => {
    cy.visit('index.html');
    cy.inputPrice(price);
    cy.purchase();
    cy.inputResult(pickingNumbers.sort((a,b) => a-b), bonusNumber);
    cy.showResult();
  });

  it('초기화 전에 모든 입력값이 제대로 있는지 확인한다.', () => {
    cy.wait(2000);
    cy.get('#winningNumber .winning-number').each((ele, i) => {
      expect(Number.parseInt(ele[0].value)).to.equal(pickingNumbers[i]);
    });
    cy.get('.bonus-number').should('have.value', bonusNumber);
  });

  it('초기화 후에 모든 filed가 비어있는지 확인한다.', () => {
    cy.wait(1000);
    cy.resetLotto();
    cy.get('#purchaseMoney').should('have.value', '');
    cy.get('#winningNumber .winning-number').each((ele, i) => {
      expect(ele[0].value).to.be.empty;
    });
    cy.get('.bonus-number').should('have.value', '');
  });
});