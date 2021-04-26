import { LOTTO } from "./constants";

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(arr: any[]) {
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(0, arr.length - 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const LottoTable: number[] = Array(LOTTO.MAX_NUM - LOTTO.MIN_NUM + 1)
  .fill(0)
  .map((_, i) => i + LOTTO.MIN_NUM);

export function getRandomLottoNumbers(): number[] {
  shuffle(LottoTable);
  return LottoTable.slice(0, LOTTO.LEN);
}

export function hasDuplicateNumber(numbers: number[]): boolean {
  return Array.from(new Set<number>(numbers)).length !== numbers.length;
}
