import { LottoRangeInfo } from '@step1/utils/jsDoc';

export const RandomNumberGenerator = {
  shuffle(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
  },
  pickNumbersInRange({ startNumber, endNumber, count }: LottoRangeInfo): number[] {
    const result = [];
    for (let i = startNumber; i <= endNumber; i += 1) {
      result.push(i);
    }
    return this.shuffle(result).slice(0, count);
  },
};
