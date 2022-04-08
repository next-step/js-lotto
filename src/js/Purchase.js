const ENABLE_PURCHASE_STEP_MONEY = 1000;
const ENABLE_PURCHASE_MAX_MONEY = 100000;

export default class Purchase {
  static isValidMoney(money) {
    return (
      money >= ENABLE_PURCHASE_STEP_MONEY &&
      money <= ENABLE_PURCHASE_MAX_MONEY &&
      money % ENABLE_PURCHASE_STEP_MONEY === 0
    );
  }
}
