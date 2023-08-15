import Lotto from "./Lotto";

const LotteryMachine = (function () {
  const TOTAL_LOTTO_NUMBER = 6;
  const LOTTO_NUMBER_RANGE = 45;
  const lotto = new Set();

  function getRandomNumber() {
    return Math.floor(Math.random() * LOTTO_NUMBER_RANGE) + 1;
  }

  function issueLotto() {
    while (lotto.size < TOTAL_LOTTO_NUMBER) {
      lotto.add(getRandomNumber());
    }
    return Lotto.from(Array.from(lotto));
  }

  return {
    issueLotto,
  };
})();

export default LotteryMachine;
