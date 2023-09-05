declare global {
  namespace Cypress {
    interface Chainable {
      isInitApp(): Chainable;
      buyLotto(price: string): Chainable;
      checkLottoNumbers(): Chainable;
      forceClickLottoToggleButton(): Chainable;
    }
  }
}

export {};
