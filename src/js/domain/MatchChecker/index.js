import WinningLotto from "./WinningLotto";

export default createMatchChecker = () => {
  let winningLotto = null;
  const CHECK_BONUS_COUNT = 5;

  function setWinningLotto(winningNumbers, bonusNumber) {
    winningLotto = WinningLotto.from(winningNumbers, bonusNumber);
  }

  function checkMatchCount(lotto) {
    const lottoNumbers = lotto.getLottoNumbers();
    const matchCount = lottoNumbers.reduce((count, number) => {
      if (winningNumbers.includes(number)) {
        return count + 1;
      }
      return count;
    }, 0);

    lotto.setMatchCount(matchCount);
  }

  function checkIsBonusMatched(lotto) {
    const lottoNumbers = lotto.getLottoNumbers();
    const isMatched = lottoNumbers.includes(bonusNumber);

    lotto.setIsBonusMatched(isMatched);
  }

  function checkMatch(lotto) {
    checkMatchCount(lotto);

    const { matchedCount } = lotto.getMatchResult();

    if (matchedCount === CHECK_BONUS_COUNT) {
      checkIsBonusMatched(lotto);
    }
  }

  return {
    setWinningLotto,
    checkMatch,
  };
};
