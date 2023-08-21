import { LottoResult } from '@step1/utils/jsDoc';

export const VIEW_MESSAGE_METHOD = {
  PURCHASED_LOTTO: (lottoNumberLength: number) => `총 ${lottoNumberLength}개를 구매하였습니다.`,
  RATE_OF_RETURN: (rateOfReturn: string) => `당신의 총 수익률은 ${rateOfReturn}입니다.`,
  CORRECT_COUNT: (lottoResult: LottoResult, winningInfoKey: string) => `${lottoResult[winningInfoKey] || 0}개`,
};
