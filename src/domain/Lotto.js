class LottoPurchaseError extends Error {
  constructor(purchaseUnit) {
    super(`구입 금액은 ${purchaseUnit}원 단위로 입력해야 합니다.`);
  }
}

export default class Lotto {
  static PRICE_PER_LOTTO = 1000;
  static NUMBERS_PER_LOTTO = 6;

  static NUMBER_MIN_RANGE = 1;
  static NUMBER_MAX_RANGE = 45;

  purchasedLottos = [];

  constructor() {}

  static validatePurchaseAmount(purchaseAmount) {
    if (
      typeof purchaseAmount !== "number" ||
      purchaseAmount % Lotto.PRICE_PER_LOTTO !== 0
    ) {
      throw new LottoPurchaseError(Lotto.PRICE_PER_LOTTO);
    }
  }

  issue() {
    return Array.from({ length: Lotto.NUMBERS_PER_LOTTO }, () =>
      Math.floor(
        Math.random() * (Lotto.NUMBER_MAX_RANGE - Lotto.NUMBER_MIN_RANGE + 1) +
          Lotto.NUMBER_MIN_RANGE
      )
    );
  }

  purchase(purchaseAmount) {
    Lotto.validatePurchaseAmount(purchaseAmount);

    const quantity = purchaseAmount / Lotto.PRICE_PER_LOTTO;
    const newLottos = Array.from({ length: quantity }, () => this.issue());

    this.purchasedLottos = this.purchasedLottos.concat(newLottos);

    return newLottos.map((lotto) => [...lotto]);
  }
}
