import { LottoConfig } from "./constants";

export function isValidCost(cost: number) {
  return cost % LottoConfig.Price === 0;
}
