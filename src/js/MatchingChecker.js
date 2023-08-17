import Lotto from "./Lotto";

const MatchingChecker = (function () {
  let winningNumbers = [];
  let bonusNumber = null;
  const CHECK_BONUS_COUNT = 5;
  const ERROR_MESSAGE = Object.freeze({
    NOT_NUMBER: "보너스 번호는 숫자여야합니다.",
    OUT_OF_RANGE: "보너스 번호는 [1, 45] 사이의 숫자여야합니다.",
    DUPLICATED: "보너스 번호는 당첨 번호와 중복되지 않아야합니다.",
  });

  function validateWinningNumbers(numbers) {
    return Lotto.prototype.validateLottoNumbers(numbers);
  }

  function setWinningNumbers(numbers) {
    validateWinningNumbers(numbers);
    winningNumbers = numbers;
  }

  function isDuplicateBonusNumber(number) {
    return winningNumbers.includes(number);
  }

  function validateBonusNumber(number) {
    if (typeof number !== "number") throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    if (Lotto.prototype.isOutOfRange(number))
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    if (isDuplicateBonusNumber(number))
      throw new Error(ERROR_MESSAGE.DUPLICATED);
  }

  function setBonusNumber(number) {
    validateBonusNumber(number);
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

  function setIsBonusMatched(lotto) {
    const lottoNumbers = lotto.getLottoNumbers();
    const isMatched = lottoNumbers.includes(bonusNumber);

    lotto.setIsBonusMatched(isMatched);
  }

  function setMatchInfo(lotto) {
    setMatchCount(lotto);

    const { matchedCount } = lotto.getMatchResult();
    if (matchedCount === CHECK_BONUS_COUNT) {
      setIsBonusMatched(lotto);
    }
  }

  return {
    ERROR_MESSAGE,
    setWinningNumbers,
    setBonusNumber,
    setMatchInfo,
  };
})();

export default MatchingChecker;
