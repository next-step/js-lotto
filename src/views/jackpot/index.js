import { readLineAsync } from '../../../libs/readline.js';

export const renderJackpotNumbersInput = async () => {
  return await readLineAsync('> 당첨 번호를 입력해 주세요. ');
};

export const renderBonusNumberInput = async () => {
  return await readLineAsync('> 보너스 번호를 입력해 주세요. ');
};
