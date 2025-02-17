import Prize from "./Prize.js";

class ThirdPrize extends Prize {
  constructor() {
    super(5, 1_500_000);
  }

  matched(lotto, winningLotto) {
    return (
      winningLotto.countMatchNumbers(lotto) === this.lottoNumberMatchCount &&
      !winningLotto.hasBonus(lotto)
    );
  }
}

export default ThirdPrize;
