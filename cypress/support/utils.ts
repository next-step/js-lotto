import { SYMBOLS } from '@step1/constants/commons';

export const cypressUtilFunctions = {
  getLottoNumbers($lottoNumber: JQuery<HTMLElement>) {
    return $lottoNumber.text().split(SYMBOLS.COMMA).map(Number);
  },
  ascendLottoNumbers(lottoNumbers: number[]) {
    return [...lottoNumbers].sort((a, b) => a - b);
  },
};
