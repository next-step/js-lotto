import {
  isValidWinningNumbers,
  isValidBonusNumber,
} from '../domain/lottoNumbers.js';

import readLineAsync from '../utils/readLineAsync.js';

const LottoNumbersInput = async () => {
  const winningNumbers = await readLineAsync('당첨 번호를 입력해 주세요.');

  if (!isValidWinningNumbers(winningNumbers)) {
    return;
  }

  const bonusNumber = await readLineAsync('보너스 번호를 입력해 주세요.');

  if (!isValidBonusNumber(bonusNumber, winningNumbers)) {
    return;
  }
};

export default LottoNumbersInput;
