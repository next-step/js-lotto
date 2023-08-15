const MatchingChecker = (function () {
  let winningNumbers = [];
  let bonusNumber = null;
  const CHECK_BONUS_COUNT = 5;

  function setWinningNumbers(numbers) {
    // TODO 유효성 검사 추가할지 생각해보기
    winningNumbers = numbers;
  }

  function setBonusNumber(number) {
    bonusNumber = number;
  }

  function setMatchCount(lotto) {
    const lottoNumbers = lotto.getLottoNumbers();
    const matchCount = lottoNumbers.reduce((count, number) => {
      if (winningNumbers.includes(number)) {
        return count + 1;
      }
      return count;
    }, 0);

    lotto.setMatchCount(matchCount);
  }

  function setMatchBonus(lotto) {
    const lottoNumbers = lotto.getLottoNumbers();
    const isMatched = lottoNumbers.includes(bonusNumber);

    lotto.setMatchBonus(isMatched);
  }

  function setMatchInfo(lotto) {
    setMatchCount(lotto);

    if (lotto.getMatchCount() === CHECK_BONUS_COUNT) {
      setMatchBonus(lotto);
    }
  }

  return {
    setWinningNumbers,
    setBonusNumber,
    setMatchInfo,
  };
})();

export default MatchingChecker;
