export const setAliase = () => {
  cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
  cy.get('#purchase-price-input-form').as('purchaseInputForm');
  cy.get('#purchase-price-input-form input').as('purchaseInput');
  cy.get('#purchase-price-input-form button').as('purchaseBtn');
  cy.get('#purchase-section-info').as('purchaseSectionInfo');
  cy.get('#purchase-section-detail').as('purchaseSectionDetail');
  cy.get('#input-lotto-nums').as('winnerNumInput');
  cy.get('#modal').as('modal');
};

const isDuplicated = (num, arr) => {
  const newArr = arr.concat(num);
  return new Set(newArr).size === arr.length;
};

const isIncludes = (arr1, arr2, num) => {
  return arr1.includes(num) || arr2.includes(num);
};

export const getMatchNum = ($div, num) => {
  let lastNum = 0;
  const originValue = $div.find('#lotto-num').text().split(', ').map(Number);

  let matchNum = originValue.slice(0, num);

  while (matchNum.length !== 7) {
    if (
      isDuplicated(++lastNum, matchNum) ||
      isIncludes(originValue, matchNum, lastNum)
    )
      continue;

    matchNum = matchNum.concat(lastNum);
  }

  return matchNum;
};

export const getMatchFiveWithBonus = ($div) => {
  let num = 0;
  const originValue = $div.find('#lotto-num').text().split(', ').map(Number);

  let matchFiveWithBonus = originValue.slice(0, 5);

  while (matchFiveWithBonus.length !== 6) {
    if (
      isDuplicated(++num, matchFiveWithBonus) ||
      isIncludes(originValue, matchFiveWithBonus, num)
    )
      continue;
    matchFiveWithBonus = matchFiveWithBonus.concat(num);
  }

  matchFiveWithBonus = matchFiveWithBonus.concat(
    originValue[originValue.length - 1]
  );

  return matchFiveWithBonus;
};
