import { LOTTO_PRIZE } from './conditions.js'

export const PROMPT = {
  PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요. ',
  LOTTO_WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  EXTRA_NUMBER: '> 보너스 번호를 입력해 주세요. ',
  LOTTO_MATCHING_RESULTS: {
    3: `3개 일치 (${LOTTO_PRIZE[3]}원)`,
    4: `4개 일치 (${LOTTO_PRIZE[4]}원)`,
    5: `5개 일치 (${LOTTO_PRIZE[5]}원)`,
    5.5: `5개 일치, 보너스 볼 일치 (${LOTTO_PRIZE[5.5]}원)`,
    6: `6개 일치 (${LOTTO_PRIZE[6]}원)`,
  },
}
