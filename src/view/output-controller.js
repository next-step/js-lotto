import { printPurchaseResult, printLottoResult } from "./output.js";

export function handlePrintPurchaseResult(quantity, lottos) {
  const sortedLottos = lottos.map((lotto) => lotto.sort((a, b) => a - b));
  printPurchaseResult(quantity, sortedLottos);
}

export function handlePrintLottoResult(results, returnRate) {
  printLottoResult(results, returnRate);
}
