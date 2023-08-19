import { LottoResult } from '@step1/utils/jsDoc';
import { LOTTO_TERMS } from '@step1/constants/lotto';

export const INPUT_MESSAGE = {
  BUY_AMOUNT: '> 구입금액을 입력해 주세요.',
  BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  END_COUNT: '\n> 다시 시작하시겠습니까? (y/n) ',
} as const;

export const OUTPUT_MESSAGE_TEXT = {
  RESULT_TITLE: `\n당첨 통계\n--------------------`,
  LOTTO_ENTRY: (lotto: number[]) => `[${lotto.join(', ')}]`,
  RESULT_ENTRY: ([key, value]) => `${key} - ${value}개`,
  BUY_COUNT: (count: number) => `${count}개를 구매했습니다.`,
  RATE_OF_RETURN: (rateOfReturn: string) => `총 수익률은 ${rateOfReturn}입니다.`,
} as const;

export const OUTPUT_MESSAGE_METHOD = {
  LOTTO_LIST: (lottos: number[][]) => lottos.map(OUTPUT_MESSAGE_TEXT.LOTTO_ENTRY).join('\n'),
  RESULT: (result: LottoResult) => Object.entries(result).map(OUTPUT_MESSAGE_TEXT.RESULT_ENTRY).join('\n'),
} as const;

export const ERROR_MESSAGE = {
  TYPE_OF_NUMBER: '숫자만 입력해주세요.',
  GREATER_THEN_PRICE_PER_LOTTO: `${LOTTO_TERMS.PRICE_PER_LOTTO}원 이상 입력해주세요.`,
  NO_CHANGES: `현재 앱에서는 잔돈이 존재할 수 없습니다. ${LOTTO_TERMS.PRICE_PER_LOTTO}원 단위로 입력해주세요.`,
  RESET_WITH_ERROR: (error: Error) => `${error.message} 게임을 다시 시작합니다.`,
  DUPLICATE_LOTTO_NUMBERS: '중복되는 로또 번호가 존재합니다.',
  NOT_DEFAULT_LIMIT_LOTTO_COUNT: `로또 번호가 ${LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT}개가 아닙니다.`,
  INVALID_LOTTO_NUMBER_RANGE: `로또 번호가 ${LOTTO_TERMS.MIN_LOTTO_NUMBER}에서 ${LOTTO_TERMS.MAX_LOTTO_NUMBER}사이의 숫자가 아닙니다.`,
  INVALID_BONUS_NUMBER_RANGE: `보너스 번호가 ${LOTTO_TERMS.MIN_LOTTO_NUMBER}에서 ${LOTTO_TERMS.MAX_LOTTO_NUMBER}사이의 숫자가 아닙니다.`,
  DUPLICATE_BONUS_NUMBER: '보너스 번호가 당첨 번호와 중복됩니다.',
  INVALID_NUMBER: (number: number) => `${number}는 유효하지 않은 숫자 입니다.`,
  INVALID_WINNING_COUNT: `로또의 정답 갯수는 ${LOTTO_TERMS.MIN_WINNING_COUNT}~${LOTTO_TERMS.MAX_WINNING_COUNT}개 사이 입니다.`,
} as const;
