import Lotto from "../Lotto";

export default createLotteryMachine = () => {
  const TOTAL_LOTTO_DIGITS = 6;
  const LOTTO_NUMBER_RANGE = 45;

  const getRandomNumber = () => {
    return Math.floor(Math.random() * LOTTO_NUMBER_RANGE) + 1;
  };

  const issueLotto = () => {
    const lotto = new Set();
    while (lotto.size < TOTAL_LOTTO_DIGITS) {
      lotto.add(getRandomNumber());
    }
    return Lotto.of(Array.from(lotto));
  };

  return {
    issueLotto,
  };
};
