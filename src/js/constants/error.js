import { LottoMachine } from '../domain/index.js';

const ERROR = Object.freeze({
  PURCHASE: {
    UNMATCHED_PRICE_PER_SHEET: `${LottoMachine.pricePerSheet.toLocaleString()}원 단위의 금액을 입력해주세요!`,
  },
});

export default ERROR;
