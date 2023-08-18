import WinningLotto from "./WinningLotto";
import { WinningLottoNotDefinedError } from "./errors";

export default createMatchChecker = () => {
  let winningLotto = null;
  const CHECK_BONUS_COUNT = 5;

  function setWinningLotto(winningNumbers, bonusNumber) {
    winningLotto = WinningLotto.from(winningNumbers, bonusNumber);
  }

  function checkMatchCount(lotto) {
    const winningNumbers = winningLotto.getLottoNumbers();
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
    const bonusNumber = winningLotto.getBonusNumber();
    const lottoNumbers = lotto.getLottoNumbers();

    const isMatched = lottoNumbers.includes(bonusNumber);

    lotto.setIsBonusMatched(isMatched);
  }

  function checkWinningLottoDefined() {
    if (!winningLotto) throw new WinningLottoNotDefinedError();
  }

  function checkMatch(lotto) {
    checkWinningLottoDefined();

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
