import WinningLotto from "./WinningLotto.js";
import { WinningLottoNotSetError } from "./errors.js";

const createMatchChecker = () => {
  let winningLotto = null;
  const CHECK_BONUS_COUNT = 5;

  function setWinningLotto(winningNumbers, bonusNumber) {
    winningLotto = WinningLotto.from(winningNumbers, bonusNumber);
  }

  function setMatchCount(lotto) {
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

  function setIsBonusMatch(lotto) {
    const bonusNumber = winningLotto.getBonusNumber();
    const lottoNumbers = lotto.getLottoNumbers();

    const isMatch = lottoNumbers.includes(bonusNumber);

    lotto.setIsBonusMatch(isMatch);
  }

  function isWinningLottoSet() {
    if (!winningLotto) throw new WinningLottoNotSetError();
  }

  function setMatchResult(lotto) {
    isWinningLottoSet();

    setMatchCount(lotto);

    const { matchCount } = lotto.getMatchResult();

    if (matchCount === CHECK_BONUS_COUNT) {
      setIsBonusMatch(lotto);
    }
  }

  return {
    setWinningLotto,
    setMatchResult,
  };
};

export default createMatchChecker;
