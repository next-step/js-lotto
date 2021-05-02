import { LOTTO_PRICE } from "./lottoStore.js";

export function Winnning() {
  const matching = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };
  const yieldMatcing = { BUY: 0, PRIZE: 0 };

  this.showResult = () => Object.assign({}, matching);
  this.match = (winningLotto, lotto) => {
    const rank = MATCH[winningLotto.match(lotto)];
    if (!rank) return;
    const rank_with_bonus = rank(winningLotto.matchBonus(lotto));
    matching[rank_with_bonus]++;
    yieldMatcing.PRIZE += PRIZE[rank_with_bonus];
  };
  this.matchAll = (winningLotto, lottos) => {
    yieldMatcing.BUY = lottos.length * LOTTO_PRICE;
    lottos.forEach((lotto) => this.match(winningLotto, lotto));
  };

  this.yields = () =>
    Math.floor(
      (yieldMatcing.PRIZE - yieldMatcing.BUY / yieldMatcing.BUY) * YIELD_PERCENT
    );
}

const MATCH = {
  3: () => RANK.FIFTH,
  4: () => RANK.FOURTH,
  5: (isBouns) => (isBouns ? RANK.SECOND : RANK.THIRD),
  6: () => RANK.FIRST,
};

const RANK = {
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
  FOURTH: "FOURTH",
  FIFTH: "FIFTH",
};

export const PRIZE = {
  FIRST: 2_000_000_000,
  SECOND: 30_000_000,
  THIRD: 1_500_000,
  FOURTH: 50_000,
  FIFTH: 5_000,
};

const YIELD_PERCENT = 100;
