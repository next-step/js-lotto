import { LottoRangeInfo } from '../jsDoc';

export interface RandomNumberGeneratorInterface {
  pickNumbersInRange({ startNumber, endNumber, count }: LottoRangeInfo): number[];
}
