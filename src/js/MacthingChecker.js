const MatchingChecker = (function () {
  let winningNumbers = [];
  let bonusNumber = null;
  const CHECK_BONUS_COUNT = 5;
  const LOW_BOUND = 1;
  const HIGH_BOUND = 45;
  const ERROR_MESSAGE = Object.freeze({
    NOT_ARRAY: "당첨 번호는 배열 형태여야합니다.",
    NOT_LENGTH_SIX: "당첨 번호는 길이가 6인 배열 형태여야합니다.",
    ELEMENT_NOT_NUMBER: "당첨 번호는 모두 숫자여야합니다.",
    ELEMENT_OUT_OF_RANGE: "당첨 번호는 모두 [1, 45] 사이의 숫자여야합니다.",
    ELEMENT_DUPLICATED: "당첨 번호는 모두 중복되지 않아야합니다.",
    BONUS_NUMBER_NOT_NUMBER: "보너스 번호는 숫자여야합니다.",
    BONUS_NUMBER_OUT_OF_RANGE: "보너스 번호는 [1, 45] 사이의 숫자여야합니다.",
    BONUS_NUMBER_DUPLICATED: "보너스 번호는 당첨 번호와 중복되지 않아야합니다.",
  });

  // > > 💡보너스 번호 out-of-range.

  function hasNonNumericElement(numbers) {
    return numbers.some((num) => typeof num !== "number");
  }

  function hasOutOfRangeElement(numbers) {
    return numbers.some(isOutOfRange);
  }

  function isOutOfRange(number) {
    return number < LOW_BOUND || number > HIGH_BOUND;
  }

  function hasDuplicatedElement(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  function validateWinningNumbers(numbers) {
    if (!Array.isArray(numbers)) throw new Error(ERROR_MESSAGE.NOT_ARRAY);
    if (numbers.length !== 6) throw new Error(ERROR_MESSAGE.NOT_LENGTH_SIX);
    if (hasNonNumericElement(numbers))
      throw new Error(ERROR_MESSAGE.ELEMENT_NOT_NUMBER);
    if (hasOutOfRangeElement(numbers))
      throw new Error(ERROR_MESSAGE.ELEMENT_OUT_OF_RANGE);
    if (hasDuplicatedElement(numbers))
      throw new Error(ERROR_MESSAGE.ELEMENT_DUPLICATED);
  }

  function setWinningNumbers(numbers) {
    validateWinningNumbers(numbers);
    winningNumbers = numbers;
  }

  function isDuplicateBonusNumber(number) {
    return winningNumbers.includes(number);
  }

  function validateBonusNumber(number) {
    if (typeof number !== "number")
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_NOT_NUMBER);
    if (isOutOfRange(number))
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_OUT_OF_RANGE);
    if (isDuplicateBonusNumber(number))
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_DUPLICATED);
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
    ERROR_MESSAGE,
    setWinningNumbers,
    setBonusNumber,
    setMatchInfo,
  };
})();

export default MatchingChecker;
