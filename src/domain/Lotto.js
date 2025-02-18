class LottoPurchaseError extends Error {
  constructor(purchaseUnit) {
    super(`구입 금액은 ${purchaseUnit}원 단위로 입력해야 합니다.`);
  }
}

export default class Lotto {
  static PRICE_PER_LOTTO = 1000;

  purchasedLottos;

  static validatePurchaseAmount(purchaseAmount) {
    if (
      typeof purchaseAmount !== "number" ||
      purchaseAmount % Lotto.PRICE_PER_LOTTO !== 0
    ) {
      throw new LottoPurchaseError(Lotto.PRICE_PER_LOTTO);
    }
  }

  issueLotto() {
    return [1, 2, 3, 4, 5];
  }

  purchase(purchaseAmount) {
    Lotto.validatePurchaseAmount(purchaseAmount);

    const quantity = purchaseAmount / Lotto.PRICE_PER_LOTTO;

    this.purchasedLottos = Array.from({ length: quantity }, () =>
      this.issueLotto()
    );

    return this.purchasedLottos.map((lotto) => [...lotto]);
  }
}
