import Prize from "./Prize.js";

class SecondPrize extends Prize {
  constructor() {
    super(5, 30_000_000);
  }

  matched(lotto, winningLotto) {
    return (
      winningLotto.countMatchNumbers(lotto) === this.lottoNumberMatchCount &&
      winningLotto.hasBonus(lotto)
    );
  }
}

export default SecondPrize;
