import {getRandomIntInclusive, getTestRandomArray} from "../../support/utils";

describe('Step2', () => {
  before(() => {
    cy.visit('index.html');
    const price = 100000;
    cy.inputPrice(price);
    cy.purchase();
    const pickingNumbers = [...getTestRandomArray(1, 45, 7)];
    const bonusNumber = pickingNumbers.splice(getRandomIntInclusive(0, 5), 1)[0];
    cy.inputResult(pickingNumbers.sort((a,b) => a-b), bonusNumber);
  });

  it('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
    cy.showResult();
    cy.get('.modal').should('be.visible');
  });
});