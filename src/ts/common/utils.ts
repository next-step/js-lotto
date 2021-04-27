import { LottoConfig, RewardByMatchCnt } from "./constants";
import { Lotto, WinningLotto } from "./interfaces";

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

const LottoTable: number[] = Array(
  LottoConfig.MAX_NUM - LottoConfig.MIN_NUM + 1
)
  .fill(0)
  .map((_, i) => i + LottoConfig.MIN_NUM);

export function getRandomLottoNumbers(): number[] {
  shuffle(LottoTable);
  return LottoTable.slice(0, LottoConfig.LEN);
}

export function hasDuplicateNumber(numbers: number[]): boolean {
  return Array.from(new Set<number>(numbers)).length !== numbers.length;
}

export function calcReward(lotto: Lotto, winningLotto: WinningLotto): number {
  const matchCnt = getMatchCount(lotto.numbers, winningLotto.numbers);
  const [reward, rewardWithBonus] = RewardByMatchCnt[matchCnt];
  return lotto.numbers.includes(winningLotto.bonus) ? rewardWithBonus : reward;
}

export function getMatchCount(arr1: number[], arr2: number[]): number {
  return arr1.length + arr2.length - new Set<number>([...arr1, ...arr2]).size;
}

export function calcROI(investment: number, curValue: number) {
  return Math.floor(((curValue - investment) / investment) * 100);
}
