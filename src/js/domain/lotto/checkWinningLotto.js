import {
  validateLottoHaveDuplicateNumberWithBonus,
  validateLottoLength,
  validateLottoOutOfRangeNumberWithBonus,
} from './validateLotto.js';

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
