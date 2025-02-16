import { readLineAsync } from '../../../libs/readline.js';

const renderRetryInput = async () => {
  return await readLineAsync('> 다시 시작하시겠습니까? (y/n) ');
};

export const renderLineBreak = (count = 1) => {
  Array.from({ length: count }, () => {
    console.log();
  });
};

export const startMachine = async (onStart, onEnd) => {
  while (1) {
    await onStart();

    renderLineBreak();

    const inputRetry = await renderRetryInput();
    if (inputRetry !== 'y') {
      onEnd?.();
      break;
    }
  }
};
