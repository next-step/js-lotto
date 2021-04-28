export default function Winnning() {
  const matches = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };

  this.showResult = () => Object.assign({}, matches);
  this.match = (winningLotto, lotto) => {
    const rank = MATCH[winningLotto.match(lotto)];
    rank && matches[rank(winningLotto.matchBonus(lotto))]++;
  };
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
