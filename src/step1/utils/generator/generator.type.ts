import { LottoRangeInfo } from '@step1/utils/jsDoc';

export interface RandomNumberGeneratorInterface {
  pickNumbersInRange({ startNumber, endNumber, count }: LottoRangeInfo): number[];
}
