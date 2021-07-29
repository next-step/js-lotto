import { INITIAL_STATE, MAX, PRIZE, MATCH } from "./constants.js";

export const buildNewState = (prevState, { type, data }) => {
  switch (type) {
    case "UPDATE_LOTTOS":
      return updateLottos(prevState, data);
    case "TOGGLE_LOTTO_DISPLAY":
      return { ...prevState, toggle: data };
    case "UPDATE_LOTTO_RESULT":
      return updateLottoResult(prevState, data);
    case "CLOSE_MODAL":
      return { ...prevState, showResultModal: false, toggle: false };
    case "RESTART":
      return { ...INITIAL_STATE };
    default:
      prevState;
  }
};

const updateLottos = (prevState, purchaseMoney) => {
  const totalLottos = purchaseMoney / 1000;
  const lottos = new Array(totalLottos).fill([]).map(() => {
    const lotto = new Set();
    while (lotto.size < 7) {
      lotto.add(Math.floor(Math.random() * MAX) + 1);
    }
    return [...lotto];
  });

  return {
    ...prevState,
    lottos,
    purchaseMoney,
  };
};

const updateLottoResult = (prevState, { winningNums, bonusNum }) => {
  let prize = 0;
  const result = JSON.parse(JSON.stringify(PRIZE));
  const { lottos, purchaseMoney } = prevState;

  lottos.forEach((lotto) => {
    // prettier-ignore
    const _lotto = lotto.reduce((prev, num) => {
      if (winningNums.includes(num)) {return { ...prev, matched: [...prev.matched, num] }}
      else if (bonusNum.includes(num)) {return { ...prev, bonus: num }}
      return prev
    }, {...MATCH});

    const { matched, bonus } = _lotto;
    const key = matched.length === 5 && bonus !== 0 ? "5a" : matched.length + 1 > 6 ? 6 : matched.length + 1;
    result[key][0] += 1;
  });

  for (let [, p] of Object.entries(result)) {
    prize += p[0] * p[1];
  }

  const earningRatio = prize / Number(purchaseMoney) > 0 ? (prize / Number(purchaseMoney)) * 100 : 0;

  return {
    ...prevState,
    result,
    winningNums,
    bonusNum,
    showResultModal: true,
    prize,
    earningRatio,
  };
};
