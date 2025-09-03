const LOTTO_PRICE = 1000;
const LOTTO_COUNT = 6;
const LOTTO_NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);

class LottoPurchase {
  #purchaseAmount;
  #lottos;

  constructor(money) {
    this.#purchaseAmount = money;
    this.#lottos = [];
  }

  amountUnitCheck(money) {
    if (money / LOTTO_PRICE === 0) {
      return true;
    }

    return false;
  }
}

class WinningNumbers {
  #winningNumber;
  #bonusWinningNumber;

  construnctor() {
    this.#winningNumber = "";
    this.#bonusWinningNumber = "";
  }
}
