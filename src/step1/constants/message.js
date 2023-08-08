export const INPUT_MESSAGE = Object.freeze({
  BUY_AMOUNT: '> 구입금액을 입력해 주세요.',
  BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  END_COUNT: '\n> 다시 시작하시겠습니까? (y/n) ',
});

export const OUTPUT_MESSAGE = Object.freeze({
  LOTTO_LIST: (lottos) =>
    lottos.reduce((message, lotto) => {
      message += `[${lotto.join(', ')}]\n`;
      return message;
    }, ''),
  BUY_COUNT: (lottos) => `${lottos.length}개를 구매했습니다.`,
  RESULT_TITLE: `\n당첨 통계\n--------------------`,
});
