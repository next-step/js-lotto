import CypressDom from '../../src/js/constants/CypressDom'

Cypress.Commands.add('purchaseLotto', (money) => {
  cy.get(`input[data-test-element="${CypressDom.purchaseInput}"]`).type(money, {
    force: true,
  })
  cy.get(`button[data-test-element="${CypressDom.purchaseButton}"]`).click()
})

Cypress.Commands.add('clickToggleButton', () => {
  cy.get(`input[data-test-element="${CypressDom.toggleButton}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('lottoCountShouldBe', (count) => {
  cy.get(`label[data-test-element="${CypressDom.lottoCountLabel}"]`)
    .invoke('attr', 'data-count')
    .should('equal', count + '')
})

Cypress.Commands.add('checkLottoDetailDisplay', (visible) => {
  cy.get(`span[data-test-element="${CypressDom.lottoDetail}"`).should(
    'have.css',
    'display',
    visible ? 'block' : 'none'
  )
})

Cypress.Commands.add('typeResultLottoNumber', (numbers) => {
  numbers.forEach((number, index) => {
    if (index === numbers.length - 1) {
      cy.get(`input[data-test-element="${CypressDom.bonusLottoInput}"]`).type(
        number,
        { force: true }
      )
      return
    }

    cy.get(`input[data-test-element="${CypressDom.baseLottoInput}"]`)
      .eq(index)
      .type(number, { force: true })
  })
})

Cypress.Commands.add('getBenefitRate', () => {
  cy.get(`button[data-test-element="${CypressDom.benefitRateButton}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('resultShouldBeNull', () => {
  cy.get(`td[data-test-element="${CypressDom.resultLottoRankLabel}"]`).each(
    (node) => {
      cy.wrap(node).should('have.text', '')
    }
  )

  cy.get(
    `p[data-test-element="${CypressDom.resultLottoBenefitRateLabel}"]`
  ).should('have.text', '')
})

Cypress.Commands.add('resultShouldBeContainBenefitTemplateText', () => {
  cy.get(`td[data-test-element="${CypressDom.resultLottoRankLabel}"]`).each(
    (node) => {
      cy.wrap(node).contains('개')
    }
  )

  cy.get(`p[data-test-element="${CypressDom.resultLottoBenefitRateLabel}"]`)
    .contains('당신의 총 수익률은')
    .contains('%입니다')
})

Cypress.Commands.add('clickResetButton', () => {
  cy.get(`button[data-test-element="${CypressDom.resetGameButton}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('resultBenefitRateLabelShouldbe', (benefitRate) => {
  cy.get(
    `p[data-test-element="${CypressDom.resultLottoBenefitRateLabel}"]`
  ).contains(`당신의 총 수익률은 ${benefitRate}%입니다.`)
})

Cypress.Commands.add('lottoInputShouldBeNull', () => {
  cy.get(`input[data-test-element="${CypressDom.purchaseInput}"]`)
    .invoke('val')
    .should('eq', '')
  cy.get(`input[data-test-element="${CypressDom.baseLottoInput}"]`)
    .invoke('val')
    .should('eq', '')
  cy.get(`input[data-test-element="${CypressDom.bonusLottoInput}"]`)
    .invoke('val')
    .should('eq', '')
})

Cypress.Commands.add('alertMessageToBeEqual', (text) => {
  cy.on('window:alert', (txt) => {
    expect(text).to.equal(txt)
  })
})
