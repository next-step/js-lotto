import { numberFormater } from "../utils/numberFormater";
import { LOTTO } from "./lotto";

export const CONTINUE = {
  YES: "y",
  NO: "n",
};

export const INPUT_MESSAGE = {
  PURCHASE_PRICE: "구입금액을 입력해 주세요.",
  WINNING_NUMBER: "\n당첨 번호를 입력해 주세요.",
  BONUS_NUMBER: "\n보너스 번호를 입력해 주세요.",
  CONTINUE: `\n다시 시작하시겠습니까? (${CONTINUE.YES}/${CONTINUE.NO})`,
};

export const OUTPUT_MESSAGE = {
  PURCHASE_RESULT_COUNT: (count) => `${count}개를 구매했습니다.`,
  WINNING_STATISTICS: "\n당첨 통계\n--------------------",
  TOTAL_RATE_OF_RETURN: (count) => `총 수익률은 ${count}%입니다.`,

  NAN_ERROR: "숫자를 입력해주세요.",
  WINNING_LOTTO_LENGTH_ERROR: `당첨 번호는 ${LOTTO.NUMBERS_COUNT}개를 입력해야 합니다.`,
  DUPLICATE_NUMBER_ERROR: "중복되게 입력할 수 없습니다.",
  CONTAIN_ERROR: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  INTEGER_ERROR: "소수가 아닌 1이상의 정수를 입력해주세요.",
  RESULT_TYPE_ERROR: "올바른 결과값이 아닙니다.",
  NEGETIVE_NUM_ERROR: "1이상의 정수를 입력해주세요.",
  LIMIT_NUM_ERROR: `${LOTTO.MAX_NUMBER}이하의 숫자를 입력해주세요.`,
};

export const PRIZE_MESSAGE = {
  FIRST_PRIZE: (count) => `${LOTTO.NUMBERS_COUNT}개 일치 (${numberFormater(WINNINGS.FIRST)}원) - ${count}개`,
  SECOND_PRIZE: (count) =>
    `${LOTTO.NUMBERS_COUNT - 1}개 일치, 보너스 볼 일치 (${numberFormater(WINNINGS.SECOND)}원) - ${count}개`,
  THIRD_PRIZE: (count) => `${LOTTO.NUMBERS_COUNT - 1}개 일치 (${numberFormater(WINNINGS.THIRD)}원) - ${count}개`,
  FOURTH_PRIZE: (count) => `${LOTTO.NUMBERS_COUNT - 2}개 일치 (${numberFormater(WINNINGS.FOURTH)}원) - ${count}개`,
  FIFTH_PRIZE: (count) => `${LOTTO.NUMBERS_COUNT - 3}개 일치 (${numberFormater(WINNINGS.FIFTH)}원) - ${count}개`,
};

export const WINNINGS = {
  FIRST: 2_000_000_000,
  SECOND: 30_000_000,
  THIRD: 1_500_000,
  FOURTH: 50_000,
  FIFTH: 5_000,
};
