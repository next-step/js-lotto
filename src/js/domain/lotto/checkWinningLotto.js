import { LOTTO_LENGTH, LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from './constants.js';

function validateLottoLength(lotto) {
  return lotto.length === LOTTO_LENGTH;
}

function validateLottoOutOfRangeNumberWithBonus(lotto, bonus) {
  return (
    [...lotto, bonus].filter(number => number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER)
      .length === 0
  );
}

function validateLottoHaveDuplicateNumberWithBonus(lotto, bonus) {
  return new Set([...lotto, bonus]).size === LOTTO_LENGTH + 1;
}

export default function checkWinningLotto(winningNumbers, bonus) {
  if (!validateLottoLength(winningNumbers)) {
    throw new Error('당첨 번호를 모두 입력해주세요.');
  }
  if (!validateLottoOutOfRangeNumberWithBonus(winningNumbers, bonus)) {
    throw new Error('당첨 번호는 1 ~ 45 사이로 입력해주세요.');
  }
  if (!validateLottoHaveDuplicateNumberWithBonus(winningNumbers, bonus)) {
    throw new Error('당첨 번호는 중복될 수 없습니다.');
  }
}
