import { MESSAGES, LOTTO_WINNIG_PRIZE } from '../constants/index.js';

export const LottoOutput = {
  LOTTO_COUNT(count) {
    console.log(`${count}개를 구매했습니다.`);
  },

  LOTTO_NUMBERS(numbers) {
    console.log(numbers);
  },

  LOTTO_RESULT(RESULT, PROFIT) {
    console.log(`${MESSAGES.LOTTO_RESULT}
--------------------
3개 일치 (${LOTTO_WINNIG_PRIZE[0]}원)- ${RESULT[0]}개
4개 일치 (${LOTTO_WINNIG_PRIZE[1]}원)- ${RESULT[1]}개
5개 일치 (${LOTTO_WINNIG_PRIZE[2]}원)- ${RESULT[2]}개
5개 일치, 보너스 볼 일치(${LOTTO_WINNIG_PRIZE[3]}원)- ${RESULT[3]}개
6개 일치 (${LOTTO_WINNIG_PRIZE[4]}원)- ${RESULT[4]}개
총 수익률은  ${PROFIT}%입니다.`);
  },
};
