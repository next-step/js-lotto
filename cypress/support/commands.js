import {
  CY_BASE_LOTTO_INPUT,
  CY_BENEFIT_RATE_BUTTON,
  CY_BONUS_LOTTO_INPUT,
  CY_CONFIRM_MANUAL_PURCHASE,
  CY_LOTTO_COUNT_LABEL,
  CY_LOTTO_DETAIL,
  CY_MANUAL_LOTTO_INPUT,
  CY_PURCHASE_BUTTON,
  CY_PURHCASE_INPUT,
  CY_RESET_GAME_BUTTON,
  CY_RESULT_LOTTO_BENEFIT_RATE_LABEL,
  CY_RESULT_LOTTO_RANK_LABEL,
  CY_TOGGLE_BUTTON,
  CY_TOGGLE_PURCHASE_MODE_BUTTON,
} from '../../src/js/constants/CypressDom'

Cypress.Commands.add('autoPurchaseLotto', (money) => {
  cy.get(`input[data-test-element="${CY_PURHCASE_INPUT}"]`).type(money, {
    force: true,
  })

  cy.get(`button[data-test-element="${CY_PURCHASE_BUTTON}"]`).click()
})

Cypress.Commands.add('manualPurchaseLotto', ({ money, manualPurchaseAmount = 0 }) => {
  cy.get(`input[data-test-element="${CY_PURHCASE_INPUT}"]`).type(money, {
    force: true,
  })

  cy.window().then((p) => {
    cy.stub(p, 'prompt').returns(manualPurchaseAmount)
  })

  cy.get(`button[data-test-element="${CY_PURCHASE_BUTTON}"]`).click()
})

Cypress.Commands.add('clickToggleButton', () => {
  cy.get(`input[data-test-element="${CY_TOGGLE_BUTTON}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('lottoCountShouldBe', (count) => {
  cy.get(`label[data-test-element="${CY_LOTTO_COUNT_LABEL}"]`)
    .invoke('attr', 'data-count')
    .should('equal', count + '')
})

Cypress.Commands.add('checkLottoDetailDisplay', (visible) => {
  cy.get(`span[data-test-element="${CY_LOTTO_DETAIL}"`).should('have.css', 'display', visible ? 'block' : 'none')
})

Cypress.Commands.add('typeResultLottoNumber', (numbers) => {
  numbers.forEach((number, index) => {
    if (index === numbers.length - 1) {
      cy.get(`input[data-test-element="${CY_BONUS_LOTTO_INPUT}"]`).type(number, { force: true })
      return
    }

    cy.get(`input[data-test-element="${CY_BASE_LOTTO_INPUT}"]`).eq(index).type(number, { force: true })
  })
})

Cypress.Commands.add('getBenefitRate', () => {
  cy.get(`button[data-test-element="${CY_BENEFIT_RATE_BUTTON}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('resultShouldBeNull', () => {
  cy.get(`td[data-test-element="${CY_RESULT_LOTTO_RANK_LABEL}"]`).each((node) => {
    cy.wrap(node).should('have.text', '')
  })

  cy.get(`p[data-test-element="${CY_RESULT_LOTTO_BENEFIT_RATE_LABEL}"]`).should('have.text', '')
})

Cypress.Commands.add('resultShouldBeContainBenefitTemplateText', () => {
  cy.get(`td[data-test-element="${CY_RESULT_LOTTO_RANK_LABEL}"]`).each((node) => {
    cy.wrap(node).contains('개')
  })

  cy.get(`p[data-test-element="${CY_RESULT_LOTTO_BENEFIT_RATE_LABEL}"]`).contains('당신의 총 수익률은').contains('%입니다')
})

Cypress.Commands.add('clickResetButton', () => {
  cy.get(`button[data-test-element="${CY_RESET_GAME_BUTTON}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('lottoInputShouldBeNull', () => {
  cy.get(`input[data-test-element="${CY_PURHCASE_INPUT}"]`).invoke('val').should('eq', '')
  cy.get(`input[data-test-element="${CY_BASE_LOTTO_INPUT}"]`).invoke('val').should('eq', '')
  cy.get(`input[data-test-element="${CY_BONUS_LOTTO_INPUT}"]`).invoke('val').should('eq', '')
})

Cypress.Commands.add('alertMessageWillBeEqual', (text) => {
  cy.on('window:alert', (txt) => {
    expect(text).to.equal(txt)
  })
})

// 3단계
Cypress.Commands.add('clickToggleManualButton', () => {
  cy.get(`input[data-test-element="${CY_TOGGLE_PURCHASE_MODE_BUTTON}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('setManualPurchaseAmount', (manualAmount) => {
  cy.stub(win, 'prompt').returns(manualAmount)
})

Cypress.Commands.add('clickManualPurchaseButton', () => {
  cy.get(`button[data-test-element="${CY_CONFIRM_MANUAL_PURCHASE}"`).click({
    force: true,
  })
})

Cypress.Commands.add('typeManualLottoInputs', (manualLottoNumbers) => {
  let manualIndex = 0
  manualLottoNumbers.forEach((lottoNumber) => {
    lottoNumber.forEach((number, index) => {
      cy.get(`input[data-test-element="${CY_MANUAL_LOTTO_INPUT}"]`)
        .eq(manualIndex * 6 + index)
        .type(number, { force: true })
    })

    manualIndex += 1
  })
})

Cypress.Commands.add('checkManualLottoNumberPurchased', (manualLottoNumbers) => {
  manualLottoNumbers.forEach((lottoNumber, index) => {
    cy.get(`span[data-test-element="${CY_LOTTO_DETAIL}"]`)
      .eq(index)
      .should(
        'have.text',
        lottoNumber.reduce((a, b) => a + ', ' + b)
      )
  })
})

Cypress.Commands.add('lottoLengthShouldBeEqual', (length) => {
  cy.get(`span[data-test-element="${CY_LOTTO_DETAIL}"]`).should('have.length', length)
})
