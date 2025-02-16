import { readLineAsync } from '../../../libs/readline.js';

export const renderOrderAmountInput = async () => {
  return await readLineAsync('> 구입금액을 입력해 주세요.');
};

export const renderOrderedLottoCount = (count) => {
  console.log(`${count}개를 구매했습니다.`);
};

export const renderOrderedLottos = (lottos) => {
  const clonedLottos = [...lottos];
  clonedLottos.forEach((lotto) => lotto.sort((a, b) => a - b));

  console.log(clonedLottos.join('\n'));
};
