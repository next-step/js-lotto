import { LOTTO } from "./lotto";

export const INPUT_MESSAGE = {
  INPUT_PURCHASE_PRICE: "구입금액을 입력해 주세요.",
  INPUT_WINNING_NUMBER: "당첨 번호를 입력해 주세요.",
  INPUT_BONUS_NUMBER: "보너스 번호를 입력해 주세요.",
};

export const OUTPUT_MESSAGE = {
  PURCHASE_RESULT: (count) => `${count}개를 구매했습니다.`,
  PURCHASE_PRICE_NAN_ERROR: "숫자를 입력해주세요.",

  WINNING_NUMBERS_LENGTH_ERROR: `당첨 번호는 ${LOTTO.NUMBERS_COUNT}개를 입력해야 합니다.`,
};
